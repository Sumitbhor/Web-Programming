# Transflower Store (Dynamic)

A dynamic flower store built with **Node.js**, **Express**, **EJS**, and **MongoDB**. Features shopkeeper and customer login, and image uploads for products.

## Features

- **Customer login** – Register and login as customer; access "My Account" dashboard
- **Shopkeeper login** – Register and login as shopkeeper; add, edit, delete products with **image upload**
- **Dynamic products** – Products and images are stored in the database and displayed on Home and Products pages
- **Contact form** – Submit messages (success feedback)

## Prerequisites

- **Node.js** (v16 or newer)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string

## Setup

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. (Optional) Create a `.env` file in the project root (copy from `.env.example`):
   ```
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/transflowerstore
   SESSION_SECRET=your-secret-key
   ```
   If you don't create `.env`, the app uses the defaults (local MongoDB, port 3000).

3. Start MongoDB (if using local install), then start the server:
   ```bash
   npm start
   ```

4. Open **http://localhost:3000** in your browser.

## How to Use

- **Home** – Featured flowers (from database when available) and static bouquets
- **Products** – All products added by shopkeepers (with images)
- **Register** – Choose **Customer** or **Shopkeeper**, then register
- **Login** – Choose **Customer** or **Shopkeeper**, then login
- **Shopkeeper** – After login: Dashboard → Add Product (with image), Edit, Delete
- **Customer** – After login: My Account dashboard

## Project Structure

```
transflowerstore/
├── server.js           # Entry point, Express app, MongoDB connect
├── models/
│   ├── User.js         # User model (customer/shopkeeper)
│   └── Product.js      # Product model (with image path)
├── routes/
│   ├── index.js        # Home, products, about, contact
│   ├── auth.js         # Login, register, logout
│   ├── shopkeeper.js   # Dashboard, add/edit/delete product (multer upload)
│   └── customer.js     # Customer dashboard
├── middleware/
│   └── auth.js         # requireAuth, requireShopkeeper, requireCustomer
├── views/              # EJS templates
│   ├── partials/       # header, footer, head
│   ├── shopkeeper/     # dashboard, add-product, edit-product
│   └── customer/       # dashboard
├── uploads/            # Uploaded product images (created at runtime)
├── image/              # Static site images (unchanged)
└── styles/             # CSS (unchanged)
```

## Tech Stack

- **Express** – Web server and routes
- **EJS** – Server-side templates
- **Mongoose** – MongoDB ODM
- **express-session** – Login sessions
- **bcryptjs** – Password hashing
- **multer** – Image upload for shopkeeper products
