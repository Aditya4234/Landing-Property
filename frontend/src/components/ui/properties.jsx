"use client";
import React, { useState, Suspense, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Expand, ShieldCheck, Heart, ImageOff } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import ErrorBoundary from "./error-boundary";
import PropertyFilters from "./property-filters";
import { propertiesAPI } from "@/lib/api";

// Loading skeleton component
function PropertyCardSkeleton() {
    return (
        <div className="bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-zinc-50 flex flex-col animate-pulse">
            <div className="relative h-[320px] bg-zinc-200">
                <div className="absolute inset-0 bg-zinc-300" />
            </div>
            <div className="p-10 flex-1 flex flex-col">
                <div className="mb-8">
                    <div className="h-8 bg-zinc-200 rounded-lg mb-3" />
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-zinc-200 rounded" />
                        <div className="h-3 bg-zinc-200 rounded w-24" />
                    </div>
                </div>
                <div className="mt-auto pt-8 border-t border-zinc-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-3 bg-zinc-200 rounded w-16 mb-1" />
                            <div className="h-6 bg-zinc-200 rounded w-20" />
                        </div>
                        <div className="w-12 h-12 bg-zinc-200 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

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
        status: "Available"
    },
    {
        id: 2,
        title: "Indira Nagar Premium",
        location: "Indira Nagar, Lucknow",
        type: "Residential",
        price: "₹35 - ₹65 Lac",
        sqft: "1500 - 4000 sq.ft",
        highlights: ["Gated Community", "Green Spaces", "Premium Security"],
        image: "/images/prop2.png",
        status: "Selling Fast"
    },
    {
        id: 3,
        title: "Aliganj Commercial Hub",
        location: "Aliganj, Lucknow",
        type: "Commercial",
        price: "₹60 - ₹120 Lac",
        sqft: "3000 - 8000 sq.ft",
        highlights: ["High ROI", "Business Ready", "Excellent Visibility"],
        image: "/modern-residential-property-development.jpg",
        status: "Launch Today"
    }
];

// Simplified card component
function PropertyCard({ property, index, children }) {
    return (
        <div className="property-card group bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 flex flex-col transition-all duration-500 hover:shadow-xl">
            {children}
        </div>
    );
}

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: "all",
        location: "all",
        type: "all"
    });

    // Fetch properties on component mount
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await propertiesAPI.getAll();
                setProperties(response.data || []);
            } catch (err) {
                console.error('Error fetching properties:', err);
                setError('Failed to load properties. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties based on current filters
    const filteredProperties = useMemo(() => {
        if (!properties.length) return [];

        return properties.filter(property => {
            // Location filter
            if (filters.location !== "all" && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }

            // Type filter
            if (filters.type !== "all" && property.type !== filters.type) {
                return false;
            }

            // Price range filter (basic implementation)
            if (filters.priceRange !== "all") {
                // This is a simplified filter - you might want to implement more sophisticated price parsing
                const priceStr = property.price.toLowerCase();
                switch (filters.priceRange) {
                    case '0-50':
                        if (!priceStr.includes('₹') || !/\d+/.test(priceStr.replace(/₹|lac|lacs|,/g, ''))) return false;
                        break;
                    case '50-100':
                        if (!priceStr.includes('₹') || !/\d+/.test(priceStr.replace(/₹|lac|lacs|,/g, ''))) return false;
                        break;
                    case '100-200':
                        if (!priceStr.includes('₹') || !/\d+/.test(priceStr.replace(/₹|lac|lacs|,/g, ''))) return false;
                        break;
                    case '200+':
                        if (!priceStr.includes('₹') || !/\d+/.test(priceStr.replace(/₹|lac|lacs|,/g, ''))) return false;
                        break;
                }
            }

            return true;
        });
    }, [filters, properties]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <section id="properties" className="py-32 bg-[#F9F7F5] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-accent" />
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Our Signature Collection</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-serif text-foreground mb-8 leading-[1.1]">
                            The Masterpiece <br />
                            <span className="italic text-accent">Portfolio</span>
                        </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <PropertyFilters properties={properties} onFilterChange={handleFilterChange} />
                        </div>
                    </div>
                </div>

                <ErrorBoundary>
                    <Suspense fallback={
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <PropertyCardSkeleton key={i} />
                            ))}
                        </motion.div>
                    }>
                        {loading ? (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <PropertyCardSkeleton key={i} />
                                ))}
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-16"
                            >
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ImageOff className="w-8 h-8 text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Properties</h3>
                                    <p className="text-gray-600 mb-6">{error}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-10"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                            {filteredProperties.map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.8,
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 20
                                    }}
                                    viewport={{ once: true, margin: "-50px" }}
                                >
                                    <PropertyCard property={property} index={index}>
                                        {/* Image Container */}
                                        <div className="relative h-[280px] overflow-hidden">
                                            <Image
                                                src={property.image}
                                                alt={property.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                                loading="lazy"
                                                quality={85}
                                            />
                                            <div className="absolute top-4 left-4 px-4 py-1.5 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground">
                                                {property.status}
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-8 flex-1 flex flex-col bg-white">
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-bold text-foreground mb-2">{property.title}</h3>
                                                <div className="flex items-center gap-2 text-zinc-400">
                                                    <MapPin className="w-4 h-4 text-zinc-400" />
                                                    <span className="text-sm font-medium">{property.location}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-zinc-100">
                                                <div>
                                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Size</p>
                                                    <div className="flex items-center gap-2">
                                                        <Expand size={14} className="text-orange-900" />
                                                        <span className="text-xs font-bold text-foreground">{property.sqft}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Price</p>
                                                    <p className="text-sm font-bold text-foreground">{property.price}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-10">
                                                {property.highlights.map((highlight, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-zinc-600">
                                                        <motion.div
                                                            initial={{ x: -5, opacity: 0 }}
                                                            whileInView={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                                        >
                                                            <ArrowRight size={14} className="text-orange-900 rotate-[-45deg]" />
                                                        </motion.div>
                                                        <span className="text-sm font-medium">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link href={`/properties/${property.id}`} className="mt-auto">
                                                <button className="w-full bg-[#703014] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#5a2610] transition-all duration-300 shadow-lg shadow-orange-900/10 active:scale-[0.98]">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </PropertyCard>
                                </motion.div>
                            ))}
                            </motion.div>
                        )}
                    </Suspense>
                </ErrorBoundary>

                {filteredProperties.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your filters to see more properties that match your criteria.
                            </p>
                            <button
                                onClick={() => setFilters({ priceRange: "all", location: "all", type: "all" })}
                                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </motion.div>
                )}

                <div className="mt-24 text-center">
                    <Link href="/properties">
                        <motion.button
                            whileHover={{ x: 10 }}
                            className="inline-flex items-center gap-8 text-foreground font-bold text-[10px] uppercase tracking-[0.6em] group"
                        >
                            Explore Full Portfolio
                            <div className="w-16 h-16 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-700">
                                <ArrowRight size={20} />
                            </div>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
