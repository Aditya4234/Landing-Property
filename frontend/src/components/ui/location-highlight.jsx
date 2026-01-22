"use client";
import React from "react";
import Image from "next/image";
import { Train, GraduationCap, Building2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
    {
        icon: Train,
        title: "Prime Connectivity",
        description: "Direct access to Kisan Path (2 min) and Sultanpur Road (5 min).",
    },
    {
        icon: GraduationCap,
        title: "Educational Hub",
        description: "Near Amity University and other prestigious institutions within 5-10 mins.",
    },
    {
        icon: Building2,
        title: "World-Class Healthcare",
        description: "Medanta Hospital and other top healthcare facilities just 15 mins away.",
    },
    {
        icon: ShoppingBag,
        title: "Shopping & Dining",
        description: "Phoenix Palassio and Lulu Mall located within a short 10-15 min drive.",
    },
];

import Link from "next/link";

export default function LocationHighlight() {
    return (
        <section className="py-32 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden"
                    >
                        <Image
                            src="/lucknow-uttar-pradesh-cityscape-aerial-view.jpg"
                            alt="Location Map"
                            fill
                            className="object-cover contrast-[1.1] brightness-[0.9]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12 p-10 glass rounded-4xl">
                            <h4 className="text-3xl font-serif text-white mb-3 tracking-wide">Strategic Connectivity</h4>
                            <p className="text-white/70 font-medium tracking-widest uppercase text-[10px]">Lucknow&apos;s Golden Circle</p>
                        </div>
                    </motion.div>

                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-accent" />
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Location Guidance</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1] mb-10">
                            At the Heart of <br />
                            <span className="italic font-light text-accent">Transition</span>
                        </h2>
                        <p className="text-zinc-500 text-lg font-light mb-16 leading-relaxed">
                            Connectivity is the ultimate luxury. Our projects are positioned at the epicenter of growth, ensuring you are never more than minutes away from the city&apos;s finest essentials.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`space-y-4 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${index === 0
                                        ? "bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-blue-200/50"
                                        : index === 1
                                            ? "bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-emerald-200/50"
                                            : index === 2
                                                ? "bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-purple-200/50"
                                                : "bg-gradient-to-br from-rose-50 to-rose-100 hover:shadow-rose-200/50"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${index === 0
                                        ? "bg-blue-500 text-white"
                                        : index === 1
                                            ? "bg-emerald-500 text-white"
                                            : index === 2
                                                ? "bg-purple-500 text-white"
                                                : "bg-rose-500 text-white"
                                        }`}>
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-serif text-foreground">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        <Link href="/schedule-visit">
                            <button className="w-full bg-foreground text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl">
                                Request a Private Tour
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
