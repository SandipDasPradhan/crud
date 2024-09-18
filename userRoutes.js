const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", error });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users", error });
  }
});
router.put("/:id", async (req, res) => {
  try {

    updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user", error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user", error });
  }
});

module.exports = router;
