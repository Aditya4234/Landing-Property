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
                            className="luxury-card p-14 rounded-[3rem] group"
                        >
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-12 bg-accent/5 group-hover:bg-accent transition-all duration-500 group-hover:rotate-[15deg]">
                                <feature.icon className="w-6 h-6 text-accent group-hover:text-ebony transition-colors duration-500" />
                            </div>
                            <h3 className="text-3xl font-serif mb-6 leading-tight text-foreground group-hover:text-accent transition-colors duration-500">{feature.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm font-light tracking-wide group-hover:text-zinc-600 transition-colors duration-500">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
