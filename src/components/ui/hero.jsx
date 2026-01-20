"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col pt-32 pb-20 overflow-hidden bg-[#F9F7F5]">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8">
                            <span className="text-sm">✨</span>
                            <span className="text-[11px] font-bold text-[#703014] uppercase tracking-wider">Premium Property Development in Lucknow</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-10 leading-[1.1] tracking-tight">
                            Your Dream <br />
                            Property in <br />
                            <span className="text-[#1A1A1A]">Lucknow Awaits</span>
                        </h1>

                        <p className="text-lg md:text-xl text-zinc-500 max-w-xl mb-12 leading-relaxed">
                            Discover exceptional property lands in Uttar Pradesh with premium locations, excellent connectivity, and superior investment returns. AwasDhara brings you verified, curated properties in the heart of Lucknow.
                        </p>

                        <div className="flex items-center gap-10 mb-20">
                            <Link href="/properties">
                                <button className="bg-[#703014] text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-3 hover:bg-[#5a2610] transition-all shadow-xl shadow-orange-900/10">
                                    Explore Properties
                                    <ArrowRight size={18} />
                                </button>
                            </Link>
                            <Link href="/schedule-visit" className="text-sm font-bold text-foreground hover:text-[#703014] transition-colors border-b-2 border-transparent hover:border-[#703014] pb-1">
                                Schedule a Visit
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-12">
                            {[
                                { label: "Happy Clients", value: "500+" },
                                { label: "Properties Sold", value: "1000+" },
                                { label: "Years Experience", value: "10+" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-4xl font-bold text-foreground mb-1">{stat.value}</span>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-tight">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Images */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex-1 lg:h-[700px] relative w-full"
                    >
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="relative h-[400px] lg:h-full rounded-[2.5rem] overflow-hidden group shadow-2xl">
                                <Image
                                    src="/images/prop1.png"
                                    alt="Luxury interior"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="grid grid-rows-2 gap-4">
                                <div className="relative rounded-[2rem] overflow-hidden group shadow-xl">
                                    <Image
                                        src="/images/prop2.png"
                                        alt="Modern lobby"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="relative rounded-[2rem] overflow-hidden group shadow-xl">
                                    <Image
                                        src="/modern-residential-property-development.jpg"
                                        alt="Luxury pool"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-orange-100/20 to-transparent pointer-events-none" />
        </section>
    );
}
