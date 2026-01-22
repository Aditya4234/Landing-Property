const Property = require('../models/Property');

// Get all properties with filtering
const getAllProperties = async (req, res) => {
    try {
        const { location, type, status, priceRange } = req.query;

        let filter = { isActive: true };

        // Apply filters
        if (location && location !== 'all') {
            filter.location = { $regex: location, $options: 'i' };
        }

        if (type && type !== 'all') {
            filter.type = type;
        }

        if (status && status !== 'all') {
            filter.status = status;
        }

        // Price range filtering (basic implementation)
        if (priceRange && priceRange !== 'all') {
            // This is a simplified price range filter
            // You might want to implement more sophisticated price parsing
            switch (priceRange) {
                case '0-50':
                    filter.price = { $regex: '₹[0-4][0-9]', $options: 'i' };
                    break;
                case '50-100':
                    filter.price = { $regex: '₹([5-9][0-9]|100)', $options: 'i' };
                    break;
                case '100-200':
                    filter.price = { $regex: '₹(1[0-9][0-9]|200)', $options: 'i' };
                    break;
                case '200+':
                    filter.price = { $regex: '₹[2-9][0-9][0-9]', $options: 'i' };
                    break;
            }
        }

        const properties = await Property.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// Create new property
const createProperty = async (req, res) => {
    try {
        const property = await Property.create(req.body);

        res.status(201).json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Validation Error',
            message: error.message
        });
    }
};

// Update property
const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// Delete property
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// Get property statistics
const getPropertyStats = async (req, res) => {
    try {
        const stats = await Property.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $group: {
                    _id: null,
                    totalProperties: { $sum: 1 },
                    byType: {
                        $push: '$type'
                    },
                    byLocation: {
                        $push: '$location'
                    }
                }
            }
        ]);

        const typeStats = stats[0]?.byType.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        const locationStats = stats[0]?.byLocation.reduce((acc, location) => {
            acc[location] = (acc[location] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: {
                total: stats[0]?.totalProperties || 0,
                byType: typeStats || {},
                byLocation: locationStats || {}
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyStats
};