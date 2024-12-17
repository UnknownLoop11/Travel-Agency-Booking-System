const express = require("express");
const logger = require("morgan");
const connectDB = require("./utils/dbConfig");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ status: "SUCCESS", message: "Welcome to the Travel Agency API" });
});

// Connect to MongoDB
connectDB();

// Routes
app.use(
  "/api",
  require("./routes/adminRoutes"),
  require("./routes/tourPackageRoutes"),
  require("./routes/bookingRoutes")
);

app.listen(8000, () => {
  console.log("Server is running on port 3000");
});
