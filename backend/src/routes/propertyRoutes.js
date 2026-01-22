const express = require('express');
const router = express.Router();
const {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyStats
} = require('../controllers/propertyController');

// Routes
router.route('/')
    .get(getAllProperties)      // GET /api/properties
    .post(createProperty);      // POST /api/properties

router.route('/stats')
    .get(getPropertyStats);      // GET /api/properties/stats

router.route('/:id')
    .get(getPropertyById)        // GET /api/properties/:id
    .put(updateProperty)         // PUT /api/properties/:id
    .delete(deleteProperty);     // DELETE /api/properties/:id

module.exports = router;