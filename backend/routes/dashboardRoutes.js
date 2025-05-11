const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {getDashboardData}  = require('../controllers/dashboardController');

const router = express.Router();

// Add route for the base path
router.get('/', protect, getDashboardData);

// Keep the original route
router.get('/get',protect, getDashboardData);

module.exports = router;