const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const { requireShopkeeper } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname) || '.jpg';
    cb(null, unique);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/i.test(path.extname(file.originalname));
    if (allowed) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

router.use(requireShopkeeper);

router.get('/dashboard', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.render('shopkeeper/dashboard', { title: 'Shopkeeper Dashboard', products });
});

router.get('/add-product', (req, res) => {
  res.render('shopkeeper/add-product', { title: 'Add Product' });
});

router.post('/add-product', (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      req.session.error = err.message || 'Invalid or oversized image. Max 5MB.';
      return res.redirect('/shopkeeper/add-product');
    }
    const { name, description, price, category } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';
    try {
      await Product.create({
        name: name || 'Product',
        description: description || '',
        price: Number(price) || 0,
        category: category || 'flowers',
        image,
        addedBy: req.session.userId
      });
      req.session.success = 'Product added.';
    } catch (e) {
      req.session.error = 'Failed to add product.';
    }
    res.redirect('/shopkeeper/dashboard');
  });
});

router.get('/edit-product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.redirect('/shopkeeper/dashboard');
  res.render('shopkeeper/edit-product', { title: 'Edit Product', product });
});

router.post('/edit-product/:id', (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      req.session.error = err.message || 'Invalid or oversized image.';
      return res.redirect('/shopkeeper/edit-product/' + req.params.id);
    }
    const { name, description, price, category } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/shopkeeper/dashboard');
    product.name = name || product.name;
    product.description = description ?? product.description;
    product.price = Number(price) ?? product.price;
    product.category = category || product.category;
    if (req.file) product.image = '/uploads/' + req.file.filename;
    await product.save();
    req.session.success = 'Product updated.';
    res.redirect('/shopkeeper/dashboard');
  });
});

router.post('/delete-product/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.session.success = 'Product deleted.';
  res.redirect('/shopkeeper/dashboard');
});

module.exports = router;
