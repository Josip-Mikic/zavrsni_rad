import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  size: { type: String, requred: true },
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: [sizeSchema], requred: true },
});

const Color = mongoose.model("Color", colorSchema);

export default Color;
