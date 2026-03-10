const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {  
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Hp', 'Dell', 'Lenovo', 'Acer'] 
  },
  rating: {
    rate: { type: Number, min: 0, max: 5, default: 5 },
    count: { type: Number, min: 0, default: 0 },
  }
});

module.exports = mongoose.model('Product', schema, 'products');
