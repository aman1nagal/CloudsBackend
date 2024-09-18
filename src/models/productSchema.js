const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  productNumber: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ProductSchema = mongoose.model("ProductList", productSchema);

module.exports = ProductSchema;
