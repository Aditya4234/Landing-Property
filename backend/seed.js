const mongoose = require('mongoose');
const Property = require('./src/models/Property');
require('dotenv').config();

const properties = [
    {
        title: "Gomti Nagar Elite",
        location: "Gomti Nagar, Lucknow",
        type: "Residential",
        price: "₹45 - ₹85 Lac",
        sqft: "2000 - 5000 sq.ft",
        highlights: ["Prime Location", "Modern Amenities", "Investment Ready"],
        image: "/images/prop1.png",
        status: "Available",
        description: "Luxury residential complex in the heart of Gomti Nagar with world-class amenities and premium facilities.",
        amenities: ["Swimming Pool", "Gym", "24/7 Security", "Power Backup"],
        features: ["Gated Community", "Underground Parking", "Landscaped Gardens"]
    },
    {
        title: "Indira Nagar Premium",
        location: "Indira Nagar, Lucknow",
        type: "Residential",
        price: "₹35 - ₹65 Lac",
        sqft: "1500 - 4000 sq.ft",
        highlights: ["Gated Community", "Green Spaces", "Premium Security"],
        image: "/images/prop2.png",
        status: "Selling Fast",
        description: "Premium residential project in Indira Nagar offering spacious apartments with excellent connectivity.",
        amenities: ["Children's Play Area", "Community Hall", "Intercom Facility"],
        features: ["Vaastu Compliant", "Eco-friendly Design", "Solar Panels"]
    },
    {
        title: "Aliganj Commercial Hub",
        location: "Aliganj, Lucknow",
        type: "Commercial",
        price: "₹60 - ₹120 Lac",
        sqft: "3000 - 8000 sq.ft",
        highlights: ["High ROI", "Business Ready", "Excellent Visibility"],
        image: "/modern-residential-property-development.jpg",
        status: "Launch Today",
        description: "Prime commercial space in the bustling Aliganj area, perfect for retail and office spaces.",
        amenities: ["High-speed Elevators", "Centralized AC", "24/7 Maintenance"],
        features: ["Corner Location", "Ample Parking", "Modern Infrastructure"]
    },
    {
        title: "Hazratganj Luxury Plaza",
        location: "Hazratganj, Lucknow",
        type: "Commercial",
        price: "₹80 - ₹150 Lac",
        sqft: "2500 - 6000 sq.ft",
        highlights: ["Prime Location", "High Footfall", "Luxury Finishing"],
        image: "/commercial-property-development-uttar-pradesh.jpg",
        status: "Available",
        description: "Luxury commercial complex in the heart of Hazratganj, Lucknow's premier shopping district.",
        amenities: ["Premium Interiors", "Smart Building Features", "Concierge Service"],
        features: ["Street Frontage", "Multiple Entrances", "Brand Partnerships"]
    },
    {
        title: "Vibhuti Khand Villas",
        location: "Vibhuti Khand, Lucknow",
        type: "Residential",
        price: "₹75 - ₹125 Lac",
        sqft: "1800 - 4500 sq.ft",
        highlights: ["Independent Villas", "Spacious Layouts", "Peaceful Environment"],
        image: "/luxury-residential-complex-lucknow.jpg",
        status: "Under Construction",
        description: "Exclusive villa project in Vibhuti Khand offering privacy and luxury living.",
        amenities: ["Private Gardens", "Modular Kitchen", "Home Automation"],
        features: ["Corner Plots", "East Facing", "Vastu Compliant"]
    },
    {
        title: "Gomti Nagar Extension",
        location: "Gomti Nagar Extension, Lucknow",
        type: "Residential",
        price: "₹40 - ₹70 Lac",
        sqft: "1200 - 3500 sq.ft",
        highlights: ["Affordable Luxury", "Metro Connectivity", "Educational Hub"],
        image: "/luxury-property-development-lucknow-uttar-pradesh.jpg",
        status: "Available",
        description: "Modern residential apartments in Gomti Nagar Extension with excellent connectivity.",
        amenities: ["Jogging Track", "Kids Play Area", "Shopping Complex"],
        features: ["Near Metro Station", "School Nearby", "Hospital Access"]
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-landing');

        console.log('Connected to MongoDB');

        // Clear existing data
        await Property.deleteMany({});
        console.log('Cleared existing properties');

        // Insert new data
        const insertedProperties = await Property.insertMany(properties);
        console.log(`Successfully seeded ${insertedProperties.length} properties`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();