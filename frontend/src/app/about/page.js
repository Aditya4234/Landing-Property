import WhyChooseUs from "@/components/ui/why-choose-us";
import Testimonials from "@/components/ui/testimonials";

export default function AboutPage() {
    return (
        <main className="pt-32">
             <div className="bg-background py-24 border-b border-zinc-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-accent" />
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Our Legacy</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif text-foreground mb-10 leading-[1.1]">
                        Dedication to <br />
                        <span className="italic font-light">Refinement</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-xl font-light leading-relaxed">
                        For over a decade, we have been the silent architects behind Lucknow&apos;s most prestigious residential acquisitions, blending tradition with modern excellence.
                    </p>
                </div>
            </div>
            <WhyChooseUs />
            <Testimonials />
        </main>
    );
}
