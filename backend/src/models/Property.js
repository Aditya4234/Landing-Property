const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Property title is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Property location is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Property type is required'],
        enum: ['Residential', 'Commercial', 'Industrial', 'Land'],
        trim: true
    },
    price: {
        type: String,
        required: [true, 'Property price is required']
    },
    sqft: {
        type: String,
        required: [true, 'Property size is required']
    },
    highlights: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        required: [true, 'Property image is required']
    },
    status: {
        type: String,
        required: [true, 'Property status is required'],
        enum: ['Available', 'Sold', 'Under Construction', 'Launch Today', 'Selling Fast'],
        default: 'Available'
    },
    description: {
        type: String,
        trim: true
    },
    amenities: [{
        type: String,
        trim: true
    }],
    features: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for better search performance
propertySchema.index({ location: 1, type: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);