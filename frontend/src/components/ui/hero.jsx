"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col pt-32 pb-20 overflow-hidden bg-ebony">
            {/* Main Background Image */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/images/hero-final.jpg"
                    alt="Luxury property development Lucknow"
                    fill
                    className="object-cover scale-105"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ebony/60 via-transparent to-ebony" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-dark border border-white/10 mb-10 backdrop-blur-md"
                        >
                            <span className="text-accent">✨</span>
                            <span className="text-[10px] font-bold text-pearl uppercase tracking-[0.4em]">The Pinnacle of Luxury Living</span>
                        </motion.div>

                        <h1 className="text-7xl md:text-9xl font-serif text-white mb-10 leading-[0.95] tracking-tight">
                            Elevated <br />
                            <span className="text-accent italic">Heritage</span> <br />
                            <span className="text-white/90">in Lucknow</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-pearl/60 max-w-2xl mb-14 leading-relaxed font-light mx-auto lg:mx-0">
                            Discover an exclusive collection of premier estates. AwasDhara curates timeless property lands with uncompromising quality and distinguished addresses in the heart of Uttar Pradesh.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-12 mb-20 justify-center lg:justify-start">
                            <Link href="/properties">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="gold-gradient text-ebony px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl shadow-accent/20 transition-all"
                                >
                                    Explore Portfolio
                                    <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <Link href="/schedule-visit" className="text-xs font-bold text-pearl/80 hover:text-accent transition-all uppercase tracking-[0.3em] border-b border-pearl/20 hover:border-accent pb-2">
                                Private Viewing
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-16 pt-16 border-t border-white/5 max-w-xl mx-auto lg:mx-0">
                            {[
                                { label: "Happy Clients", value: "500+" },
                                { label: "Properties Sold", value: "1000+" },
                                { label: "Years Experience", value: "10+" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                                    className="flex flex-col"
                                >
                                    <span className="text-4xl font-serif text-white mb-2">{stat.value}</span>
                                    <span className="text-[9px] font-bold text-pearl/40 uppercase tracking-[0.3em] leading-tight">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Space */}
                    <div className="flex-1 hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
