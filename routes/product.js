const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Create Product and corresponding Inventory
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    const inventory = new Inventory({ product: product._id });
    await inventory.save();

    res.status(201).json({ product, inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products (optional, but since inventory is main, maybe not needed)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;