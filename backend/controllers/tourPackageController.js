
// Models
const TourPackage = require("../models/TourPackage");

// Get all tour packages (GET)
const getAllTourPackages = async (req, res) => {
  let { page = 1, limit = 10, searchQuery, sortByPrice } = req.query;

  // Parse and validate page and limit
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  try {
    const query = searchQuery ? { $text: { $search: searchQuery } } : {};

    // Determine sorting logic
    let sort = {};
    if (searchQuery) sort = { score: { $meta: "textScore" } }; // Sort by relevance for text search
    if (sortByPrice === "asc") sort.price = 1; // Sort by price ascending
    if (sortByPrice === "desc") sort.price = -1; // Sort by price descending

    // Fetch documents with sorting, pagination, and query
    const tourPackages = await TourPackage.find(query)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    // Count documents matching the query
    const count = await TourPackage.countDocuments(query);

    res.json({
      status: "SUCCESS",
      data: {
        tourPackages,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

// Get a tour package by ID (GET)
const getTourPackageById = async (req, res) => {
  try {
    const tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res
        .status(404)
        .json({ status: "NOT FOUND", message: "Tour package not found" });
    }
    res.json(tourPackage);
  } catch (error) {
    res.status(500).json({ status: "SERVER ERROR", message: error.message });
  }
};

module.exports = { getAllTourPackages, getTourPackageById };
