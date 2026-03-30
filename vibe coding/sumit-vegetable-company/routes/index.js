const express = require('express');
const router = express.Router();
const Vegetable = require('../models/Vegetable');

// Home page
router.get('/', async (req, res) => {
    try {
        const vegetables = await Vegetable.find({ inStock: true }).limit(6);
        res.render('index', { vegetables, user: req.session });
    } catch (error) {
        res.render('index', { vegetables: [], user: req.session });
    }
});

module.exports = router;
