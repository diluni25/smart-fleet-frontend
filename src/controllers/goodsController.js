const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");
const wrap = require("../middleware/asyncHandler");
const { normalizeConfirmedItems } = require("../utils/validators");
async function getBooking(id) {
  if (!mongoose.isValidObjectId(id))
    throw new ApiError(400, "Invalid Booking MongoDB ID");
  const doc = await Booking.findById(id);
  if (!doc) throw new ApiError(404, "Booking not found");
  return doc;
}
exports.handover = wrap(async (req, res) => {
  const doc = await getBooking(req.params.id);
  if (doc.status !== "Approved")
    throw new ApiError(409, "Handover only allowed on approved bookings");
  if (
    req.body.goodsPrepared !== true ||
    req.body.quantitiesVerified !== true ||
    req.body.driverAcknowledged !== true
  )
    throw new ApiError(400, "Complete all release checklist confirmations");
  const items = normalizeConfirmedItems(req.body.items, doc.items);
  if (items.some((row, i) => row.quantity > doc.items[i].quantity))
    throw new ApiError(
      400,
      "Handed-over quantity cannot exceed planned quantity",
    );
  doc.handover = {
    confirmedAt: new Date(),
    loadingBay: String(req.body.loadingBay || ""),
    items,
  };
  doc.status = "InTransit";
  await doc.save();
  res.json({ success: true, data: doc });
});
exports.receipt = wrap(async (req, res) => {
  const doc = await getBooking(req.params.id);
  if (doc.status !== "InTransit")
    throw new ApiError(409, "Receipt only allowed after handover");
  const items = normalizeConfirmedItems(req.body.items, doc.handover.items);
  const mismatch = items.some(
    (row, i) => row.quantity !== doc.handover.items[i].quantity,
  );
  doc.receipt = {
    confirmedAt: new Date(),
    receivingBay: String(req.body.receivingBay || ""),
    items,
  };
  doc.status = mismatch ? "NeedsReview" : "Completed";
  await doc.save();
  res.json({
    success: true,
    data: doc,
    variance: items.map((row, i) => ({
      itemId: row.item,
      dispatched: doc.handover.items[i].quantity,
      received: row.quantity,
      variance: row.quantity - doc.handover.items[i].quantity,
    })),
  });
});
exports.discrepancy = wrap(async (req, res) => {
  const doc = await getBooking(req.params.id);
  if (doc.status !== "NeedsReview")
    throw new ApiError(409, "No receipt mismatch pending review");
  const id = String(req.body.itemId || "");
  const dispatched = doc.handover.items.find((row) => String(row.item) === id);
  const received = doc.receipt.items.find((row) => String(row.item) === id);
  if (!dispatched || !received || dispatched.quantity === received.quantity)
    throw new ApiError(400, "Choose a mismatched item");
  if (typeof req.body.reason !== "string" || !req.body.reason.trim())
    throw new ApiError(400, "Discrepancy reason required");
  if (doc.discrepancies.some((row) => String(row.item) === id))
    throw new ApiError(409, "Discrepancy already recorded for item");
  doc.discrepancies.push({
    item: dispatched.item,
    dispatched: dispatched.quantity,
    received: received.quantity,
    reason: req.body.reason.trim(),
    note: String(req.body.note || ""),
    evidenceReference: String(req.body.evidenceReference || ""),
  });
  await doc.save();
  res.status(201).json({ success: true, data: doc });
});
