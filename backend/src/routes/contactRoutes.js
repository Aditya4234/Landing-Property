const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  subscribeNewsletter,
  submitPropertyInquiry,
  getAllContacts,
  updateContactStatus
} = require('../controllers/contactController');

// Import auth middleware
const { protect } = require('../middleware/auth');

// Public routes
router.route('/')
  .post(submitContactForm)      // POST /api/contact
  .get(protect, getAllContacts); // GET /api/contact (admin only)

router.route('/newsletter')
  .post(subscribeNewsletter);   // POST /api/contact/newsletter

router.route('/property-inquiry')
  .post(submitPropertyInquiry); // POST /api/contact/property-inquiry

// Protected routes (admin only)
router.route('/:id/status')
  .put(protect, updateContactStatus); // PUT /api/contact/:id/status

module.exports = router;