const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // weight: {
  //   type: String,
  //   required: true,
  // },
  price: {
    type: Number,
    required: true,
  },
  // description: {
  //   type: String,
  //   default: "",
  // },
  // inStock: {
  //   type: Boolean,
  //   default: true,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
