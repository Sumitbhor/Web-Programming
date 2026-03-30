const express = require('express');
const router = express.Router();
const { requireCustomer } = require('../middleware/auth');

router.use(requireCustomer);

router.get('/dashboard', (req, res) => {
  res.render('customer/dashboard', { title: 'My Account' });
});

module.exports = router;
