const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register page
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Register POST
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, phone, address } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { error: 'Email already registered' });
        }

        const user = new User({ name, email, password, role, phone, address });
        await user.save();

        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error: 'Registration failed' });
    }
});

// Login page
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Login POST
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid credentials' });
        }

        req.session.userId = user._id;
        req.session.role = user.role;
        req.session.name = user.name;

        if (user.role === 'shopkeeper') {
            res.redirect('/shopkeeper/dashboard');
        } else {
            res.redirect('/customer/dashboard');
        }
    } catch (error) {
        res.render('login', { error: 'Login failed' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
