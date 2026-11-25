const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');

const ACTIVE_TRIP_STATUSES = ['planned', 'dispatched', 'in_progress', 'delayed'];

const getTripWindow = (stops = [], fallbackStart, fallbackEnd) => {
  const times = [];

  for (const stop of stops) {
    if (stop.scheduledArrival) times.push(new Date(stop.scheduledArrival).getTime());
    if (stop.scheduledDeparture) times.push(new Date(stop.scheduledDeparture).getTime());
    if (stop.estimatedArrival) times.push(new Date(stop.estimatedArrival).getTime());
  }

  if (fallbackStart) times.push(new Date(fallbackStart).getTime());
  if (fallbackEnd) times.push(new Date(fallbackEnd).getTime());

  const validTimes = times.filter((t) => !Number.isNaN(t));
  if (validTimes.length === 0) {
    const now = Date.now();
    return { start: new Date(now), end: new Date(now + 2 * 60 * 60 * 1000) };
  }

  return {
    start: new Date(Math.min(...validTimes)),
    end: new Date(Math.max(...validTimes)),
  };
};

const hasTimeOverlap = (startA, endA, startB, endB) => {
  return startA < endB && startB < endA;
};

const checkStoreSlotConflicts = async ({ stops = [], windowStart, windowEnd, excludeTripId }) => {
  const storeIds = [...new Set(stops.map((s) => s.storeId).filter(Boolean))];
  if (storeIds.length === 0) return [];

  const query = {
    status: { $in: ACTIVE_TRIP_STATUSES },
    'stops.storeId': { $in: storeIds },
  };
  if (excludeTripId) {
    query._id = { $ne: excludeTripId };
  }

  const candidateTrips = await Trip.find(query);
  const conflicts = [];

  for (const newStop of stops) {
    if (!newStop.storeId) continue;

    const newStart = newStop.scheduledArrival ? new Date(newStop.scheduledArrival) : windowStart;
    const newEnd = newStop.scheduledDeparture
      ? new Date(newStop.scheduledDeparture)
      : new Date(newStart.getTime() + 60 * 60 * 1000);

    for (const existingTrip of candidateTrips) {
      for (const existingStop of existingTrip.stops || []) {
        if (existingStop.storeId !== newStop.storeId) continue;

        const sameSlot =
          newStop.slotCode &&
          existingStop.slotCode &&
          newStop.slotCode.trim().toLowerCase() === existingStop.slotCode.trim().toLowerCase();

        const exStart = existingStop.scheduledArrival
          ? new Date(existingStop.scheduledArrival)
          : getTripWindow(existingTrip.stops).start;
        const exEnd = existingStop.scheduledDeparture
          ? new Date(existingStop.scheduledDeparture)
          : new Date(exStart.getTime() + 60 * 60 * 1000);

        if (sameSlot || hasTimeOverlap(newStart, newEnd, exStart, exEnd)) {
          conflicts.push({
            type: sameSlot ? 'slot_conflict' : 'store_window_conflict',
            storeId: newStop.storeId,
            slotCode: newStop.slotCode || existingStop.slotCode || null,
            conflictingTripId: existingTrip._id,
            conflictingTripCode: existingTrip.tripCode,
          });
        }
      }
    }
  }

  return conflicts;
};

const evaluateVehiclesForTrip = async ({
  requiredWeightKg = 0,
  requiredPallets = 0,
  stops = [],
  startTime,
  endTime,
  excludeTripId,
}) => {
  const { start: windowStart, end: windowEnd } = getTripWindow(stops, startTime, endTime);
  const storeConflicts = await checkStoreSlotConflicts({
    stops,
    windowStart,
    windowEnd,
    excludeTripId,
  });

  const vehicles = await Vehicle.find({
    status: { $nin: ['maintenance', 'inactive'] },
  }).populate('assignedDriverId', 'name email role isActive');

  const activeTrips = await Trip.find({
    status: { $in: ACTIVE_TRIP_STATUSES },
    ...(excludeTripId ? { _id: { $ne: excludeTripId } } : {}),
  });

  const evaluated = vehicles.map((vehicle) => {
    const reasons = [];

    if (vehicle.maxWeightKg < Number(requiredWeightKg)) {
      reasons.push(
        `Weight capacity (${vehicle.maxWeightKg} kg) is less than required (${requiredWeightKg} kg)`
      );
    }

    if (vehicle.maxPallets < Number(requiredPallets)) {
      reasons.push(
        `Pallet capacity (${vehicle.maxPallets}) is less than required (${requiredPallets})`
      );
    }

    if (vehicle.status !== 'available') {
      reasons.push(`Vehicle status is '${vehicle.status}'`);
    }

    const overlappingTrips = activeTrips.filter((trip) => {
      if (!trip.vehicleId && !trip.vehicleCode) return false;
      const matchesVehicle =
        (trip.vehicleId && trip.vehicleId.toString() === vehicle._id.toString()) ||
        (trip.vehicleCode && trip.vehicleCode === vehicle.vehicleCode);

      if (!matchesVehicle) return false;

      const exWindow = getTripWindow(trip.stops, trip.createdAt);
      return hasTimeOverlap(windowStart, windowEnd, exWindow.start, exWindow.end);
    });

    if (overlappingTrips.length > 0) {
      reasons.push(
        `Overlaps with active trip(s): ${overlappingTrips.map((t) => t.tripCode).join(', ')}`
      );
    }

    const spareWeightKg = vehicle.maxWeightKg - Number(requiredWeightKg);
    const sparePallets = vehicle.maxPallets - Number(requiredPallets);

    return {
      vehicle,
      eligible: reasons.length === 0,
      reasons,
      spareWeightKg,
      sparePallets,
    };
  });

  const eligibleVehicles = evaluated
    .filter((item) => item.eligible)
    .sort((a, b) => a.spareWeightKg - b.spareWeightKg || a.sparePallets - b.sparePallets);

  const ineligibleVehicles = evaluated.filter((item) => !item.eligible);

  return {
    window: { start: windowStart, end: windowEnd },
    storeConflicts,
    recommendations: eligibleVehicles,
    ineligible: ineligibleVehicles,
  };
};

module.exports = {
  evaluateVehiclesForTrip,
  checkStoreSlotConflicts,
  getTripWindow,
  hasTimeOverlap,
};