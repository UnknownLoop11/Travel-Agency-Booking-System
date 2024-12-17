const mongoose = require("mongoose");

const tourPackageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    availableDates: {
      type: [Date],
      required: [true, "Available dates are required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

tourPackageSchema.index({ title: "text", description: "text" });

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);

module.exports = TourPackage;
