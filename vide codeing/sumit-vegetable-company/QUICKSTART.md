# Quick Start Guide - Sumit Vegetable Company

## 🚀 Get Started in 5 Minutes!

### Step 1: Install Dependencies
```bash
cd sumit-vegetable-company
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your system. If you have MongoDB installed:
```bash
mongod
```

Or if using MongoDB as a service:
```bash
sudo systemctl start mongod    # Linux
brew services start mongodb-community    # macOS
```

### Step 3: Run the Application
```bash
npm start
```

### Step 4: Open Your Browser
Navigate to: **http://localhost:3000**

---

## 📝 First Time Setup

### Create a Shopkeeper Account
1. Click "Sign Up"
2. Fill in the registration form
3. Select "Shopkeeper" as the role
4. Login with your credentials

### Add Your First Vegetable
1. After login, you'll see the Shopkeeper Dashboard
2. Click "Add New Vegetable"
3. Fill in the details:
   - Name: Tomato
   - Category: Fruit Vegetables
   - Description: Fresh red tomatoes
   - Price: 40
   - Quantity: 50
   - Unit: kg
   - Upload an image (optional)
4. Click "Add Vegetable"

### Create a Customer Account
1. Logout from shopkeeper account
2. Click "Sign Up"
3. Fill in the registration form
4. Select "Customer" as the role
5. Login and start shopping!

---

## 🎯 Key Features

### Shopkeeper Features
- ✅ Manage vegetable inventory
- ✅ Upload product images
- ✅ Track orders
- ✅ Update order status
- ✅ View statistics

### Customer Features
- ✅ Browse vegetables
- ✅ Add to cart
- ✅ Place orders
- ✅ Track order history

---

## 🐛 Troubleshooting

### MongoDB Connection Error?
Make sure MongoDB is running:
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB if not running
mongod
```

### Port 3000 Already in Use?
Change the port in `.env` file:
```
PORT=5000
```

### Cannot Upload Images?
Make sure the `uploads` folder exists and has write permissions:
```bash
chmod 755 uploads
```

---

## 📚 Tech Stack
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Frontend**: EJS + CSS3 + JavaScript
- **File Upload**: Multer
- **Security**: bcryptjs + express-session

---

## 💡 Sample Data

### Sample Vegetables to Add:
1. **Tomato** - ₹40/kg - Fruit Vegetables
2. **Potato** - ₹30/kg - Root Vegetables
3. **Spinach** - ₹20/kg - Leafy Vegetables
4. **Carrot** - ₹50/kg - Root Vegetables
5. **Cabbage** - ₹25/kg - Leafy Vegetables
6. **Onion** - ₹35/kg - Root Vegetables

---

## 🎨 Design Highlights

The website features a beautiful organic-modern design with:
- Fresh green color scheme
- Smooth animations
- Responsive layout
- Professional typography (Playfair Display + Manrope)
- Shopping cart with real-time updates

---

## 📞 Need Help?

Check the full README.md for detailed documentation!

Happy Selling! 🥬🥕🍅
