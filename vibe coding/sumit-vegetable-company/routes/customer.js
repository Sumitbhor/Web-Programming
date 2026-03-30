const express = require('express');
const router = express.Router();
const Vegetable = require('../models/Vegetable');
const Order = require('../models/Order');
const User = require('../models/User');

// Middleware to check if user is customer
const isCustomer = (req, res, next) => {
    if (req.session.role === 'customer') {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

// Customer Dashboard
router.get('/dashboard', isCustomer, async (req, res) => {
    try {
        const vegetables = await Vegetable.find({ inStock: true });
        const orders = await Order.find({ customer: req.session.userId })
            .populate('items.vegetable')
            .sort({ orderDate: -1 });
        
        res.render('customer/dashboard', { 
            user: req.session, 
            vegetables,
            orders
        });
    } catch (error) {
        res.redirect('/');
    }
});

// Place order
router.post('/place-order', isCustomer, async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress } = req.body;
        
        const order = new Order({
            customer: req.session.userId,
            items: JSON.parse(items),
            totalAmount,
            deliveryAddress
        });

        await order.save();

        // Update vegetable quantities
        for (let item of JSON.parse(items)) {
            await Vegetable.findByIdAndUpdate(item.vegetable, {
                $inc: { quantity: -item.quantity }
            });
        }

        res.json({ success: true, orderId: order._id });
    } catch (error) {
        res.json({ success: false, error: 'Failed to place order' });
    }
});

// View all vegetables
router.get('/vegetables', isCustomer, async (req, res) => {
    try {
        const vegetables = await Vegetable.find({ inStock: true });
        res.render('customer/vegetables', { 
            user: req.session, 
            vegetables
        });
    } catch (error) {
        res.redirect('/customer/dashboard');
    }
});

module.exports = router;
