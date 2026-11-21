const Reservation = require('../models/Reservation');
const Store = require('../models/Store');
const Vehicle = require('../models/Vehicle');

exports.getKpis = async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const [vehicleCounts, storeCounts, reservations, recentReservations] = await Promise.all([
    Vehicle.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Store.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Reservation.find({ date, status: { $ne: 'cancelled' } }).lean(),
    Reservation.find().sort({ updatedAt: -1 }).limit(10).populate('store', 'name').populate('vehicle', 'registration').lean(),
  ]);
  const count = (items, key) => items.find((item) => item._id === key)?.count || 0;
  const completed = reservations.filter((item) => item.status === 'completed').length;
  const pending = reservations.filter((item) => item.status === 'blocked').length;
  res.json({ success: true, data: {
    date,
    vehicles: { total: vehicleCounts.reduce((sum, item) => sum + item.count, 0), available: count(vehicleCounts, 'Available'), inTransit: count(vehicleCounts, 'In transit'), scheduled: count(vehicleCounts, 'Scheduled'), maintenance: count(vehicleCounts, 'Maintenance') },
    stores: { total: storeCounts.reduce((sum, item) => sum + item.count, 0), active: count(storeCounts, 'Active'), inactive: count(storeCounts, 'Inactive') },
    reservations: { total: reservations.length, confirmed: reservations.filter((item) => item.status === 'confirmed').length, blocked: pending, completed },
    activity: recentReservations.map((item) => ({ id: item._id, type: 'reservation', title: `Reservation ${item.status}`, detail: `${item.bookingRef || 'Slot'} at ${item.store?.name || 'store'}`, date: item.date, start: item.start, updatedAt: item.updatedAt })),
  } });
};

exports.getActivity = async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const reservations = await Reservation.find().sort({ updatedAt: -1 }).limit(limit).populate('store', 'name').populate('vehicle', 'registration').lean();
  res.json({ success: true, data: reservations.map((item) => ({ id: item._id, type: 'reservation', title: `Reservation ${item.status}`, detail: `${item.bookingRef || 'Slot'} at ${item.store?.name || 'store'}`, vehicle: item.vehicle?.registration || null, date: item.date, start: item.start, end: item.end, updatedAt: item.updatedAt })) });
};
