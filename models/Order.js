const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      shoe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingDetails: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered"],
    default: "processing"
  },
  paymentMethod: {
    type: String,
    enum: ["esewa", "phonepe", "cod"],
    default: "cod"
  },
},
  { timestamps: true },);

module.exports = mongoose.model("Order", orderSchema);
