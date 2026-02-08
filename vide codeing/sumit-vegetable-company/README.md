# Sumit Vegetable Company - E-commerce Website

A full-featured e-commerce platform for selling fresh vegetables, built with Node.js, Express, MongoDB, and EJS.

## Features

### For Shopkeepers
- ✅ Secure login system
- ✅ Add, edit, and delete vegetables
- ✅ Upload product images
- ✅ Manage inventory and quantities
- ✅ View and manage customer orders
- ✅ Update order status
- ✅ Dashboard with statistics

### For Customers
- ✅ Secure registration and login
- ✅ Browse fresh vegetables
- ✅ Shopping cart functionality
- ✅ Place orders with delivery address
- ✅ View order history
- ✅ Real-time stock information

### Technical Features
- ✅ Node.js + Express backend
- ✅ MongoDB database with Mongoose ODM
- ✅ File upload with Multer
- ✅ Password hashing with bcryptjs
- ✅ Session management
- ✅ Responsive design
- ✅ Beautiful organic-modern UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

3. **Configure environment variables**
   The `.env` file is already created with default values:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/sumit-vegetables
   SESSION_SECRET=sumit-vegetables-secret-key-2024
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and go to: `http://localhost:3000`

## Default Accounts

### Shopkeeper Account
- Email: shopkeeper@sumit.com
- Password: shopkeeper123
- Role: Shopkeeper

### Customer Account
- Email: customer@example.com
- Password: customer123
- Role: Customer

*Note: Create these accounts through the registration page when you first run the application.*

## Project Structure

```
sumit-vegetable-company/
├── models/
│   ├── User.js          # User model (customers & shopkeepers)
│   ├── Vegetable.js     # Vegetable/product model
│   └── Order.js         # Order model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── index.js         # Home page routes
│   ├── shopkeeper.js    # Shopkeeper dashboard & management
│   └── customer.js      # Customer shopping & orders
├── views/
│   ├── index.ejs        # Home page
│   ├── login.ejs        # Login page
│   ├── register.ejs     # Registration page
│   ├── shopkeeper/
│   │   ├── dashboard.ejs
│   │   ├── add-vegetable.ejs
│   │   └── edit-vegetable.ejs
│   └── customer/
│       └── dashboard.ejs
├── public/
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── js/
│       └── customer.js  # Shopping cart logic
├── uploads/             # Uploaded product images
├── server.js            # Main application file
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## Usage Guide

### For Shopkeepers

1. **Login** as a shopkeeper
2. **Add vegetables**: Click "Add New Vegetable" button
   - Fill in vegetable details
   - Upload an image
   - Set price and quantity
3. **Manage inventory**: Edit or delete vegetables from the dashboard
4. **Process orders**: View customer orders and update their status

### For Customers

1. **Register** or **Login** as a customer
2. **Browse vegetables**: View available products on the dashboard
3. **Add to cart**: Click "Add to Cart" on desired items
4. **Adjust quantities**: Use +/- buttons in the cart
5. **Checkout**: Click "Checkout", enter delivery address
6. **Track orders**: View order history and status

## API Endpoints

### Authentication
- `GET /auth/login` - Login page
- `POST /auth/login` - Process login
- `GET /auth/register` - Registration page
- `POST /auth/register` - Process registration
- `GET /auth/logout` - Logout

### Shopkeeper
- `GET /shopkeeper/dashboard` - Shopkeeper dashboard
- `GET /shopkeeper/add-vegetable` - Add vegetable form
- `POST /shopkeeper/add-vegetable` - Create vegetable
- `GET /shopkeeper/edit-vegetable/:id` - Edit vegetable form
- `POST /shopkeeper/edit-vegetable/:id` - Update vegetable
- `POST /shopkeeper/delete-vegetable/:id` - Delete vegetable
- `POST /shopkeeper/update-order/:id` - Update order status

### Customer
- `GET /customer/dashboard` - Customer dashboard & shop
- `POST /customer/place-order` - Place new order

## Database Schema

### User
- name, email, password, role, phone, address, createdAt

### Vegetable
- name, description, price, quantity, unit, image, category, inStock, addedBy, createdAt, updatedAt

### Order
- customer, items[], totalAmount, status, deliveryAddress, orderDate

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Template Engine**: EJS
- **File Upload**: Multer
- **Authentication**: bcryptjs, express-session
- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: Playfair Display, Manrope (Google Fonts)

## Features Highlights

- 🔐 Secure authentication with password hashing
- 📸 Image upload for products
- 🛒 Real-time shopping cart
- 📊 Inventory management
- 📦 Order tracking system
- 📱 Responsive design
- 🎨 Beautiful organic-modern UI with green color scheme
- ⚡ Fast and lightweight

## Future Enhancements

- Payment gateway integration
- Email notifications
- Search and filter functionality
- Product reviews and ratings
- Admin role for multiple shopkeepers
- Analytics and reports
- Mobile app
- WhatsApp integration

## Support

For issues or questions, please contact: info@sumitvegetables.com

## License

MIT License - feel free to use this project for learning or commercial purposes.
