"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ui/theme-provider";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/properties" },
        { name: "About Us", href: "/about" },
        { name: "Locations", href: "/location" },
        { name: "Contact Us", href: "/contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-8 py-6",
                isScrolled
                    ? "py-4 glass border-b border-white/10"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group" aria-label="AwasDhara Properties - Go to homepage">
                    <div className="w-10 h-10 border border-accent flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all duration-500 hover:shadow-lg hover:shadow-accent/20" aria-hidden="true">
                        <Home className="w-5 h-5 text-accent -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-serif tracking-widest text-foreground leading-none group-hover:text-accent transition-colors duration-300">AwasDhara</span>
                        <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mt-1 group-hover:text-accent/80 transition-colors duration-300">Property</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-bold text-foreground/70 uppercase tracking-[0.2em] hover:text-accent transition-colors relative group focus:outline-none focus:text-accent"
                            aria-label={`Navigate to ${link.name}`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-focus:w-full" aria-hidden="true" />
                        </Link>
                    ))}

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
                    </button>

                    <Link href="/schedule-visit" className="ml-2">
                        <button className="bg-accent text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent">
                            Schedule Visit
                        </button>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-50 md:hidden bg-background flex flex-col p-10 pt-32 gap-8"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        <button
                            className="absolute top-8 right-8 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={32} aria-hidden="true" />
                        </button>
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-4xl font-serif text-foreground hover:text-accent transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        {/* Mobile Theme Toggle */}
                        <div className="flex justify-center my-8">
                            <button
                                onClick={toggleTheme}
                                className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300"
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </div>

                        <div className="mt-auto">
                            <Link href="/schedule-visit" onClick={() => setMobileMenuOpen(false)}>
                                <button className="bg-accent text-white w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-2xl shadow-accent/30">
                                    Schedule a Visit
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
