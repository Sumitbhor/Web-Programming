const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        default: 'kg'
    },
    image: {
        type: String,
        default: '/uploads/default-vegetable.jpg'
    },
    category: {
        type: String,
        enum: ['leafy', 'root', 'fruit', 'other'],
        default: 'other'
    },
    inStock: {
        type: Boolean,
        default: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

vegetableSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    this.inStock = this.quantity > 0;
    next();
});

module.exports = mongoose.model('Vegetable', vegetableSchema);
