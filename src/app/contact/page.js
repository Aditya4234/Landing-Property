"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("Your message has been received. Our advisors will contact you shortly.");
        e.target.reset();
        setTimeout(() => setStatus(""), 5000);
    };

    return (
        <main className="pt-32 bg-background">
             <div className="bg-background py-24 border-b border-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Concierge Service</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif text-foreground mb-10 leading-[1.1]">
                        Private <br />
                        <span className="italic font-light">Advisors</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-xl font-light leading-relaxed">
                        Exclusivity begins with a conversation. Connect with our dedicated estate consultants for a tailored introduction to Lucknow&apos;s finest properties.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-4xl font-serif text-foreground mb-8">Executive Office</h2>
                            <p className="text-zinc-400 text-lg font-light leading-relaxed">Our headquarters are located in the heart of Gomti Nagar, providing a discreet environment for high-value negotiations and private viewings.</p>
                        </div>

                        <div className="space-y-10">
                            {[
                                { icon: Phone, title: "Private Line", content: "+91 91234 56789" },
                                { icon: Mail, title: "Executive Email", content: "concierge@realestatelucknow.com" },
                                { icon: MapPin, title: "Global Headquarters", content: "Gomti Nagar, Ext. Lucknow, UP - 226010" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl text-foreground mb-1">{item.title}</h3>
                                        <p className="text-zinc-400 font-light">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-12 rounded-[3rem] border border-white/20 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Full Name</label>
                                    <input required type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Email Address</label>
                                    <input required type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Nature of Inquiry</label>
                                <input required type="text" placeholder="Residential Acquisition" className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Detailed Message</label>
                                <textarea required rows={4} placeholder="How may we assist you?" className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-foreground text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3">
                                <Send size={16} />
                                Dispatch Message
                            </button>
                            {status && <p className="text-accent font-serif italic text-center text-sm">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
