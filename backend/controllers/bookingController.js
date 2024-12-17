// Model
const Booking = require("../models/Booking");

// Create Booking (POST)
const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      numberOfTravellers,
      specialRequest,
      packageId,
    } = req.body;

    const booking = new Booking({
      customerName,
      email,
      phone,
      numberOfTravellers,
      specialRequest,
      packageId,
    });

    await booking.save();

    res.status(201).json({
      status: "SUCCESS",
      message: "Booking created successfully",
      id: booking._id,
    });
  } catch (error) {
    res.status(400).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Get All Bookings (GET)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({ status: "SUCCESS", data: bookings });
  } catch (error) {
    res.status(400).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Get Booking By ID (GET)
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ status: "NOT FOUND", message: "Booking not found" });
    }

    res.status(200).json({ status: "SUCCESS", data: booking });
  } catch (error) {
    res.status(400).json({ status: "SERVER ERROR", message: error.message });
  }
};

module.exports = { createBooking, getAllBookings, getBookingById };
