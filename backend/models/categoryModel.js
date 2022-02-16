import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: { type: String, required: false },
  subcategories: { type: [String], requred: true },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
