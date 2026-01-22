"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Rohan Sharma",
        role: "Software Engineer",
        image: "/placeholder-user.jpg",
        content: "Finding a property in Lucknow was a breeze with this team. They understood my budget and showed me the best options near Kisan Path. Highly recommended!",
    },
    {
        name: "Priya Verma",
        role: "Business Owner",
        image: "/placeholder-user.jpg",
        content: "The expert guidance on home loans and legal verification gave me complete peace of mind. I'm now a proud owner of a luxury flat in Sultanpur Road.",
    },
    {
        name: "Amit Gupta",
        role: "Investor",
        image: "/placeholder-user.jpg",
        content: "I've worked with many real estate agencies, but their market analysis is superior. My property has already seen a 20% appreciation in just one year.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Voices of Distinction</span>
                        <div className="w-12 h-[1px] bg-accent" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif text-foreground">
                        Client <span className="italic">Experiences</span>
                    </h2>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.9,
                                type: "spring",
                                stiffness: 80,
                                damping: 20
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                        >
                            <div className={`testimonial-card p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.02)] relative z-10 ${index === 0
                                    ? "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                                    : index === 1
                                        ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
                                        : "bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
                                }`}>
                                <div className="flex gap-1 mb-10">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                                    ))}
                                </div>
                                <p className="text-zinc-500 mb-12 text-lg font-light leading-relaxed italic">
                                    &quot;{testimonial.content}&quot;
                                </p>
                                <div className="flex items-center gap-5 pt-10 border-t border-zinc-50">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden grayscale">
                                        <Image fill src={testimonial.image} alt={testimonial.name} className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-lg text-foreground">{testimonial.name}</h4>
                                        <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mt-1">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute top-8 left-8 -right-4 -bottom-4 rounded-[2.5rem] -z-0 ${index === 0
                                    ? "bg-blue-100"
                                    : index === 1
                                        ? "bg-emerald-100"
                                        : "bg-purple-100"
                                }`} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
