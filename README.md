# Expense Tracker

A full-stack expense tracking application that helps users manage their finances by tracking income, expenses, and providing detailed financial insights with interactive charts and analytics.

# URL's

Frotend URL : https://nagendar-expensetrackerz.vercel.app/
Backend URL : https://expense-tracker-ie35.onrender.com/

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)

## ✨ Features

### User Management
- User authentication (Sign up, Login, Logout)
- JWT-based secure authentication
- Password encryption using bcryptjs
- User profile management
- Profile photo upload

### Income Management
- Add, view, edit, and delete income entries
- Track income from different sources
- Income overview with visualizations
- Recent income transactions display

### Expense Management
- Add, view, edit, and delete expense entries
- Categorize expenses
- Expense overview with detailed analytics
- Track spending patterns
- Last 30 days expense analysis

### Dashboard
- Comprehensive financial overview
- Income and expense summary cards
- Recent transactions view
- Interactive charts and analytics
  - Bar charts for spending trends
  - Pie charts for expense distribution
  - Line charts for financial trends
- Custom legends and tooltips

### Additional Features
- Responsive design with Tailwind CSS
- Real-time data updates
- Toast notifications for user feedback
- Emoji picker for transaction descriptions
- File upload support

## 🛠 Tech Stack

### Frontend
- **React 19.0.0** - UI framework
- **Vite 6.3.1** - Build tool
- **React Router DOM 7.5.3** - Client-side routing
- **Tailwind CSS 4.1.5** - Utility-first CSS framework
- **Recharts 2.15.3** - Data visualization
- **Axios 1.9.0** - HTTP client
- **Moment.js 2.30.1** - Date handling
- **React Hot Toast 2.5.2** - Toast notifications
- **Emoji Picker React 4.12.2** - Emoji selection
- **React Icons 5.5.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.14.1** - MongoDB ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs 3.0.2** - Password hashing
- **Multer 1.4.5** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.5.0** - Environment variable management

## 📁 Project Structure

```
Expense-Tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── dashboardController.js # Dashboard stats
│   │   ├── expenseController.js  # Expense management
│   │   └── incomeController.js   # Income management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── uploadMiddleware.js   # File upload handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Income.js             # Income schema
│   │   └── Expense.js            # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── dashboardRoutes.js    # Dashboard endpoints
│   │   ├── expenseRoutes.js      # Expense endpoints
│   │   └── incomeRoutes.js       # Income endpoints
│   ├── uploads/                  # Profile images storage
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/                   # Static assets
    ├── src/
    │   ├── assets/              # Images and media
    │   ├── components/
    │   │   ├── Cards/           # Reusable card components
    │   │   ├── Charts/          # Chart components
    │   │   ├── Dashboard/       # Dashboard components
    │   │   ├── Expense/         # Expense components
    │   │   ├── Income/          # Income components
    │   │   ├── inputs/          # Input components
    │   │   └── layouts/         # Layout components
    │   ├── context/
    │   │   └── UserContext.jsx  # User context state
    │   ├── hooks/
    │   │   └── useUserAuth.jsx  # Custom auth hook
    │   ├── pages/
    │   │   ├── Auth/            # Login & Signup pages
    │   │   └── Dashboard/       # Dashboard pages
    │   ├── utils/
    │   │   ├── apiPath.js       # API endpoints
    │   │   ├── axiosInstance.js # Axios configuration
    │   │   ├── data.js          # Mock/utility data
    │   │   ├── helper.js        # Helper functions
    │   │   └── uploadImage.js   # Image upload utility
    │   ├── App.jsx              # App component
    │   ├── App.css              # App styles
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Global styles
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```

## 📦 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Nagendar23/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URI=http://localhost:5173
NODE_ENV=development
```

**Environment Variables Explanation:**
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLIENT_URI`: Frontend URL for CORS
- `NODE_ENV`: Environment (development/production)

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

**Environment Variables Explanation:**
- `VITE_API_URL`: Backend API base URL

## 📂 Running the Application

### Development Mode

**Terminal 1 - Start Backend:**

```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5000
MongoDB connected successfully
```

**Terminal 2 - Start Frontend:**

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v6.3.1 ready in 456 ms

➜ Local:   http://localhost:5173/
➜ press h to show help
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user

### Income
- `GET /api/v1/income` - Get all income entries
- `POST /api/v1/income` - Create income entry
- `PUT /api/v1/income/:id` - Update income entry
- `DELETE /api/v1/income/:id` - Delete income entry

### Expense
- `GET /api/v1/expense` - Get all expense entries
- `POST /api/v1/expense` - Create expense entry
- `PUT /api/v1/expense/:id` - Update expense entry
- `DELETE /api/v1/expense/:id` - Delete expense entry

### Dashboard
- `GET /api/v1/dashboard/summary` - Get financial summary
- `GET /api/v1/dashboard/stats` - Get dashboard statistics

## 📤 Deployment

### Frontend Deployment (Vercel)

| Setting | Value |
|---------|-------|
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Backend Deployment

**Option 1: Render/Railway/Heroku**
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Deploy

**Option 2: VPS (DigitalOcean/AWS)**
```bash
cd backend
npm install --production
pm2 start server.js --name expense-backend
```

### Environment Variables for Production

**Backend:**
- `MONGODB_URI` - Production MongoDB URI
- `JWT_SECRET` - Strong secret key
- `CLIENT_URI` - Production frontend URL
- `NODE_ENV=production`

**Frontend:**
- `VITE_API_URL` - Production backend URL

## 💡 Usage Guide

### 1. Sign Up
- Navigate to the signup page
- Enter your full name, email, and password
- Optionally upload a profile photo
- Submit to create account

### 2. Login
- Go to login page
- Enter email and password
- Click login to access dashboard

### 3. Add Income
- Click on "Income" in navigation
- Click "Add Income"
- Fill in amount, source, date, and description
- Submit to save

### 4. Add Expense
- Click on "Expense" in navigation
- Click "Add Expense"
- Fill in amount, category, date, and description
- Submit to save

### 5. View Dashboard
- Dashboard shows:
  - Total income and expenses
  - Recent transactions
  - Interactive charts and analytics
  - 30-day expense trends

### 6. Manage Transactions
- View all transactions in respective sections
- Edit or delete transactions as needed
- Filter by date range if available

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Nagendar23**
- GitHub: [@Nagendar23](https://github.com/Nagendar23)

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

## 🎯 Future Enhancements

- [ ] Budget planning and alerts
- [ ] Multi-currency support
- [ ] Receipt image upload
- [ ] Export to PDF/Excel
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Advanced filtering and search
- [ ] Recurring transactions
- [ ] Monthly reports

---
## Can check the website on : https://nagendar-expensetrackerz.vercel.app/

**Made with ❤️ by Nagendar23**
