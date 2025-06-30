const Order = require("../models/Order");
const Shoe = require("../models/Shoe");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, paymentMethod } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const shoe = await Shoe.findById(item.shoe);
      if (!shoe || shoe.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${shoe?.name || 'a shoe'}` });
      }
      totalAmount += shoe.price * item.quantity;
    }

    // Deduct stock
    for (const item of items) {
      await Shoe.findByIdAndUpdate(item.shoe, {
        $inc: { stock: -item.quantity }
      });
    }

    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      paymentMethod,
      orderStatus: "processing"
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.shoe");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const mockStripePayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Simulate successful payment
    order.paymentStatus = "paid";
    await order.save();

    res.status(200).json({ message: "Payment successful", order });
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["processing", "shipped", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    const filter = {};

    // Filter by status (optional)
    if (status) {
      filter.orderStatus = status;
    }

    // Filter by date range (optional)
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(filter)
      .populate("user", "username email")
      .populate("items.shoe", "name price");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filtered orders", error });
  }
};



module.exports = {
  placeOrder,
  getUserOrders,
  mockStripePayment,
  updateOrderStatus,
  getAllOrders,
};
