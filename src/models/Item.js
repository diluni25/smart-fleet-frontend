const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true, uppercase: true },
  name: { type: String, required: true, trim: true },
  unit: { type: String, required: true, trim: true },
  stock: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
