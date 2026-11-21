const mongoose = require('mongoose');
const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json({ success: true, data: item });
};

exports.getItems = async (_req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json({ success: true, data: items });
};

exports.getItem = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid item ID' });
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
};

exports.updateItem = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid item ID' });
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
};

exports.deleteItem = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid item ID' });
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, message: 'Item deleted' });
};
