const mongoose = require('mongoose');
const Item = require('../models/Item');
const Booking = require('../models/Booking');
const ApiError = require('../utils/ApiError');
const pick = (src, keys) => Object.fromEntries(keys.filter(key => Object.hasOwn(src, key)).map(key => [key, src[key]]));
exports.createItem = async (req, res) => {
  const item = await Item.create(pick(req.body, ['code', 'name', 'unit', 'stock', 'active']));
  res.status(201).json({ success: true, data: item });
};
exports.getItems = async (_req, res) => {
  res.json({ success: true, data: await Item.find().sort({ createdAt: -1 }) });
};
exports.getItem = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, 'Invalid item ID');
  const item = await Item.findById(req.params.id);
  if (!item) throw new ApiError(404, 'Item not found');
  res.json({ success: true, data: item });
};
exports.updateItem = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, 'Invalid item ID');
  const item = await Item.findByIdAndUpdate(req.params.id, { $set: pick(req.body, ['code','name','unit','stock','active']) }, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Item not found');
  res.json({ success: true, data: item });
};
exports.deleteItem = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, 'Invalid item ID');
  const linked = await Booking.exists({ 'items.item': req.params.id });
  if (linked) throw new ApiError(409, 'Item is referenced by bookings; mark it inactive instead');
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Item not found');
  res.json({ success: true, message: 'Item deleted' });
};
