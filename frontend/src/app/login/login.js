import { Inter, Playfair_Display } from "next/font/google";
import ThemeProvider from "@/components/ui/theme-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollToTop from "@/components/ui/scroll-to-top";
import CustomCursor from "@/components/ui/custom-cursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "AwasDhara - Premium Properties in Lucknow | Real Estate Uttar Pradesh",
  description: "Discover exceptional property lands in Uttar Pradesh with premium locations, excellent connectivity, and superior investment returns. AwasDhara brings you verified, curated properties in the heart of Lucknow.",
  keywords: "Lucknow properties, real estate Uttar Pradesh, luxury homes Lucknow, property investment, AwasDhara properties, residential flats Lucknow, commercial property development",
  authors: [{ name: "AwasDhara" }],
  creator: "AwasDhara",
  publisher: "AwasDhara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://awasdharaproperties.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AwasDhara - Premium Properties in Lucknow",
    description: "Find your dream property in Lucknow with AwasDhara. Premium projects, best locations, and expert guidance.",
    url: "https://awasdharaproperties.com",
    siteName: "AwasDhara Properties",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "AwasDhara Properties - Premium Properties in Lucknow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AwasDhara - Premium Properties in Lucknow",
    description: "Find your dream property in Lucknow with AwasDhara. Premium projects, best locations, and expert guidance.",
    images: ["/images/hero-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}>
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
