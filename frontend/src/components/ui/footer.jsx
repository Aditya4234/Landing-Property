"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Home, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import NewsletterSignup from "@/components/newsletter-signup";

export default function Footer() {
    return (
        <footer id="footer" className="bg-ebony text-white pt-32 pb-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div
                        className="col-span-1 md:col-span-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/" className="flex items-center gap-3 mb-10 group">
                            <div className="w-10 h-10 border border-accent flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-500">
                                <Home className="w-5 h-5 text-accent -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-serif tracking-widest text-white leading-none">AwasDhara</span>
                                <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mt-1">Property</span>
                            </div>
                        </Link>
                        <p className="text-white/40 leading-relaxed font-light mb-12 max-w-xs">
                            Discover the best properties in Lucknow. Expert guidance, tailored recommendations, and unmatched service.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-white/60">
                                <Phone className="w-4 h-4 text-accent" />
                                <span className="text-sm font-medium tracking-wider">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-4 text-white/60">
                                <Mail className="w-4 h-4 text-accent" />
                                <span className="text-sm font-medium tracking-wider">concierge@awasdharaproperties.com</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-serif text-2xl mb-12 text-white italic">The Collection</h4>
                        <ul className="space-y-6 text-white/40 font-bold text-[11px] uppercase tracking-[0.2em]">
                            <li><Link href="/properties" className="hover:text-accent transition-colors">Residential</Link></li>
                            <li><Link href="/properties" className="hover:text-accent transition-colors">Commercial</Link></li>
                            <li><Link href="/properties" className="hover:text-accent transition-colors">Penthouse Suite</Link></li>
                            <li><Link href="/properties" className="hover:text-accent transition-colors">Urban Villas</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-serif text-2xl mb-12 text-white italic">Discovery</h4>
                        <ul className="space-y-6 text-white/40 font-bold text-[11px] uppercase tracking-[0.2em]">
                            <li><Link href="/about" className="hover:text-accent transition-colors">Our Legacy</Link></li>
                            <li><Link href="/location" className="hover:text-accent transition-colors">The Neighborhood</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Advisor</Link></li>
                            <li><Link href="/schedule-visit" className="hover:text-accent transition-colors">Book a View</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-serif text-2xl mb-6 text-white italic">Stay Connected</h4>
                        <NewsletterSignup variant="footer" className="mb-6" />
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-500">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 font-bold text-[10px] tracking-[0.4em] uppercase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p>&copy; {new Date().getFullYear()} AwasDhara Properties. All rights reserved.</p>
                    <div className="flex gap-10 mt-10 md:mt-0">
                        <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Terms</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}