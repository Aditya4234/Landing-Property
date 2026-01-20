"use client";
import React, { useState, Suspense, useRef, useMemo } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Expand, ShieldCheck, Heart, ImageOff } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import ErrorBoundary from "./error-boundary";
import PropertyFilters from "./property-filters";

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
        title: "Uphaar Homes",
        location: "Kisan Path, Lucknow",
        price: "45L - 75L",
        details: "1/2 BHK Apartments",
        status: "Ready to Move",
        image: "/images/prop1.png",
        sqft: "1250 - 1800",
        type: "Luxury Flat"
    },
    {
        id: 2,
        title: "Avadh Express",
        location: "Sultanpur Road, Lucknow",
        price: "65L - 1.2Cr",
        details: "2/3 BHK Luxury Flats",
        status: "Under Construction",
        image: "/images/prop2.png",
        sqft: "1500 - 2400",
        type: "Modern Suite"
    },
    {
        id: 3,
        title: "Amrit Paradise",
        location: "Raebareli Road, Lucknow",
        price: "35L - 55L",
        details: "1/2 BHK Budget Homes",
        status: "Ready to Move",
        image: "/images/prop3.png",
        sqft: "1100 - 1600",
        type: "Comfort Living"
    },
    {
        id: 4,
        title: "The Regal Estate",
        location: "Gomti Nagar, Lucknow",
        price: "1.5Cr - 3Cr",
        details: "4 BHK Ultra Luxury",
        status: "Exclusive",
        image: "/images/prop4.png",
        sqft: "3500 - 5000",
        type: "Elite Villa"
    },
    {
        id: 5,
        title: "Sushant Golf City",
        location: "Shaheed Path, Lucknow",
        price: "85L - 1.8Cr",
        details: "3 BHK Premium",
        status: "New Launch",
        image: "/images/prop5.png",
        sqft: "1800 - 2800",
        type: "Golf View"
    },
    {
        id: 6,
        title: "Eldeco Imperia",
        location: "Kursi Road, Lucknow",
        price: "55L - 95L",
        details: "2/3 BHK Modern",
        status: "Ongoing",
        image: "/modern-residential-property-development.jpg",
        sqft: "1350 - 2100",
        type: "Smart Home"
    }
];

// Simplified card component
function PropertyCard({ property, index, children }) {
    return (
        <div className={`property-card group overflow-hidden premium-shadow border transition-all duration-700 flex flex-col cursor-pointer ${index === 0
            ? "bg-gradient-to-br from-blue-50 to-indigo-100 rounded-[3rem] border-blue-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-3"
            : index === 1
                ? "bg-gradient-to-br from-emerald-50 to-teal-100 rounded-[2.5rem] border-emerald-200 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2"
                : index === 2
                    ? "bg-gradient-to-br from-purple-50 to-violet-100 rounded-[3rem] border-purple-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3"
                    : index === 3
                        ? "bg-gradient-to-br from-rose-50 to-pink-100 rounded-[2.5rem] border-rose-200 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-2"
                        : index === 4
                            ? "bg-gradient-to-br from-amber-50 to-orange-100 rounded-[3rem] border-amber-200 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-3"
                            : "bg-gradient-to-br from-slate-50 to-gray-100 rounded-[2.5rem] border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-500/20 hover:-translate-y-2"
            }`}>
            {children}
        </div>
    );
}

export default function Properties() {
    const [filters, setFilters] = useState({
        priceRange: "all",
        location: "all",
        type: "all"
    });

    // Filter properties based on current filters
    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            // Price range filter
            if (filters.priceRange !== "all") {
                const priceStr = property.price.replace(/[₹LKCr\s]/g, "");
                let price = 0;

                if (priceStr.includes("-")) {
                    const [min, max] = priceStr.split("-").map(p => parseFloat(p.replace(/[^\d.]/g, "")));
                    price = (min + max) / 2; // Use average for range
                } else {
                    price = parseFloat(priceStr.replace(/[^\d.]/g, ""));
                }

                if (filters.priceRange === "0-50" && price >= 50) return false;
                if (filters.priceRange === "50-100" && (price < 50 || price >= 100)) return false;
                if (filters.priceRange === "100-200" && (price < 100 || price >= 200)) return false;
                if (filters.priceRange === "200+" && price < 200) return false;
            }

            // Location filter
            if (filters.location !== "all" && property.location !== filters.location) {
                return false;
            }

            // Type filter
            if (filters.type !== "all" && property.type !== filters.type) {
                return false;
            }

            return true;
        });
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <section id="properties" className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-accent" />
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Our Signature Collection</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-8 leading-[1.1]">
                            The Masterpiece <br />
                            <span className="italic">Portfolio</span>
                        </h2>
                        <p className="text-sm text-accent font-medium">
                            Showing {filteredProperties.length} of {properties.length} properties
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-zinc-500 max-w-sm text-lg font-light leading-relaxed border-l border-zinc-100 pl-8">
                            A curated selection of the most prestigious developments in Lucknow, meticulously vetted for architectural excellence.
                        </p>
                        <div className="flex justify-end">
                            <PropertyFilters properties={properties} onFilterChange={handleFilterChange} />
                        </div>
                    </div>
                </div>

                <ErrorBoundary>
                    <Suspense fallback={
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {[...Array(6)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                >
                                    <PropertyCardSkeleton />
                                </motion.div>
                            ))}
                        </motion.div>
                    }>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {filteredProperties.map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.15,
                                        duration: 0.8,
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 20
                                    }}
                                    viewport={{ once: true, margin: "-50px" }}
                                >
                                    <PropertyCard property={property} index={index}>
                                        {/* Image Container */}
                                        <div className="relative h-[320px] overflow-hidden">
                                            <Image
                                                src={property.image}
                                                alt={`${property.title} - ${property.details} in ${property.location}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                                                loading="lazy"
                                                quality={80}
                                                placeholder="blur"
                                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

                                            <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground" role="status" aria-label={`Property status: ${property.status}`}>
                                                {property.status}
                                            </div>
                                            <button
                                                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                                                aria-label={`Add ${property.title} to favorites`}
                                            >
                                                <Heart size={18} aria-hidden="true" />
                                            </button>

                                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white transition-all duration-700 opacity-100 translate-y-0 md:opacity-0 md:translate-y-12 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                                                <span className="text-xs font-medium flex items-center gap-2">
                                                    <Expand size={14} /> {property.sqft} Sq.Ft
                                                </span>
                                                <span className="text-xs font-bold uppercase tracking-widest">
                                                    {property.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="p-10 flex-1 flex flex-col">
                                            <div className="mb-8">
                                                <h3 className="text-3xl font-serif text-foreground mb-3">{property.title}</h3>
                                                <div className="flex items-center gap-2 text-zinc-400">
                                                    <MapPin className="w-4 h-4 text-accent" />
                                                    <span className="text-[11px] font-bold uppercase tracking-widest">{property.location}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-8 border-t border-zinc-50 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">Starting From</p>
                                                    <p className="text-2xl font-serif text-foreground">₹{property.price}</p>
                                                </div>
                                                <Link href="/properties">
                                                    <button className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all duration-500">
                                                        <ArrowRight size={20} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </PropertyCard>
                                </motion.div>
                            ))}
                        </motion.div>
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
                        <button className="inline-flex items-center gap-6 text-foreground font-bold text-[11px] uppercase tracking-[0.4em] group">
                            Explore Full Portfolio
                            <div className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-700">
                                <ArrowRight size={20} />
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
