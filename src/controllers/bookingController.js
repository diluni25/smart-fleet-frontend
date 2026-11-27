const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");
const wrap = require("../middleware/asyncHandler");
const {
  validDate,
  todayAtStores,
  normalizeItems,
  validateVehicleCapacity,
} = require("../utils/validators");
const statuses = [
  "Pending",
  "Approved",
  "InTransit",
  "Received",
  "NeedsReview",
  "Completed",
  "Cancelled",
  "Rejected",
];
function checkBasics(body) {
  if (
    typeof body.origin !== "string" ||
    !body.origin.trim() ||
    typeof body.destination !== "string" ||
    !body.destination.trim() ||
    body.origin.trim() === body.destination.trim()
  )
    throw new ApiError(
      400,
      "Origin and destination must be provided and different",
    );
  if (!validDate(body.transferDate))
    throw new ApiError(400, "transferDate must be a valid YYYY-MM-DD date");
  if (body.transferDate < todayAtStores())
    throw new ApiError(400, "Transfer date cannot be in the past");
  if (typeof body.timeWindow !== "string" || !body.timeWindow.trim())
    throw new ApiError(400, "Time window required");
}
function checkId(id) {
  if (!mongoose.isValidObjectId(id))
    throw new ApiError(400, "Invalid Booking MongoDB ID");
}
exports.create = wrap(async (req, res) => {
  checkBasics(req.body);
  const items = await normalizeItems(req.body.items);
  await validateVehicleCapacity(req.body.vehicle, items);
  const doc = await Booking.create({
    origin: req.body.origin.trim(),
    destination: req.body.destination.trim(),
    transferDate: req.body.transferDate,
    timeWindow: req.body.timeWindow.trim(),
    items,
    vehicle: req.body.vehicle || null,
  });
  res.status(201).json({ success: true, data: doc });
});
exports.list = wrap(async (req, res) => {
  const filter = {};
  if (req.query.status) {
    if (!statuses.includes(req.query.status))
      throw new ApiError(400, "Invalid status filter");
    filter.status = req.query.status;
  }
  if (req.query.reviewStatus) {
    if (!["Pending", "Approved", "Rejected"].includes(req.query.reviewStatus))
      throw new ApiError(400, "Invalid reviewStatus");
    filter.reviewStatus = req.query.reviewStatus;
  }
  const data = await Booking.find(filter)
    .populate("items.item", "code name unit")
    .sort({ createdAt: -1 });
  res.json({ success: true, data });
});
exports.get = wrap(async (req, res) => {
  checkId(req.params.id);
  const doc = await Booking.findById(req.params.id)
    .populate("items.item", "code name unit")
    .populate("vehicle", "registration capacity");
  if (!doc) throw new ApiError(404, "Booking not found");
  res.json({ success: true, data: doc });
});
exports.update = wrap(async (req, res) => {
  checkId(req.params.id);
  const doc = await Booking.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Booking not found");
  if (doc.reviewStatus !== "Pending" || doc.status !== "Pending")
    throw new ApiError(409, "Only pending bookings can be edited");
  const next = {
    origin: req.body.origin ?? doc.origin,
    destination: req.body.destination ?? doc.destination,
    transferDate: req.body.transferDate ?? doc.transferDate,
    timeWindow: req.body.timeWindow ?? doc.timeWindow,
  };
  checkBasics(next);
  const items =
    req.body.items !== undefined
      ? await normalizeItems(req.body.items)
      : await normalizeItems(
          doc.items.map((i) => ({
            itemId: i.item,
            quantity: i.quantity,
            unit: i.unit,
          })),
        );
  const vehicle =
    req.body.vehicle === undefined ? doc.vehicle : req.body.vehicle;
  await validateVehicleCapacity(vehicle, items);
  Object.assign(doc, {
    ...next,
    origin: next.origin.trim(),
    destination: next.destination.trim(),
    timeWindow: next.timeWindow.trim(),
    items,
    vehicle: vehicle || null,
  });
  await doc.save();
  res.json({ success: true, data: doc });
});
exports.remove = wrap(async (req, res) => {
  checkId(req.params.id);
  const doc = await Booking.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Booking not found");
  if (doc.status !== "Pending")
    throw new ApiError(409, "Only pending bookings can be cancelled");
  doc.status = "Cancelled";
  await doc.save();
  res.json({ success: true, data: doc, message: "Booking cancelled" });
});
exports.review = wrap(async (req, res) => {
  checkId(req.params.id);
  const doc = await Booking.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Booking not found");
  if (doc.reviewStatus !== "Pending" || doc.status !== "Pending")
    throw new ApiError(409, "Booking already reviewed or not pending");
  const decision = req.body.decision;
  if (!["Approved", "Rejected"].includes(decision))
    throw new ApiError(400, "Decision must be Approved or Rejected");
  if (decision === "Approved") {
    // Re-check stock and units against current item records at approval time.
    const verified = await normalizeItems(
      doc.items.map((i) => ({
        itemId: i.item,
        quantity: i.quantity,
        unit: i.unit,
      })),
    );
    await validateVehicleCapacity(doc.vehicle, verified);
  }
  doc.reviewStatus = decision;
  doc.status = decision;
  doc.reviewNote = String(req.body.note || "");
  await doc.save();
  res.json({ success: true, data: doc });
});
