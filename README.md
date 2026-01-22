# AwasDhara Properties - Real Estate Landing Page

A modern, full-stack real estate landing page built with Next.js (frontend) and Express.js (backend) for property listings in Lucknow, Uttar Pradesh.

## 🌟 Features

### Frontend (Next.js)
- **Modern UI/UX**: Responsive design with Tailwind CSS and Framer Motion animations
- **Property Listings**: Dynamic property cards with filtering capabilities
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Contact Forms**: Integrated contact forms with API backend
- **Newsletter Signup**: Email subscription functionality
- **Property Details**: Individual property pages with detailed information

### Backend (Express.js)
- **RESTful API**: Complete API for properties, authentication, and contact management
- **MongoDB Integration**: Database storage with Mongoose ODM
- **Authentication**: JWT-based user authentication system
- **Contact Management**: Handle inquiries, newsletter subscriptions
- **Property Management**: CRUD operations for property listings
- **Data Seeding**: Sample property data for development

## 🏗️ Project Structure

```
property-landing/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Database configuration
│   ├── seed.js            # Database seeding script
│   └── server.js          # Main server file
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions and API calls
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   Create `.env` file in backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/property-landing
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

   Backend will be running at: http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   Create `.env.local` file in frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will be running at: http://localhost:3000

## 📡 API Endpoints

### Properties
- `GET /api/properties` - Get all properties with filtering
- `GET /api/properties/:id` - Get property by ID
- `GET /api/properties/stats` - Get property statistics

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Contact
- `POST /api/contact` - Submit contact form
- `POST /api/contact/newsletter` - Subscribe to newsletter
- `POST /api/contact/property-inquiry` - Submit property inquiry

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL=your-backend-url/api`
4. Deploy

### Backend Options

#### Railway (Recommended)
1. Connect GitHub repo to Railway
2. Set root directory to `backend`
3. Add environment variables
4. Deploy

#### Heroku
1. Install Heroku CLI
2. `heroku create your-app-name`
3. Set environment variables
4. `git push heroku main`

#### VPS
1. Set up Node.js server
2. Configure MongoDB
3. Use PM2 for production: `pm2 start server.js`

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Property search and filtering
- ✅ Contact forms with backend integration
- ✅ Newsletter subscription
- ✅ SEO optimization
- ✅ Modern animations
- ✅ Authentication system
- ✅ Admin panel ready
- ✅ Property detail pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

For questions or support, please contact:
- Email: contact@awasdharaproperties.com
- Phone: +91 98765 43210

---

**AwasDhara Properties** - Your trusted partner in Lucknow real estate.</content>
</xai:function_call">Create a comprehensive README for the main repository