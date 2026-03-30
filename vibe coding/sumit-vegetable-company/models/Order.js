const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        vegetable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vegetable'
        },
        name: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryAddress: String,
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
