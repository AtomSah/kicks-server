const express = require("express");
const router = express.Router();

const {
  addShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe,
  filterShoes,
} = require("../controller/shoeController");

const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// Routes
router.post("/", isAuthenticated, isAdmin, addShoe);
router.get("/", getAllShoes);
router.get('/filter', filterShoes);
router.get("/:id", getShoeById);
router.put("/:id", isAuthenticated, isAdmin, updateShoe);
router.delete("/:id", isAuthenticated, isAdmin, deleteShoe);
router.get('/filter', filterShoes);

module.exports = router;
