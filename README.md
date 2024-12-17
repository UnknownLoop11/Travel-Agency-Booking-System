

# 🌟 Travel Agency Booking System

This is a **Full-Stack MERN Travel Booking Application** built with modern web technologies. The system allows users to explore tour packages, book them, and view invoices, while providing admin functionality for managing packages and bookings.

---

## 🚀 **Tech Stack**

### Frontend:
- **Next.js** + **React.js**: Framework for SSR and dynamic UI.
- **Tailwind CSS** + **DaisyUI**: For a responsive and modern design.
- **Moment.js**: To manage and format dates.

### Backend:
- **Node.js** + **Express.js**: RESTful API and server management.
- **MongoDB**: Database to store packages and bookings.
- **JWT (JSON Web Token)**: For simple authentication.

---

## 🎯 **Features**

### 🌐 **Frontend**
1. **Home Page** (`/`):
   - Displays **featured**, **popular**, **trending**, and **budget-friendly** packages.

2. **Package Details**:
   - View detailed information for each tour package.

3. **Booking Form**:
   - Submit a form to book a package.
   - Includes:
     - Customer name
     - Email
     - Phone number
     - Number of travelers
     - Optional special requests.

4. **Invoice Generation**:
   - Upon booking, generate a **PDF invoice** containing:
     - Customer details
     - Package details
     - Total cost.

5. **Admin Panel** (`/admin`):
   - Default credentials: 
     - Username: **admin**
     - Password: **admin**
   - Features:
     - View all packages and bookings.
     - Add, update, or delete packages.

---

## ⚙️ **API Endpoints**

### **Package Management**
| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/api/packages`      | Fetch all tour packages         |
| GET    | `/api/packages/:id`  | Fetch details of a package      |
| POST   | `/api/admin/packages`| Add a new package (Admin only)  |
| PUT    | `/api/admin/packages/:id` | Update a package          |
| DELETE | `/api/admin/packages/:id` | Delete a package          |

### **Booking**
| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| POST   | `/api/bookings`    | Submit a package booking        |

---

## 🛠️ **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/project-repo.git
   cd project-repo
   ```

2. **Backend Setup**:
   - Navigate to the `backend` folder.
   - Install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Configure environment variables in `.env`:
     ```plaintext
     MONGODB_URI=your_mongo_db_uri
     SECRET_KEY=your_jwt_secret
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` folder.
   - Install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Run the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## 📁 **Folder Structure**

```
project-repo/
│
├── backend/
│   ├── controllers/      # API business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # REST API routes
│   ├── middleware/       # JWT Authentication
│   ├── services/       # JWT Authentication
│   └── server.js         # Backend entry point
│
├── frontend/
│   ├── app/            # Next.js pages
│     ├── booking/       
│     ├── components/       # Reusable React components
│     ├── admin/
│     ├── package/       
│     ├── utils/            # Utility functions
│   └── public/           # Static assets
│
└── README.md
```

---

## 🎥 **Demo**

- **Admin Panel**: Manage packages and view bookings.
- **User Flow**: 
   1. Browse tour packages.
   2. Book a package.
   3. Receive a PDF invoice.

---

## 📌 **Future Enhancements**
- Add filters for price, popularity, and destinations.
- Implement search functionality.
- Include user authentication for bookings.

---

### 🧑‍💻 **Author**
- **[Mathew]**

---

This README includes **setup instructions**, feature descriptions, API documentation, and a clear folder structure. Let me know if you'd like any changes! 🚀
