const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Models
const Admin = require("../models/Admin");
const TourPackage = require("../models/TourPackage");

// Add Admin User (POST)
const createSuperUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const user = await Admin.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ status: "NOT FOUND", message: "User already exists" });

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Admin({ username, password: hashedPassword });

    // Save the user
    await newUser.save();

    res
      .status(200)
      .json({ status: "SUCCESS", message: "Admin User created successfully" });
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Login Admin User (POST)
const loginAdminUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await Admin.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ status: "NOT FOUND", message: "User does not exist." });

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: "ERROR", message: "Invalid credentials" });

    // Generating a token
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "6h" }
    );

    res
      .status(200)
      .json({ status: "SUCCESS", message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Add a new Tour Package (POST)
const addTourPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates, image } = req.body;

    // Create a new tour package
    const newTourPackage = new TourPackage({
      title,
      description,
      price,
      availableDates,
      image,
    });

    // Saving the tour package
    await newTourPackage.save();

    res
      .status(200)
      .json({ status: "SUCCESS", message: "Tour Package added successfully" });
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Update a Tour Package (PUT)
const updateTourPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates, image } = req.body;

    // Find the tour package by id
    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage)
      return res
        .status(404)
        .json({ status: "NOT FOUND", message: "Tour Package not found" });

    // Update the tour package
    tourPackage.title = title || tourPackage.title;
    tourPackage.description = description || tourPackage.description;
    tourPackage.price = price || tourPackage.price;
    tourPackage.availableDates = availableDates || tourPackage.availableDates;
    tourPackage.image = image || tourPackage.image;

    // Save the updated tour package
    await tourPackage.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "Tour Package updated successfully",
      updatedPackage: {
        title: tourPackage.title,
        description: tourPackage.description,
        price: tourPackage.price,
        availableDates: tourPackage.availableDates,
        image: tourPackage.image,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Delete a Tour Package (DELETE)
const deleteTourPackage = async (req, res) => {
  try {
    // Find the tour package by id
    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage)
      return res
        .status(404)
        .json({ status: "ERROR", message: "Tour Package not found" });

    // Delete the tour package
    await tourPackage.deleteOne();

    res.status(200).json({
      status: "SUCCESS",
      message: "Tour Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

module.exports = {
  createSuperUser,
  loginAdminUser,
  addTourPackage,
  updateTourPackage,
  deleteTourPackage,
};
