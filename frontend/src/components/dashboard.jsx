"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Heart,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
  Edit,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Home
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch user profile
      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserProfile(profileData.user);
        setEditForm(profileData.user);
      }

      // Mock data for favorites and inquiries (replace with actual API calls)
      setFavorites([
        {
          id: 1,
          title: "Luxury Apartment in Gomti Nagar",
          location: "Gomti Nagar, Lucknow",
          price: "₹85 Lakhs",
          image: "/images/prop1.png",
          addedDate: "2024-01-15"
        },
        {
          id: 2,
          title: "Modern Villa in Hazratganj",
          location: "Hazratganj, Lucknow",
          price: "₹1.2 Crores",
          image: "/images/prop2.png",
          addedDate: "2024-01-10"
        }
      ]);

      setInquiries([
        {
          id: 1,
          propertyTitle: "Premium Commercial Space",
          propertyId: 3,
          message: "Interested in this commercial property. Please provide more details about the lease terms.",
          status: "pending",
          date: "2024-01-20",
          response: null
        },
        {
          id: 2,
          propertyTitle: "Residential Plot in Indiranagar",
          propertyId: 4,
          message: "Is this plot approved for construction? What are the building restrictions?",
          status: "responded",
          date: "2024-01-18",
          response: "Yes, this plot is fully approved for construction with no building restrictions."
        }
      ]);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const result = await response.json();
        setUserProfile(result.user);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load dashboard</h2>
          <Link href="/" className="text-blue-600 hover:underline">Return to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Welcome back, {userProfile.firstName}!
                  </h1>
                  <p className="text-blue-100">Manage your property preferences and inquiries</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </button>

                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "favorites"
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Favorites ({favorites.length})
                </button>

                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "inquiries"
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Inquiries ({inquiries.length})
                </button>

                <button
                  onClick={() => setActiveTab("visits")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "visits"
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Scheduled Visits
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={editForm.firstName || ""}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={editForm.lastName || ""}
                            onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email || ""}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone || ""}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={handleEditProfile}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Name:</span>
                            <span className="ml-2 font-medium">{userProfile.firstName} {userProfile.lastName}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2 font-medium">{userProfile.email}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Phone:</span>
                            <span className="ml-2 font-medium">{userProfile.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Member since:</span>
                            <span className="ml-2 font-medium">
                              {new Date(userProfile.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Properties</h2>

                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite properties yet</h3>
                      <p className="text-gray-600 mb-4">Start exploring properties and add them to your favorites.</p>
                      <Link
                        href="/properties"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Browse Properties
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favorites.map((property) => (
                        <div key={property.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={property.image}
                                alt={property.title}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{property.title}</h3>
                                <p className="text-gray-600 flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {property.location}
                                </p>
                                <p className="text-green-600 font-semibold">{property.price}</p>
                                <p className="text-sm text-gray-500">
                                  Added on {new Date(property.addedDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/properties/${property.id}`}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => handleRemoveFavorite(property.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Heart className="w-5 h-5 fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "inquiries" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Inquiries</h2>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                      <p className="text-gray-600 mb-4">Contact us about properties you're interested in.</p>
                      <Link
                        href="/properties"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Browse Properties
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">{inquiry.propertyTitle}</h3>
                              <p className="text-sm text-gray-500">
                                Inquiry sent on {new Date(inquiry.date).toLocaleDateString()}
                              </p>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                                inquiry.status === 'responded'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {inquiry.status === 'responded' ? 'Responded' : 'Pending Response'}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-gray-700">{inquiry.message}</p>
                          </div>

                          {inquiry.response && (
                            <div className="bg-blue-50 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <Star className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium text-blue-900">AwasDhara Response</span>
                              </div>
                              <p className="text-blue-800">{inquiry.response}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "visits" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheduled Visits</h2>

                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled visits</h3>
                    <p className="text-gray-600 mb-4">Schedule a visit to view properties in person.</p>
                    <Link
                      href="/schedule-visit"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Visit
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" id="email-notifications" className="rounded" defaultChecked />
                          <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                            Email notifications for new properties
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="sms-notifications" className="rounded" defaultChecked />
                          <label htmlFor="sms-notifications" className="ml-3 text-sm text-gray-700">
                            SMS notifications for property updates
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" id="profile-visibility" className="rounded" />
                          <label htmlFor="profile-visibility" className="ml-3 text-sm text-gray-700">
                            Make my profile visible to agents
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;