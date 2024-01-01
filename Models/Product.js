import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  product_category: {
    type: String,
    // required: true,
  },
  product_brand: {
    type: String,
    // required: true,
  },
  product_quantity: {
    type: Number,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  path: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
