const router = require("express").Router();

// Controllers
const {
  createSuperUser, // Add Admin User (POST)
  loginAdminUser, // Login Admin User (POST)
  addTourPackage, // Add Tour Package (POST)
  updateTourPackage, // Update Tour Package (PUT)
  deleteTourPackage, // Delete Tour Package (DELETE)
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes
router.post("/admin/create", createSuperUser);
router.post("/admin/login", loginAdminUser);
router.post("/admin/packages", authMiddleware, addTourPackage);
router
  .route("/admin/packages/:id", authMiddleware)
  .put(updateTourPackage)
  .delete(deleteTourPackage);

module.exports = router;
