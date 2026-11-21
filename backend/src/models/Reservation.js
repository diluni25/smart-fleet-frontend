const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  start: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
  end: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
  type: { type: String, enum: ['Loading', 'Unloading'], required: true },
  status: { type: String, enum: ['confirmed', 'blocked', 'completed', 'cancelled'], default: 'confirmed' },
  bookingRef: { type: String, trim: true, default: '' },
  notes: { type: String, trim: true, default: '' },
}, { timestamps: true });

reservationSchema.index({ store: 1, date: 1, start: 1, end: 1 });
reservationSchema.index({ vehicle: 1, date: 1, start: 1, end: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
