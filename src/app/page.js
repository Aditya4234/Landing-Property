import Hero from "@/components/ui/hero";
import Properties from "@/components/ui/properties";
import WhyChooseUs from "@/components/ui/why-choose-us";
import Testimonials from "@/components/ui/testimonials";
import LocationHighlight from "@/components/ui/location-highlight";
import CTA from "@/components/ui/cta";

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "AwasDhara Properties",
  "description": "Premium real estate company specializing in properties in Lucknow, Uttar Pradesh",
  "url": "https://awasdharaproperties.com",
  "logo": "https://awasdharaproperties.com/placeholder-logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lucknow",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://facebook.com/awasdharaproperties",
    "https://instagram.com/awasdharaproperties"
  ],
  "areaServed": {
    "@type": "Place",
    "name": "Lucknow, Uttar Pradesh"
  }
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen">
        <Hero />
        <Properties />
        <WhyChooseUs />
        <LocationHighlight />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
