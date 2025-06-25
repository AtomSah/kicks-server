const express = require("express");
const router = express.Router();

const {
  addShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe,
} = require("../controller/shoeController");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// Routes
router.post("/", isAuthenticated, isAdmin, addShoe);
router.get("/", getAllShoes);
router.get("/:id", getShoeById);
router.put("/:id", isAuthenticated, isAdmin, updateShoe);
router.delete("/:id", isAuthenticated, isAdmin, deleteShoe);

module.exports = router;
