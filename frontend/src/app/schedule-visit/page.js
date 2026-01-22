"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ScheduleVisitPage() {
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("Tour request confirmed. An elite advisor will contact you shortly.");
        e.target.reset();
        setTimeout(() => setStatus(""), 5000);
    };

    return (
        <main className="pt-32 bg-background">
             <div className="bg-background py-24 border-b border-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Personalized Tours</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif text-foreground mb-10 leading-[1.1]">
                        Private <br />
                        <span className="italic font-light">Showcase</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-xl font-light leading-relaxed">
                        Witness the convergence of architecture and artistry. Schedule a private viewing to experience the subtle nuances of our premier developments.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-24">
                    {/* Booking Steps */}
                    <div className="lg:col-span-2 space-y-12">
                        {[
                            { step: "01", title: "Select Destination", desc: "Choose your preferred residence from our portfolio." },
                            { step: "02", title: "Timing", desc: "Select a window of time for your exclusive tour." },
                            { step: "03", title: "Concierge Detail", desc: "Share your details for a tailored experience." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-6 group">
                                <span className="text-4xl font-serif text-accent/20 group-hover:text-accent transition-colors duration-500">{item.step}</span>
                                <div>
                                    <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                                    <p className="text-zinc-400 font-light text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}

                        <div className="p-10 glass rounded-[2rem] border border-white/20">
                            <h4 className="font-serif text-xl text-accent flex items-center gap-3 mb-4 italic">
                                Bespoke Experience
                            </h4>
                            <p className="text-sm text-zinc-500 font-light leading-relaxed">
                                Our estate directors provide a comprehensive narrative of the project&apos;s design language, structural integrity, and investment trajectory.
                            </p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-3 bg-white p-12 rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.03)] border border-zinc-50">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Project Destination</label>
                                <div className="relative">
                                    <select required className="w-full bg-zinc-50/50 border-none px-6 py-4 rounded-2xl focus:ring-1 focus:ring-accent transition-all font-light text-foreground appearance-none">
                                        <option value="">Awaiting selection...</option>
                                        <option value="uphaar">Uphaar Homes (Kisan Path)</option>
                                        <option value="avadh">Avadh Express Avenue (Sultanpur Road)</option>
                                        <option value="imperial">The Imperial Heights (Amar Shaheed Path)</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronRight size={18} className="text-zinc-300" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] flex items-center gap-2">
                                        <Calendar size={14} /> Preferred Date
                                    </label>
                                    <input required type="date" className="w-full bg-zinc-50/50 border-none px-6 py-4 rounded-2xl focus:ring-1 focus:ring-accent transition-all font-light text-foreground" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] flex items-center gap-2">
                                        <Clock size={14} /> Preferred Window
                                    </label>
                                    <select required className="w-full bg-zinc-50/50 border-none px-6 py-4 rounded-2xl focus:ring-1 focus:ring-accent transition-all font-light text-foreground appearance-none">
                                        <option value="">Select time...</option>
                                        <option value="morning">Morning (10 - 12)</option>
                                        <option value="afternoon">Afternoon (13 - 16)</option>
                                        <option value="evening">Evening (17 - 19)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="h-[1px] bg-zinc-50" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Direct Line</label>
                                    <input required type="tel" placeholder="+91 00000 00000" className="w-full bg-zinc-50/50 border-none px-6 py-4 rounded-2xl focus:ring-1 focus:ring-accent transition-all font-light text-foreground" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Digital Presence</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-zinc-50/50 border-none px-6 py-4 rounded-2xl focus:ring-1 focus:ring-accent transition-all font-light text-foreground" />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-foreground text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all duration-500 shadow-2xl">
                                Request Access
                            </button>
                            {status && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-accent/5 rounded-2xl flex items-center gap-4 text-accent font-serif italic text-sm"
                                >
                                    <CheckCircle size={18} className="flex-shrink-0" />
                                    {status}
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
