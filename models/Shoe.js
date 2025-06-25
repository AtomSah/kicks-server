const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Shoe name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  size: {
    type: [Number],
    required: true
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Shoe', shoeSchema);
