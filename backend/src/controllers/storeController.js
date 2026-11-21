const mongoose = require('mongoose');
const Store = require('../models/Store');

exports.createStore = async (req, res) => {
  const store = await Store.create(req.body);
  res.status(201).json({ success: true, data: store });
};

exports.getStores = async (_req, res) => {
  const stores = await Store.find().sort({ createdAt: -1 });
  res.json({ success: true, data: stores });
};

exports.getStore = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid store ID' });
  const store = await Store.findById(req.params.id);
  if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
  res.json({ success: true, data: store });
};

exports.updateStore = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid store ID' });
  const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
  res.json({ success: true, data: store });
};

exports.deleteStore = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid store ID' });
  const store = await Store.findByIdAndDelete(req.params.id);
  if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
  res.json({ success: true, message: 'Store deleted' });
};

exports.updateOperatingHours = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid store ID' });
  const { open, close } = req.body;
  if (!/^\d{2}:\d{2}$/.test(open || '') || !/^\d{2}:\d{2}$/.test(close || '') || close <= open) return res.status(400).json({ success: false, message: 'Provide valid open and close times' });
  const store = await Store.findByIdAndUpdate(req.params.id, { operatingHours: { open, close } }, { new: true, runValidators: true });
  if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
  res.json({ success: true, data: store });
};

exports.updateLoadingSlotRules = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid store ID' });
  const { docks, minSlot } = req.body;
  if (!Number.isInteger(Number(docks)) || Number(docks) < 1 || ![15, 30, 45, 60].includes(Number(minSlot))) return res.status(400).json({ success: false, message: 'docks must be at least 1 and minSlot must be 15, 30, 45 or 60' });
  const store = await Store.findByIdAndUpdate(req.params.id, { docks: Number(docks), minSlot: Number(minSlot) }, { new: true, runValidators: true });
  if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
  res.json({ success: true, data: store });
};
