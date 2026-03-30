const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ----- Customer Portal -----
router.get('/customer/login', (req, res) => {
  if (req.session && req.session.userId && req.session.role === 'customer') return res.redirect('/customer/dashboard');
  if (req.session && req.session.userId && req.session.role === 'shopkeeper') return res.redirect('/shopkeeper/dashboard');
  res.render('customer/login', { title: 'Customer Login' });
});

router.post('/customer/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.session.error = 'Email and password are required.';
    return res.redirect('/customer/login');
  }
  try {
    const user = await User.findOne({ email, role: 'customer' });
    if (!user || !(await user.comparePassword(password))) {
      req.session.error = 'Invalid email or password.';
      return res.redirect('/customer/login');
    }
    req.session.userId = user._id;
    req.session.role = 'customer';
    req.session.user = { name: `${user.firstName} ${user.lastName}`, email: user.email };
    return res.redirect('/customer/dashboard');
  } catch (err) {
    req.session.error = 'Login failed. Try again.';
    res.redirect('/customer/login');
  }
});

router.get('/customer/register', (req, res) => {
  res.render('customer/register', { title: 'Customer Register' });
});

router.post('/customer/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    req.session.error = 'All fields are required.';
    return res.redirect('/customer/register');
  }
  if (password.length < 6) {
    req.session.error = 'Password must be at least 6 characters.';
    return res.redirect('/customer/register');
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      req.session.error = 'Email already registered.';
      return res.redirect('/customer/register');
    }
    await User.create({ firstName, lastName, email, password, role: 'customer' });
    req.session.success = 'Account created. Please login.';
    res.redirect('/customer/login');
  } catch (err) {
    req.session.error = 'Registration failed. Try again.';
    res.redirect('/customer/register');
  }
});

// ----- Shopkeeper Portal -----
router.get('/shopkeeper/login', (req, res) => {
  if (req.session && req.session.userId && req.session.role === 'shopkeeper') return res.redirect('/shopkeeper/dashboard');
  if (req.session && req.session.userId && req.session.role === 'customer') return res.redirect('/customer/dashboard');
  res.render('shopkeeper/login', { title: 'Shopkeeper Login' });
});

router.post('/shopkeeper/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.session.error = 'Email and password are required.';
    return res.redirect('/shopkeeper/login');
  }
  try {
    const user = await User.findOne({ email, role: 'shopkeeper' });
    if (!user || !(await user.comparePassword(password))) {
      req.session.error = 'Invalid email or password.';
      return res.redirect('/shopkeeper/login');
    }
    req.session.userId = user._id;
    req.session.role = 'shopkeeper';
    req.session.user = { name: `${user.firstName} ${user.lastName}`, email: user.email };
    return res.redirect('/shopkeeper/dashboard');
  } catch (err) {
    req.session.error = 'Login failed. Try again.';
    res.redirect('/shopkeeper/login');
  }
});

router.get('/shopkeeper/register', (req, res) => {
  res.render('shopkeeper/register', { title: 'Shopkeeper Register' });
});

router.post('/shopkeeper/register', async (req, res) => {
  const { firstName, lastName, email, password, storeName } = req.body;
  if (!firstName || !lastName || !email || !password) {
    req.session.error = 'All required fields are missing.';
    return res.redirect('/shopkeeper/register');
  }
  if (password.length < 6) {
    req.session.error = 'Password must be at least 6 characters.';
    return res.redirect('/shopkeeper/register');
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      req.session.error = 'Email already registered.';
      return res.redirect('/shopkeeper/register');
    }
    await User.create({ firstName, lastName, email, password, role: 'shopkeeper' });
    req.session.success = 'Account created. Please login to your shopkeeper portal.';
    res.redirect('/shopkeeper/login');
  } catch (err) {
    req.session.error = 'Registration failed. Try again.';
    res.redirect('/shopkeeper/register');
  }
});

// ----- Logout (both portals) -----
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
