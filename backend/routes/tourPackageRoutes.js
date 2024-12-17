const router = require("express").Router();

// Controllers
const {
  getAllTourPackages,
  getTourPackageById,
} = require("../controllers/tourPackageController");

// Routes
router.get("/packages", getAllTourPackages);
router.get("/packages/:id", getTourPackageById);

module.exports = router;
