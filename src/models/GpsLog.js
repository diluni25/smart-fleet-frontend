const mongoose = require('mongoose');

const gpsLogSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, 'Trip ID is required'],
      index: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Driver ID is required'],
    },
    vehicleId: {
      type: String,
      trim: true,
    },
    vehicleCode: {
      type: String,
      trim: true,
    },
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: -90,
      max: 90,
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: -180,
      max: 180,
    },
    speed: {
      type: Number,
      default: 0,
      min: 0,
    },
    heading: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: null,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GpsLog', gpsLogSchema);