# Property Landing Backend

This is the backend API for the Property Landing page application built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── propertyController.js    # Property CRUD operations
│   ├── models/
│   │   └── Property.js              # Property data model
│   ├── routes/
│   │   └── propertyRoutes.js        # API routes for properties
│   ├── middleware/
│   │   └── logger.js                # Request logging middleware
│   └── config/
│       └── database.js              # Database connection configuration
├── server.js                        # Main server file
├── package.json                     # Dependencies and scripts
└── README.md                       # This file
```

## Features

- **RESTful API** for property management
- **MongoDB** database integration with Mongoose
- **Filtering** by location, type, status, and price range
- **CRUD operations** for properties
- **Statistics endpoint** for property analytics
- **Error handling** and validation
- **CORS support** for frontend integration

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with optional filters)
- `GET /api/properties/:id` - Get single property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/stats` - Get property statistics

### Health Check
- `GET /api/health` - Server health check

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the backend root directory with:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/property-landing
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system.

4. **Run the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

5. **Test the API**
   Visit `http://localhost:5000/api/health` to verify the server is running.

## Sample Property Data

The API expects property data in this format:
```json
{
  "title": "Gomti Nagar Elite",
  "location": "Gomti Nagar, Lucknow",
  "type": "Residential",
  "price": "₹45 - ₹85 Lac",
  "sqft": "2000 - 5000 sq.ft",
  "highlights": ["Prime Location", "Modern Amenities"],
  "image": "/images/prop1.png",
  "status": "Available",
  "description": "Luxury residential property",
  "amenities": ["Swimming Pool", "Gym"],
  "features": ["Gated Community", "Power Backup"]
}
```

## Filtering

Use query parameters to filter properties:
- `?location=Gomti Nagar`
- `?type=Residential`
- `?status=Available`
- `?priceRange=50-100`

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management