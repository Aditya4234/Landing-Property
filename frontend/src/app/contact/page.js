"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

export default function ContactPage() {
    const [status, setStatus] = useState(""); // '', 'success', 'error', 'loading'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await apiRequest('/contact', {
                method: 'POST',
                body: formData
            });

            setStatus("success");
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            e.target.reset();
            setTimeout(() => setStatus(""), 5000);
        } catch (error) {
            console.error('Contact form submission error:', error);
            setStatus("error");
            setTimeout(() => setStatus(""), 5000);
        }
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
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground"
                                        disabled={status === "loading"}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground"
                                        disabled={status === "loading"}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground"
                                    disabled={status === "loading"}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Nature of Inquiry</label>
                                <input
                                    required
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Residential Acquisition"
                                    className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground"
                                    disabled={status === "loading"}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-accent uppercase tracking-widest">Detailed Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="How may we assist you?"
                                    className="w-full bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-accent transition-all font-light text-foreground resize-none"
                                    disabled={status === "loading"}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-foreground text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Dispatch Message
                                    </>
                                )}
                            </button>
                            {status === "success" && <p className="text-green-600 font-serif italic text-center text-sm">Your message has been received. Our advisors will contact you shortly.</p>}
                            {status === "error" && <p className="text-red-600 font-serif italic text-center text-sm">Failed to send message. Please try again.</p>}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
