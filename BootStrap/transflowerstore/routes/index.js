const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const featured = await Product.find().limit(8).lean();
  res.render('index', { title: 'Transflower Store', featured });
});

router.get('/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  res.render('products', { title: 'Products', products, categories });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

router.post('/contact', (req, res) => {
  req.session.success = 'Thank you! We will get back to you soon.';
  res.redirect('/contact');
});

module.exports = router;
