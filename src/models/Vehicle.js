const mongoose = require("mongoose");
// Minimal shared vehicle contract. Coordinate this with the vehicle-management module owner.
const vehicleSchema = new mongoose.Schema(
  {
    registration: { type: String, required: true, unique: true, trim: true },
    available: { type: Boolean, default: true },
    capacity: {
      quantity: { type: Number, required: true, min: 0 },
      unit: { type: String, required: true, trim: true },
    },
  },
  { timestamps: true },
);
module.exports =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
