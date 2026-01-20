"use client";
import React from "react";
import { TrendingUp, MapPin, ShieldCheck, Landmark, Users, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: TrendingUp,
        title: "Higher ROI",
        description: "Earn significant returns on your investments with our market-leading properties in high-growth areas.",
    },
    {
        icon: MapPin,
        title: "Strategic Location",
        description: "All our projects are situated in Lucknow's most connected and rapidly developing urban hubs.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Properties",
        description: "Every property undergoing rigorous legal clearance and title verification before listing.",
    },
    {
        icon: Landmark,
        title: "Home Loan Guidance",
        description: "Expert assistance for seamless financing and documentation with leading banking partners.",
    },
    {
        icon: Users,
        title: "Expert Team",
        description: "Professional support from a team with over 15 years of local real estate market expertise.",
    },
    {
        icon: ThumbsUp,
        title: "Client Satisfaction",
        description: "Dedicated after-sales service and support ensuring a smooth transition to your new home.",
    },
];

export default function WhyChooseUs() {
    return (
        <section id="why-choose-us" className="py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-accent" />
                            <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Our Philosophy</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-[1.1]">
                            The Pillars of <br />
                            <span className="italic">Excellence</span>
                        </h2>
                    </div>
                    <p className="text-zinc-500 max-w-sm text-lg font-light leading-relaxed border-l border-zinc-100 pl-8">
                        Beyond brick and mortar, we curate environments that define a generation of refined living.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                delay: index * 0.12,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`feature-card p-14 rounded-[3rem] premium-shadow transition-all duration-700 group hover:shadow-2xl ${
                                index === 0
                                    ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300 hover:shadow-blue-500/20"
                                    : index === 1
                                    ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-500/20"
                                    : index === 2
                                    ? "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300 hover:shadow-purple-500/20"
                                    : index === 3
                                    ? "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200 hover:border-rose-300 hover:shadow-rose-500/20"
                                    : index === 4
                                    ? "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:border-amber-300 hover:shadow-amber-500/20"
                                    : "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:border-indigo-300 hover:shadow-indigo-500/20"
                            }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-12 group-hover:rotate-[15deg] transition-all duration-500 ${
                                index === 0
                                    ? "bg-blue-100 group-hover:bg-blue-500"
                                    : index === 1
                                    ? "bg-emerald-100 group-hover:bg-emerald-500"
                                    : index === 2
                                    ? "bg-purple-100 group-hover:bg-purple-500"
                                    : index === 3
                                    ? "bg-rose-100 group-hover:bg-rose-500"
                                    : index === 4
                                    ? "bg-amber-100 group-hover:bg-amber-500"
                                    : "bg-indigo-100 group-hover:bg-indigo-500"
                            }`}>
                                <feature.icon className={`w-6 h-6 transition-colors duration-500 ${
                                    index === 0
                                        ? "text-blue-600 group-hover:text-white"
                                        : index === 1
                                        ? "text-emerald-600 group-hover:text-white"
                                        : index === 2
                                        ? "text-purple-600 group-hover:text-white"
                                        : index === 3
                                        ? "text-rose-600 group-hover:text-white"
                                        : index === 4
                                        ? "text-amber-600 group-hover:text-white"
                                        : "text-indigo-600 group-hover:text-white"
                                }`} />
                            </div>
                            <h3 className={`text-2xl font-serif mb-6 leading-tight transition-colors duration-500 ${
                                index === 0
                                    ? "text-blue-900 group-hover:text-blue-700"
                                    : index === 1
                                    ? "text-emerald-900 group-hover:text-emerald-700"
                                    : index === 2
                                    ? "text-purple-900 group-hover:text-purple-700"
                                    : index === 3
                                    ? "text-rose-900 group-hover:text-rose-700"
                                    : index === 4
                                    ? "text-amber-900 group-hover:text-amber-700"
                                    : "text-indigo-900 group-hover:text-indigo-700"
                            }`}>{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm font-light tracking-wide">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
