const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema(
  {
    sequence: { type: Number, required: true },
    storeId: { type: String, required: true, trim: true },
    storeName: { type: String, required: true, trim: true },
    actionType: { type: String, enum: ['pickup', 'dropoff', 'return'], required: true },
    bookingIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    scheduledArrival: Date,
    scheduledDeparture: Date,
    estimatedArrival: Date,
    slotCode: { type: String, trim: true },
    totalWeightKg: { type: Number, default: 0 },
    totalPallets: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'arrived', 'in_progress', 'completed', 'delayed', 'skipped'],
      default: 'pending',
    },
    notes: { type: String, trim: true },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    tripCode: { type: String, required: true, unique: true, trim: true },
    vehicleId: { type: String, trim: true },
    vehicleCode: { type: String, trim: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    maxCapacityKg: { type: Number, default: 3970 },
    totalLoadKg: { type: Number, default: 0 },
    totalPallets: { type: Number, default: 0 },
    stops: [stopSchema],
    status: {
      type: String,
      enum: ['planned', 'dispatched', 'in_progress', 'delayed', 'completed', 'cancelled'],
      default: 'planned',
    },
    lastLocation: {
      lat: Number,
      lng: Number,
      speed: Number,
      heading: Number,
      accuracy: Number,
      updatedAt: Date,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);