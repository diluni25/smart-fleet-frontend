const Trip = require('../models/Trip');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/trips
const createTrip = asyncHandler(async (req, res) => {
  const {
    tripCode,
    vehicleId,
    vehicleCode,
    driverId,
    maxCapacityKg,
    stops = [],
    status,
  } = req.body;

  if (!Array.isArray(stops) || stops.length === 0) {
    res.status(400);
    throw new Error('At least one stop is required to generate a trip sequence');
  }

  const orderedStops = stops.map((stop, index) => ({
    ...stop,
    sequence: index + 1,
  }));

  const totalLoadKg = orderedStops.reduce((sum, s) => sum + (Number(s.totalWeightKg) || 0), 0);
  const totalPallets = orderedStops.reduce((sum, s) => sum + (Number(s.totalPallets) || 0), 0);
  const capacityLimit = Number(maxCapacityKg) || 3970;

  if (totalLoadKg > capacityLimit) {
    res.status(400);
    throw new Error(`Total load (${totalLoadKg} kg) exceeds vehicle capacity (${capacityLimit} kg)`);
  }

  const generatedCode =
    tripCode || `TRP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const trip = await Trip.create({
    tripCode: generatedCode,
    vehicleId,
    vehicleCode,
    driverId,
    maxCapacityKg: capacityLimit,
    totalLoadKg,
    totalPallets,
    stops: orderedStops,
    status: status || 'planned',
    createdBy: req.user?._id,
  });

  res.status(201).json({ success: true, data: trip });
});

// GET /api/trips
const getTrips = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user?.role === 'driver') {
    filter.driverId = req.user._id;
  } else if (req.user?.role === 'store_manager' || req.user?.role === 'store_employee') {
    if (req.user.storeId) {
      filter['stops.storeId'] = req.user.storeId;
    }
  }

  const trips = await Trip.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: trips.length, data: trips });
});

// GET /api/trips/:id
const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }
  res.json({ success: true, data: trip });
});

// PATCH /api/trips/:id/sequence
const reorderTripSequence = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  const { stops } = req.body;
  if (!Array.isArray(stops) || stops.length === 0) {
    res.status(400);
    throw new Error('Updated stops array is required');
  }

  trip.stops = stops.map((stop, index) => ({
    ...stop,
    sequence: index + 1,
  }));
  trip.totalLoadKg = trip.stops.reduce((sum, s) => sum + (Number(s.totalWeightKg) || 0), 0);
  trip.totalPallets = trip.stops.reduce((sum, s) => sum + (Number(s.totalPallets) || 0), 0);

  if (trip.totalLoadKg > trip.maxCapacityKg) {
    res.status(400);
    throw new Error(`Total load (${trip.totalLoadKg} kg) exceeds vehicle capacity (${trip.maxCapacityKg} kg)`);
  }

  await trip.save();
  res.json({ success: true, data: trip });
});

module.exports = { createTrip, getTrips, getTripById, reorderTripSequence };