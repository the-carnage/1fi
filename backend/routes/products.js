const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .select('name slug brand category variants.images variants.price variants.mrp')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('error fetching products:', error);
    res.status(500).json({ message: 'failed to fetch products', error: error.message });
  }
});
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('error fetching product:', error);
    res.status(500).json({ message: 'failed to fetch product', error: error.message });
  }
});
module.exports = router;
