const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Store = require('../models/Store');
const Vehicle = require('../models/Vehicle');
const { overlaps, toMinutes } = require('../utils/time');

function validateObjectId(value, label) {
  if (value && !mongoose.isValidObjectId(value)) {
    const error = new Error(`Invalid ${label} ID`);
    error.statusCode = 400;
    throw error;
  }
}

async function findConflicts({ storeId, vehicleId, date, start, end, excludeId }) {
  const query = { date, status: { $ne: 'cancelled' } };
  const reservations = await Reservation.find(query).lean();
  return reservations.filter((reservation) => {
    if (excludeId && String(reservation._id) === String(excludeId)) return false;
    const sameStore = String(reservation.store) === String(storeId);
    const sameVehicle = vehicleId && reservation.vehicle && String(reservation.vehicle) === String(vehicleId);
    return (sameStore || sameVehicle) && overlaps({ start, end }, reservation);
  });
}

async function validateReservation(payload, excludeId) {
  const { store: storeId, vehicle: vehicleId, date, start, end } = payload;
  validateObjectId(storeId, 'store');
  validateObjectId(vehicleId, 'vehicle');
  const store = await Store.findById(storeId);
  if (!store) { const error = new Error('Store not found'); error.statusCode = 404; throw error; }
  if (vehicleId && !(await Vehicle.exists({ _id: vehicleId }))) { const error = new Error('Vehicle not found'); error.statusCode = 404; throw error; }

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);
  const openMinutes = toMinutes(store.operatingHours.open);
  const closeMinutes = toMinutes(store.operatingHours.close);
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { const error = new Error('date must use YYYY-MM-DD format'); error.statusCode = 400; throw error; }
  if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes) || endMinutes <= startMinutes) { const error = new Error('end must be later than start and both must use HH:mm format'); error.statusCode = 400; throw error; }
  if (startMinutes < openMinutes || endMinutes > closeMinutes) { const error = new Error(`Reservation must be within store hours ${store.operatingHours.open}-${store.operatingHours.close}`); error.statusCode = 400; throw error; }
  if (endMinutes - startMinutes < store.minSlot) { const error = new Error(`Reservation must be at least ${store.minSlot} minutes`); error.statusCode = 400; throw error; }

  const conflicts = await findConflicts({ storeId, vehicleId, date, start, end, excludeId });
  const storeConflicts = conflicts.filter((item) => String(item.store) === String(storeId));
  const vehicleConflicts = vehicleId ? conflicts.filter((item) => item.vehicle && String(item.vehicle) === String(vehicleId)) : [];
  if (storeConflicts.length >= store.docks || vehicleConflicts.length) {
    const error = new Error('Reservation conflicts with an existing slot');
    error.statusCode = 409;
    error.conflicts = conflicts;
    throw error;
  }
}

const populated = (query) => query.populate('store', 'name type operatingHours docks minSlot').populate('vehicle', 'registration type status');

exports.createReservation = async (req, res) => {
  await validateReservation(req.body);
  const created = await Reservation.create(req.body);
  const reservation = await populated(Reservation.findById(created._id));
  res.status(201).json({ success: true, data: reservation });
};

exports.getReservations = async (req, res) => {
  const filter = {};
  if (req.query.date) filter.date = req.query.date;
  if (req.query.storeId) { validateObjectId(req.query.storeId, 'store'); filter.store = req.query.storeId; }
  if (req.query.vehicleId) { validateObjectId(req.query.vehicleId, 'vehicle'); filter.vehicle = req.query.vehicleId; }
  if (req.query.status) filter.status = req.query.status;
  const reservations = await populated(Reservation.find(filter).sort({ date: 1, start: 1 }));
  res.json({ success: true, data: reservations });
};

exports.getReservation = async (req, res) => {
  validateObjectId(req.params.id, 'reservation');
  const reservation = await populated(Reservation.findById(req.params.id));
  if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
  res.json({ success: true, data: reservation });
};

exports.updateReservation = async (req, res) => {
  validateObjectId(req.params.id, 'reservation');
  const current = await Reservation.findById(req.params.id).lean();
  if (!current) return res.status(404).json({ success: false, message: 'Reservation not found' });
  const next = { ...current, ...req.body };
  if (next.status !== 'cancelled') await validateReservation(next, req.params.id);
  const reservation = await populated(Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
  res.json({ success: true, data: reservation });
};

exports.deleteReservation = async (req, res) => {
  validateObjectId(req.params.id, 'reservation');
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
  res.json({ success: true, message: 'Reservation deleted' });
};

exports.getSchedule = async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const filter = { date };
  if (req.query.storeId) { validateObjectId(req.query.storeId, 'store'); filter.store = req.query.storeId; }
  const reservations = await populated(Reservation.find(filter).sort({ start: 1 }));
  const stores = req.query.storeId ? await Store.find({ _id: req.query.storeId }) : await Store.find({ status: 'Active' }).sort({ name: 1 });
  res.json({ success: true, data: { date, stores, reservations } });
};
