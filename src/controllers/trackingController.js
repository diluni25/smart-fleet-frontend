const GpsLog = require('../models/GpsLog');
const Trip = require('../models/Trip');
const asyncHandler = require('../middleware/asyncHandler');

const STALE_THRESHOLD_SECONDS = 120;

// POST /api/tracking/gps
// Driver (or admin) sends live GPS coordinates for an active/assigned trip
const recordGpsUpdate = asyncHandler(async (req, res) => {
  const { tripId, lat, lng, speed, heading, accuracy, timestamp } = req.body;

  if (!tripId || lat === undefined || lng === undefined) {
    res.status(400);
    throw new Error('tripId, lat, and lng are required');
  }

  const trip = await Trip.findById(tripId);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  if (
    req.user.role === 'driver' &&
    trip.driverId &&
    trip.driverId.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error('Access denied: this trip is assigned to another driver');
  }

  if (['completed', 'cancelled'].includes(trip.status)) {
    res.status(400);
    throw new Error(`Cannot record GPS updates for a ${trip.status} trip`);
  }

  const recordedAt = timestamp ? new Date(timestamp) : new Date();
  if (Number.isNaN(recordedAt.getTime())) {
    res.status(400);
    throw new Error('Invalid timestamp format');
  }

  const gpsLog = await GpsLog.create({
    tripId: trip._id,
    driverId: req.user._id,
    vehicleId: trip.vehicleId,
    vehicleCode: trip.vehicleCode,
    lat: Number(lat),
    lng: Number(lng),
    speed: speed !== undefined ? Number(speed) : 0,
    heading: heading !== undefined ? Number(heading) : 0,
    accuracy: accuracy !== undefined ? Number(accuracy) : null,
    recordedAt,
  });

  trip.lastLocation = {
    lat: gpsLog.lat,
    lng: gpsLog.lng,
    speed: gpsLog.speed,
    heading: gpsLog.heading,
    accuracy: gpsLog.accuracy,
    updatedAt: gpsLog.recordedAt,
  };

  if (trip.status === 'planned' || trip.status === 'dispatched') {
    trip.status = 'in_progress';
  }

  await trip.save();

  const payload = {
    tripId: trip._id,
    tripCode: trip.tripCode,
    vehicleId: trip.vehicleId,
    vehicleCode: trip.vehicleCode,
    driverId: req.user._id,
    tripStatus: trip.status,
    location: {
      lat: gpsLog.lat,
      lng: gpsLog.lng,
      speed: gpsLog.speed,
      heading: gpsLog.heading,
      accuracy: gpsLog.accuracy,
      updatedAt: gpsLog.recordedAt,
    },
  };

  const io = req.app.get('io');
  if (io) {
    io.to(`trip:${trip._id}`).emit('gps:update', payload);
    io.emit('fleet:gps-update', payload);
  }

  res.status(201).json({
    success: true,
    data: payload,
  });
});

// GET /api/tracking/trips/:tripId
// Returns latest GPS position, timestamp, freshness status, and ordered stops
const getTripTracking = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  if (
    req.user.role === 'driver' &&
    trip.driverId &&
    trip.driverId.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error('Access denied: outside your assigned trips');
  }

  if (
    (req.user.role === 'store_manager' || req.user.role === 'store_employee') &&
    req.user.storeId
  ) {
    const hasStoreStop = trip.stops.some((stop) => stop.storeId === req.user.storeId);
    if (!hasStoreStop) {
      res.status(403);
      throw new Error('Access denied: trip does not involve your store');
    }
  }

  const updatedAt = trip.lastLocation?.updatedAt ? new Date(trip.lastLocation.updatedAt) : null;
  const ageSeconds = updatedAt ? Math.max(0, Math.floor((Date.now() - updatedAt.getTime()) / 1000)) : null;
  const isStale = ageSeconds === null ? true : ageSeconds > STALE_THRESHOLD_SECONDS;

  res.json({
    success: true,
    data: {
      tripId: trip._id,
      tripCode: trip.tripCode,
      vehicleId: trip.vehicleId,
      vehicleCode: trip.vehicleCode,
      status: trip.status,
      lastLocation: trip.lastLocation || null,
      freshness: {
        lastUpdatedAt: updatedAt,
        ageSeconds,
        isStale,
        staleThresholdSeconds: STALE_THRESHOLD_SECONDS,
      },
      stops: trip.stops,
    },
  });
});

// GET /api/tracking/trips/:tripId/history
// Returns recent GPS breadcrumb points for map route visualization
const getTripTrackingHistory = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  const limit = Math.min(Number(req.query.limit) || 100, 500);
  const logs = await GpsLog.find({ tripId: trip._id })
    .sort({ recordedAt: -1 })
    .limit(limit);

  res.json({
    success: true,
    count: logs.length,
    data: logs.reverse(),
  });
});

module.exports = {
  recordGpsUpdate,
  getTripTracking,
  getTripTrackingHistory,
};