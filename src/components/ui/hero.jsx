"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background with Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Beautiful Lucknow cityscape showcasing premium properties"
                    fill
                    className="object-cover"
                    priority
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-accent/30 to-purple-900/40" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-left my-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-10 shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-bold text-white/90 uppercase tracking-widest">The Prestige Collection</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tight mb-10 leading-[1.05]" data-cursor="text">
                        Your Dream  <br />
                        <span className="italic font-light">Property in</span>
                        <span className="italic font-light">Lucknow Awaits</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-14 font-light leading-relaxed">
                        Discover exceptional property lands in Uttar Pradesh with premium locations, excellent connectivity, and superior investment returns. AwasDhara brings you verified, curated properties in the heart of Lucknow.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Call to action buttons">
                        <Link href="/schedule-visit">
                            <button className="bg-white text-accent px-8 py-4 rounded-xl text-lg font-black hover:bg-brown hover:text-white transition-all transform hover:scale-105 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent">
                                Explore Properties
                            </button>
                        </Link>
                        <Link href="/properties">
                            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-black hover:bg-white hover:text-accent transition-all transform hover:scale-105 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                Schedule a Visit
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Stats Strip */}
            <div className="relative z-10 w-full bg-white/10 backdrop-blur-xl border-t border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:border-l md:border-white/20 md:pl-8">
                        {[
                            { label: "Happy Clients", value: "500+" },
                            { label: "Properties Sold", value: "1000+" },
                            { label: "Years Experience", value: "10+" },
                            { label: "Prime Locations", value: "25+" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col group cursor-default">
                                <span className="text-4xl md:text-5xl font-serif text-accent mb-2 leading-none group-hover:text-white transition-colors duration-500">{stat.value}</span>
                                <span className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.25em] leading-tight group-hover:text-white/80 transition-colors duration-500">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
