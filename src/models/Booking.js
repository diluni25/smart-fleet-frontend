const mongoose = require("mongoose");
const bookingItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true },
  },
  { _id: false },
);
const confirmationItemSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true },
  },
  { _id: false },
);
const discrepancySchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    dispatched: { type: Number, required: true },
    received: { type: Number, required: true },
    reason: { type: String, required: true, trim: true },
    note: { type: String, default: "" },
    evidenceReference: { type: String, default: "" }, // metadata/reference only; no file upload in this API
    recordedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);
const bookingSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    transferDate: { type: String, required: true }, // YYYY-MM-DD, local store date
    timeWindow: { type: String, required: true, trim: true },
    items: {
      type: [bookingItemSchema],
      validate: [(v) => v.length > 0, "Add at least one item"],
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },
    reviewStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "InTransit",
        "Received",
        "NeedsReview",
        "Completed",
        "Cancelled",
        "Rejected",
      ],
      default: "Pending",
    },
    reviewNote: { type: String, default: "" },
    handover: {
      confirmedAt: Date,
      loadingBay: String,
      items: [confirmationItemSchema],
    },
    receipt: {
      confirmedAt: Date,
      receivingBay: String,
      items: [confirmationItemSchema],
    },
    discrepancies: [discrepancySchema],
  },
  { timestamps: true },
);
module.exports = mongoose.model("Booking", bookingSchema);
