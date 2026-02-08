const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Vegetable = require('../models/Vegetable');
const Order = require('../models/Order');

// Middleware to check if user is shopkeeper
const isShopkeeper = (req, res, next) => {
    if (req.session.role === 'shopkeeper') {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
});

// Dashboard
router.get('/dashboard', isShopkeeper, async (req, res) => {
    try {
        const vegetables = await Vegetable.find().sort({ createdAt: -1 });
        const orders = await Order.find().populate('customer').sort({ orderDate: -1 }).limit(10);
        res.render('shopkeeper/dashboard', { 
            user: req.session, 
            vegetables,
            orders
        });
    } catch (error) {
        res.redirect('/');
    }
});

// Add vegetable page
router.get('/add-vegetable', isShopkeeper, (req, res) => {
    res.render('shopkeeper/add-vegetable', { user: req.session, error: null });
});

// Add vegetable POST
router.post('/add-vegetable', isShopkeeper, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, quantity, unit, category } = req.body;
        
        const vegetable = new Vegetable({
            name,
            description,
            price,
            quantity,
            unit,
            category,
            image: req.file ? '/uploads/' + req.file.filename : '/uploads/default-vegetable.jpg',
            addedBy: req.session.userId
        });

        await vegetable.save();
        res.redirect('/shopkeeper/dashboard');
    } catch (error) {
        res.render('shopkeeper/add-vegetable', { 
            user: req.session, 
            error: 'Failed to add vegetable' 
        });
    }
});

// Edit vegetable page
router.get('/edit-vegetable/:id', isShopkeeper, async (req, res) => {
    try {
        const vegetable = await Vegetable.findById(req.params.id);
        res.render('shopkeeper/edit-vegetable', { 
            user: req.session, 
            vegetable,
            error: null 
        });
    } catch (error) {
        res.redirect('/shopkeeper/dashboard');
    }
});

// Edit vegetable POST
router.post('/edit-vegetable/:id', isShopkeeper, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, quantity, unit, category } = req.body;
        
        const updateData = {
            name,
            description,
            price,
            quantity,
            unit,
            category
        };

        if (req.file) {
            updateData.image = '/uploads/' + req.file.filename;
        }

        await Vegetable.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/shopkeeper/dashboard');
    } catch (error) {
        res.redirect('/shopkeeper/dashboard');
    }
});

// Delete vegetable
router.post('/delete-vegetable/:id', isShopkeeper, async (req, res) => {
    try {
        await Vegetable.findByIdAndDelete(req.params.id);
        res.redirect('/shopkeeper/dashboard');
    } catch (error) {
        res.redirect('/shopkeeper/dashboard');
    }
});

// Update order status
router.post('/update-order/:id', isShopkeeper, async (req, res) => {
    try {
        const { status } = req.body;
        await Order.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/shopkeeper/dashboard');
    } catch (error) {
        res.redirect('/shopkeeper/dashboard');
    }
});

module.exports = router;
