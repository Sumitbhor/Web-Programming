require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
const { attachUser } = require('./middleware/auth');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const shopkeeperRoutes = require('./routes/shopkeeper');
const customerRoutes = require('./routes/customer');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/transflowerstore';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'transflower-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(attachUser);

app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/shopkeeper', shopkeeperRoutes);
app.use('/customer', customerRoutes);

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
