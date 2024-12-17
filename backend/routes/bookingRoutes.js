const router = require("express").Router();

// Controllers
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/bookingController");

// Routes
router
  .route("/bookings")
  // POST Create Booking
  .post(createBooking)
  // GET Get All Bookings
  .get(getAllBookings);

// GET Get Booking By ID
router.route("/bookings/:id").get(getBookingById);

module.exports = router;
