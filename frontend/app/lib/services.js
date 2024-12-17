import axios from "axios";

const BACKEND_URL = "http://localhost:8000/api";

export const loginAdmin = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/login`, data);

    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// Fetch all packages
export const fetchPackages = async ({
  page = 1,
  limit = 50,
  searchQuery,
  sortByPrice,
}) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/packages`, {
      params: { limit: limit, page: page, searchQuery, sortByPrice },
    });

    return res.data.data;
  } catch (error) {
    return error.response?.data;
  }
};

// fetch all bookings
export const fetchBookings = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/bookings`);

    return res.data.data;
  } catch (error) {
    return error.response?.data;
  }
};

// Fetch a single package
export const fetchPackage = async (id) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/packages/${id}`);

    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// Create a new package
export const createPackage = async (data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/packages`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Update a package
export const updatePackage = async (id, data) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.put(`${BACKEND_URL}/admin/packages/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Delete a package
export const deletePackage = async (id) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.delete(`${BACKEND_URL}/admin/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Create and Get new booking
export const createBooking = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/bookings`, data);

    const { id, status, message } = res.data;

    if (status === "SUCCESS") {
      const booking = await axios.get(`${BACKEND_URL}/bookings/${id}`);
      return booking.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
