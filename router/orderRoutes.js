const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  mockStripePayment,
  getAllOrders,
} = require("../controller/orderController");

router.post("/", isAuthenticated, placeOrder);
router.get("/", isAuthenticated, getUserOrders);
router.put("/pay/:orderId", isAuthenticated, mockStripePayment);

// Admin only
router.put("/status/:orderId", isAuthenticated, isAdmin, updateOrderStatus);
router.get("/all", isAuthenticated, isAdmin, getAllOrders);

module.exports = router;
