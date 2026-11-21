const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true, default: 'Retail store' },
  operatingHours: {
    open: { type: String, required: true, default: '08:00' },
    close: { type: String, required: true, default: '18:00' },
  },
  docks: { type: Number, required: true, min: 1, default: 1 },
  minSlot: { type: Number, required: true, enum: [15, 30, 45, 60], default: 30 },
  address: { type: String, trim: true, default: '' },
  manager: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
