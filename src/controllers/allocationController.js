const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const asyncHandler = require('../middleware/asyncHandler');
const { evaluateVehiclesForTrip } = require('../services/allocationService');

// POST /api/allocations/vehicles
const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json({ success: true, data: vehicle });
});

// GET /api/allocations/vehicles
const getVehicles = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: vehicles.length, data: vehicles });
});

// POST /api/allocations/recommend
const recommendVehicles = asyncHandler(async (req, res) => {
  const {
    requiredWeightKg = 0,
    requiredPallets = 0,
    stops = [],
    startTime,
    endTime,
    excludeTripId,
  } = req.body;

  const result = await evaluateVehiclesForTrip({
    requiredWeightKg,
    requiredPallets,
    stops,
    startTime,
    endTime,
    excludeTripId,
  });

  res.json({
    success: true,
    data: result,
  });
});

// POST /api/allocations/assign
const assignVehicleToTrip = asyncHandler(async (req, res) => {
  const { tripId, vehicleId, driverId } = req.body;

  if (!tripId || !vehicleId) {
    res.status(400);
    throw new Error('tripId and vehicleId are required');
  }

  const trip = await Trip.findById(tripId);
  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }

  const evaluation = await evaluateVehiclesForTrip({
    requiredWeightKg: trip.totalLoadKg,
    requiredPallets: trip.totalPallets,
    stops: trip.stops,
    excludeTripId: trip._id,
  });

  if (evaluation.storeConflicts.length > 0) {
    res.status(409);
    throw new Error(
      `Store slot/time conflict detected on store(s): ${evaluation.storeConflicts
        .map((c) => `${c.storeId}${c.slotCode ? ` (${c.slotCode})` : ''}`)
        .join(', ')}`
    );
  }

  const matched = evaluation.recommendations.find(
    (item) => item.vehicle._id.toString() === vehicle._id.toString()
  );

  if (!matched) {
    const failed = evaluation.ineligible.find(
      (item) => item.vehicle._id.toString() === vehicle._id.toString()
    );
    res.status(400);
    throw new Error(
      `Vehicle cannot be allocated: ${(failed?.reasons || ['Ineligible vehicle']).join('; ')}`
    );
  }

  const resolvedDriverId = driverId || vehicle.assignedDriverId || trip.driverId;

  trip.vehicleId = vehicle._id.toString();
  trip.vehicleCode = vehicle.vehicleCode;
  trip.maxCapacityKg = vehicle.maxWeightKg;
  if (resolvedDriverId) {
    trip.driverId = resolvedDriverId;
  }
  if (trip.status === 'planned') {
    trip.status = 'dispatched';
  }
  await trip.save();

  vehicle.status = 'assigned';
  if (resolvedDriverId) {
    vehicle.assignedDriverId = resolvedDriverId;
  }
  await vehicle.save();

  res.json({
    success: true,
    message: 'Vehicle allocated to trip successfully',
    data: {
      trip,
      vehicle,
    },
  });
});

module.exports = {
  createVehicle,
  getVehicles,
  recommendVehicles,
  assignVehicleToTrip,
};