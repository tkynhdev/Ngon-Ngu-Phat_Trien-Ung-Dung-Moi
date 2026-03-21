const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);