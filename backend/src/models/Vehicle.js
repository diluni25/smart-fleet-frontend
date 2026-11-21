const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registration: { type: String, required: true, unique: true, trim: true, uppercase: true },
  type: { type: String, required: true, trim: true },
  capacity: { type: Number, required: true, min: 1 },
  unit: { type: String, required: true, trim: true, default: 'Crates' },
  status: { type: String, enum: ['Available', 'In transit', 'Scheduled', 'Maintenance'], default: 'Available' },
  availability: {
    from: { type: String, default: '08:00' },
    until: { type: String, default: '18:00' },
  },
  driver: { type: String, trim: true, default: '' },
  homeStore: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
