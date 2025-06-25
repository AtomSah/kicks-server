const Shoe = require('../models/Shoe');

// Create new shoe
const addShoe = async (req, res) => {
  try {
    const shoe = new Shoe(req.body);
    const savedShoe = await shoe.save();
    res.status(201).json({ message: "Shoe added successfully", data: savedShoe });
  } catch (error) {
    res.status(500).json({ message: "Failed to add shoe", error });
  }
};

// Get all shoes
const getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shoes", error });
  }
};

// Get single shoe
const getShoeById = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: "Shoe not found" });
    res.status(200).json(shoe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shoe", error });
  }
};

// Update shoe
const updateShoe = async (req, res) => {
  try {
    const updated = await Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Shoe not found" });
    res.status(200).json({ message: "Shoe updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update shoe", error });
  }
};

// Delete shoe
const deleteShoe = async (req, res) => {
  try {
    const deleted = await Shoe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Shoe not found" });
    res.status(200).json({ message: "Shoe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete shoe", error });
  }
};

module.exports = {
  addShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe,
};
