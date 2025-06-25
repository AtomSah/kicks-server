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
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered"],
    default: "processing"
  }
}, 
);

module.exports = mongoose.model("Order", orderSchema);
