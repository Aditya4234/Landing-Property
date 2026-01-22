import LocationHighlight from "@/components/ui/location-highlight";

export default function LocationPage() {
    return (
        <main className="pt-32">
             <div className="bg-background py-24 border-b border-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Location Intelligence</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif text-foreground mb-10 leading-[1.1]">
                        The Golden <br />
                        <span className="italic font-light">Coordinates</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-xl font-light leading-relaxed">
                        Precision in placement is our philosophy. We select locations that offer not just comfort today, but exponential appreciation for tomorrow.
                    </p>
                </div>
            </div>
            <LocationHighlight />
        </main>
    );
}
