const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
const db = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose
    .connect(db)
    .then((res) => {
      console.log("MongoDB is connected", res.connection.name);
    })
    .catch((err) => {
      console.log("MongoDB connection unsuccessful", err);
      process.exit(0);
    });
};

module.exports = connectDB;
