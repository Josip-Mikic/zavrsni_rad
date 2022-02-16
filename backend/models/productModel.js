import mongoose from "mongoose";
import { categorySchema } from "./categoryModel.js";

const sizeSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  size: { type: String, requred: true },
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: [sizeSchema], requred: true },
});
const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  atrribute: { type: String, requred: true },
});

const Size = mongoose.model("Size", sizeSchema);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: [imageSchema], required: true },
    brand: { type: String, required: false },
    category: { type: [categorySchema], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    gender: { type: String, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    colors: [colorSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
