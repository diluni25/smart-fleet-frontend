const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json({ success: true, data: vehicle });
};

exports.getVehicles = async (_req, res) => {
  const vehicles = await Vehicle.find().populate('homeStore', 'name type').sort({ createdAt: -1 });
  res.json({ success: true, data: vehicles });
};

exports.getVehicle = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });
  const vehicle = await Vehicle.findById(req.params.id).populate('homeStore', 'name type');
  if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
  res.json({ success: true, data: vehicle });
};

exports.updateVehicle = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('homeStore', 'name type');
  if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
  res.json({ success: true, data: vehicle });
};

exports.deleteVehicle = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
  res.json({ success: true, message: 'Vehicle deleted' });
};
