"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Ruler,
  Car,
  Shield,
  Heart,
  Share2,
  Eye,
  Star,
  CheckCircle,
  MessageSquare,
  Calculator,
  Camera,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

// Mock data - in a real app, this would come from an API
const getPropertyById = (id) => {
  const properties = [
    {
      id: 1,
      title: "Gomti Nagar Elite",
      location: "Gomti Nagar, Lucknow",
      type: "Residential",
      price: "₹45 - ₹85 Lac",
      sqft: "2000 - 5000 sq.ft",
      highlights: ["Prime Location", "Modern Amenities", "Investment Ready"],
      image: "/images/prop1.png",
      status: "Available",
      description: "Experience luxury living in the heart of Gomti Nagar. This premium residential complex offers spacious apartments with world-class amenities, excellent connectivity, and a perfect blend of comfort and convenience.",
      features: [
        "24/7 Security",
        "Swimming Pool",
        "Gymnasium",
        "Children's Play Area",
        "Power Backup",
        "Covered Parking",
        "Landscape Garden",
        "Intercom Facility"
      ],
      specifications: {
        "Total Area": "5 Acres",
        "Number of Units": "120",
        "Floors": "15",
        "Lift": "2 High-speed elevators",
        "Possession": "Ready to Move",
        "RERA Approved": "Yes"
      },
      nearby: [
        { name: "Indira Gandhi Pratishthan", distance: "2 km" },
        { name: "Wave Mall", distance: "3 km" },
        { name: "City Hospital", distance: "1.5 km" },
        { name: "Railway Station", distance: "5 km" }
      ],
      images: ["/images/prop1.png", "/images/hero-bg.png", "/images/hero-main.png"],
      virtualTour: "https://example.com/virtual-tour",
      floorPlan: "/images/floor-plan.png",
      agent: {
        name: "Rajesh Kumar",
        phone: "+91-9876543210",
        email: "rajesh.kumar@awasdharaproperties.com",
        experience: "8 years"
      }
    },
    {
      id: 2,
      title: "Hazratganj Heights",
      location: "Hazratganj, Lucknow",
      type: "Commercial",
      price: "₹1.2 - ₹2.5 Cr",
      sqft: "3000 - 8000 sq.ft",
      highlights: ["Commercial Hub", "High ROI", "Modern Infrastructure"],
      image: "/images/prop2.png",
      status: "Under Construction",
      description: "Prime commercial space in the bustling Hazratganj area. Perfect for retail outlets, offices, or showrooms with excellent footfall and connectivity to major business districts.",
      features: [
        "High Street Location",
        "Glass Facade",
        "Central AC",
        "24/7 Security",
        "Dedicated Parking",
        "Fire Safety Systems",
        "Power Backup",
        "Modern Elevators"
      ],
      specifications: {
        "Total Area": "2 Acres",
        "Number of Units": "45",
        "Floors": "8",
        "Lift": "4 High-speed elevators",
        "Possession": "2025",
        "RERA Approved": "Yes"
      },
      nearby: [
        { name: "Hazratganj Market", distance: "0.5 km" },
        { name: "Charbagh Railway Station", distance: "2 km" },
        { name: "UP Government Offices", distance: "1 km" },
        { name: "Shopping Malls", distance: "1.5 km" }
      ],
      images: ["/images/prop2.png", "/images/commercial-property-development-uttar-pradesh.jpg"],
      virtualTour: null,
      floorPlan: "/images/commercial-floor-plan.png",
      agent: {
        name: "Priya Sharma",
        phone: "+91-9876543211",
        email: "priya.sharma@awasdharaproperties.com",
        experience: "6 years"
      }
    },
    {
      id: 3,
      title: "Alambagh Gardens",
      location: "Alambagh, Lucknow",
      type: "Residential",
      price: "₹35 - ₹65 Lac",
      sqft: "1500 - 3500 sq.ft",
      highlights: ["Affordable Luxury", "Green Environment", "Family Friendly"],
      image: "/images/prop3.png",
      status: "Available",
      description: "Beautiful residential complex in the peaceful Alambagh area, offering affordable luxury with excellent amenities and a serene environment perfect for families.",
      features: [
        "24/7 Security",
        "Children's Park",
        "Jogging Track",
        "Community Hall",
        "Power Backup",
        "Parking Space",
        "Water Supply",
        "Maintenance Service"
      ],
      specifications: {
        "Total Area": "3 Acres",
        "Number of Units": "85",
        "Floors": "12",
        "Lift": "2 elevators",
        "Possession": "Ready to Move",
        "RERA Approved": "Yes"
      },
      nearby: [
        { name: "Alambagh Bus Stand", distance: "1 km" },
        { name: "Schools", distance: "2 km" },
        { name: "Shopping Complex", distance: "1.5 km" },
        { name: "Medical Center", distance: "2.5 km" }
      ],
      images: ["/images/prop3.png", "/images/luxury-residential-property-development.jpg"],
      virtualTour: "https://example.com/alambagh-tour",
      floorPlan: "/images/residential-floor-plan.png",
      agent: {
        name: "Amit Singh",
        phone: "+91-9876543212",
        email: "amit.singh@awasdharaproperties.com",
        experience: "5 years"
      }
    }
  ];

  return properties.find(p => p.id === parseInt(id));
};

const PropertyDetail = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const propertyData = getPropertyById(propertyId);
    setProperty(propertyData);
  }, [propertyId]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Inquiry submitted successfully! Our agent will contact you soon.");
      setShowInquiryForm(false);
      setInquiryForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      alert("Please login to add properties to favorites");
      return;
    }
    setIsFavorited(!isFavorited);
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/properties" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Properties
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavorite}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isFavorited
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={property.images[activeImage]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {property.status}
                  </span>
                </div>
                {property.virtualTour && (
                  <div className="absolute top-4 right-4">
                    <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      Virtual Tour
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="p-4 border-t">
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        activeImage === index ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{property.price}</div>
                  <div className="text-gray-500">{property.sqft}</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {property.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(property.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Places */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.nearby.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{place.name}</span>
                      <span className="text-gray-500 text-sm">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {property.agent.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900">{property.agent.name}</h4>
                <p className="text-gray-600 text-sm">{property.agent.experience} experience</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3" />
                  <a href={`tel:${property.agent.phone}`} className="hover:text-blue-600">
                    {property.agent.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <a href={`mailto:${property.agent.email}`} className="hover:text-blue-600">
                    {property.agent.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send Inquiry
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/schedule-visit"
                  className="flex items-center w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule Visit
                </Link>

                <button className="flex items-center w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  <Calculator className="w-5 h-5 mr-3" />
                  Mortgage Calculator
                </button>

                <button className="flex items-center w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  <Camera className="w-5 h-5 mr-3" />
                  View Floor Plan
                </button>
              </div>
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Property Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inquiries</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Favorites</span>
                  <span className="font-semibold">45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Send Inquiry</h3>
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;