const mongoose = require("mongoose");
const Item = require("../models/Item");
const Vehicle = require("../models/Vehicle");
const ApiError = require("./ApiError");
const isObjectId = mongoose.isValidObjectId;
const positiveInteger = (value) => Number.isInteger(value) && value > 0;
const nonnegativeInteger = (value) => Number.isInteger(value) && value >= 0;
function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}
function todayAtStores() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: process.env.STORE_TIMEZONE || "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (name) => parts.find((p) => p.type === name).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
async function normalizeItems(rows) {
  if (!Array.isArray(rows) || !rows.length)
    throw new ApiError(400, "At least one item is required");
  const ids = rows.map((row) => row && (row.itemId || row.item));
  if (ids.some((id) => !isObjectId(id)))
    throw new ApiError(400, "Use Item MongoDB IDs in items[].itemId");
  if (new Set(ids.map(String)).size !== ids.length)
    throw new ApiError(400, "Duplicate item in booking");
  // Older Item documents were created before the active field existed. Treat missing as active;
  // explicitly inactive (false) documents remain blocked.
  const items = await Item.find({ _id: { $in: ids }, active: { $ne: false } });
  const byId = new Map(items.map((item) => [String(item._id), item]));
  return rows.map((row) => {
    const item = byId.get(String(row.itemId || row.item));
    if (!item) throw new ApiError(404, "Booking item not found or inactive");
    if (!positiveInteger(row.quantity))
      throw new ApiError(400, `Invalid quantity for ${item.code}`);
    if (row.unit && row.unit !== item.unit)
      throw new ApiError(
        400,
        `Unit mismatch for ${item.code}: expected ${item.unit}`,
      );
    if (row.quantity > item.stock)
      throw new ApiError(
        400,
        `Requested quantity for ${item.code} exceeds current stock`,
      );
    return { item: item._id, quantity: row.quantity, unit: item.unit };
  });
}
async function validateVehicleCapacity(vehicleId, rows) {
  if (!vehicleId) return null;
  if (!isObjectId(vehicleId)) throw new ApiError(400, "Invalid vehicle ID");
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle || !vehicle.available)
    throw new ApiError(400, "Vehicle missing or unavailable");
  if (!vehicle.capacity || !vehicle.capacity.unit)
    throw new ApiError(400, "Vehicle capacity is not configured");
  if (rows.some((row) => row.unit !== vehicle.capacity.unit))
    throw new ApiError(
      400,
      "Incompatible item/vehicle capacity units. Use approved conversions",
    );
  const total = rows.reduce((sum, row) => sum + row.quantity, 0);
  if (total > vehicle.capacity.quantity)
    throw new ApiError(400, "Vehicle capacity exceeded");
  return vehicle;
}
function normalizeConfirmedItems(rows, plannedRows) {
  if (!Array.isArray(rows) || rows.length !== plannedRows.length)
    throw new ApiError(400, "Provide one quantity for every planned item");
  const ids = rows.map((row) =>
    String((row && (row.itemId || row.item)) || ""),
  );
  if (new Set(ids).size !== plannedRows.length)
    throw new ApiError(400, "Confirmation items must be unique");
  const mapped = new Map(
    rows.map((row) => [String(row.itemId || row.item), row]),
  );
  return plannedRows.map((planned) => {
    const row = mapped.get(String(planned.item));
    if (!row || !nonnegativeInteger(row.quantity))
      throw new ApiError(400, "Invalid or missing confirmed quantity");
    if (row.unit && row.unit !== planned.unit)
      throw new ApiError(400, "Confirmed unit mismatch");
    return { item: planned.item, quantity: row.quantity, unit: planned.unit };
  });
}
module.exports = {
  validDate,
  todayAtStores,
  normalizeItems,
  validateVehicleCapacity,
  normalizeConfirmedItems,
};
