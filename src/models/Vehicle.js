const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleCode: {
      type: String,
      required: [true, 'Vehicle code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['truck', 'lorry', 'van', 'mini_truck'],
      default: 'lorry',
    },
    maxWeightKg: {
      type: Number,
      required: [true, 'Max weight capacity (kg) is required'],
      min: 1,
    },
    maxPallets: {
      type: Number,
      required: [true, 'Max pallet capacity is required'],
      min: 1,
    },
    status: {
      type: String,
      enum: ['available', 'assigned', 'in_transit', 'maintenance', 'inactive'],
      default: 'available',
    },
    currentStoreId: {
      type: String,
      trim: true,
      default: null,
    },
    assignedDriverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);