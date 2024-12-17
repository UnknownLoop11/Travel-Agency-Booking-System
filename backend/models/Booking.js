const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: [true, "Package ID is required"],
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      maxlength: [10, "Phone number cannot be more than 10 characters"],
    },
    numberOfTravellers: {
      type: Number,
      required: [true, "Number of travellers is required"],
    },
    speacialRequest: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
