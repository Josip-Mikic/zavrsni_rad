import mongoose from "mongoose";
const sizeSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  size: { type: String, requred: true },
});

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  atrribute: { type: String, requred: true },
});
const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        images: { type: [imageSchema], required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedSize: { type: String, required: true },
        selectedColor: { type: String, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: false },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, required: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
