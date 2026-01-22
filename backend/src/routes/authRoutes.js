const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile
} = require('../controllers/authController');

// Import auth middleware (we'll create this next)
const { protect } = require('../middleware/auth');

// Public routes
router.route('/register')
    .post(register);  // POST /api/auth/register

router.route('/login')
    .post(login);     // POST /api/auth/login

// Protected routes
router.route('/profile')
    .get(protect, getProfile)     // GET /api/auth/profile
    .put(protect, updateProfile); // PUT /api/auth/profile

module.exports = router;