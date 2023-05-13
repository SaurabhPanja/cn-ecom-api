const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  text: { type: String, default: null },
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  for: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});


const product = mongoose.model('product', productSchema);

module.exports = product;
