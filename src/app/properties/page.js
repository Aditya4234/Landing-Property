import Properties from "@/components/ui/properties";

export default function PropertiesPage() {
    return (
        <main className="pt-32">
             <div className="bg-background py-24 border-b border-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Real Estate Portfolio</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif text-foreground mb-10 leading-[1.1]">
                        The Signature <br />
                        <span className="italic font-light">Collection</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-xl font-light leading-relaxed">
                        Explore our curated selection of ultra-luxury residences, meticulously vetted for architectural excellence and investment potential.
                    </p>
                </div>
            </div>
            <Properties />
        </main>
    );
}
