// API Configuration
const config = {
  // Backend API URL - change this in production
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',

  // JWT Secret (only for development - use environment variables in production)
  JWT_SECRET: process.env.JWT_SECRET || 'your-development-secret-key-change-in-production'
};

export default config;