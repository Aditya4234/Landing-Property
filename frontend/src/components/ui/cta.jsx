import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground text-balance">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Connect with our expert team today and discover properties that match your investment goals and lifestyle
              aspirations.
            </p>
          </div>
  
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary group px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center">
                Schedule a Call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/properties">
              <button className="border border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent px-6 py-3 rounded-lg font-medium transition-all duration-200">
                Explore Properties
              </button>
            </Link>
          </div>
  
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4 pt-8">
            <a
              href="tel:+919999999999"
              className="flex items-center justify-center gap-3 text-primary-foreground hover:text-primary-foreground/80 transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-xl py-4 px-6 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">+91 9999 999 999</span>
            </a>
            <a
              href="mailto:contact@awasdhara.com"
              className="flex items-center justify-center gap-3 text-primary-foreground hover:text-primary-foreground/80 transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-xl py-4 px-6 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">contact@awasdhara.com</span>
            </a>
          </div>
        </div>
      </section>
    );
}
