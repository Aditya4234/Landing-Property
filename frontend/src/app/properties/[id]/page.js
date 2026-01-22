import PropertyDetail from "@/components/property-detail";

export async function generateMetadata({ params }) {
  // In a real app, you would fetch property data based on params.id
  const property = await getPropertyById(params.id);

  return {
    title: `${property?.title || 'Property'} - AwasDhara Properties`,
    description: `View details of ${property?.title || 'this property'} in ${property?.location || 'Lucknow'}. ${property?.description || 'Premium property with excellent amenities.'}`,
  };
}

async function getPropertyById(id) {
  // Mock property data - in a real app, this would be an API call
  const properties = [
    {
      id: 1,
      title: "Gomti Nagar Elite",
      location: "Gomti Nagar, Lucknow",
      type: "Residential",
      price: "₹45 - ₹85 Lac",
      sqft: "2000 - 5000 sq.ft",
      highlights: ["Prime Location", "Modern Amenities", "Investment Ready"],
      image: "/images/prop1.png",
      status: "Available",
      description: "Experience luxury living in the heart of Gomti Nagar. This premium residential complex offers spacious apartments with world-class amenities, excellent connectivity, and a perfect blend of comfort and convenience.",
      features: [
        "24/7 Security",
        "Swimming Pool",
        "Gymnasium",
        "Children's Play Area",
        "Power Backup",
        "Covered Parking",
        "Landscape Garden",
        "Intercom Facility"
      ],
      specifications: {
        "Total Area": "5 Acres",
        "Number of Units": "120",
        "Floors": "15",
        "Lift": "2 High-speed elevators",
        "Possession": "Ready to Move",
        "RERA Approved": "Yes"
      },
      nearby: [
        { name: "Indira Gandhi Pratishthan", distance: "2 km" },
        { name: "Wave Mall", distance: "3 km" },
        { name: "City Hospital", distance: "1.5 km" },
        { name: "Railway Station", distance: "5 km" }
      ],
      images: ["/images/prop1.png", "/images/hero-bg.png", "/images/hero-main.png"],
      virtualTour: "https://example.com/virtual-tour",
      floorPlan: "/images/floor-plan.png"
    },
    {
      id: 2,
      title: "Hazratganj Heights",
      location: "Hazratganj, Lucknow",
      type: "Commercial",
      price: "₹1.2 - ₹2.5 Cr",
      sqft: "3000 - 8000 sq.ft",
      highlights: ["Commercial Hub", "High ROI", "Modern Infrastructure"],
      image: "/images/prop2.png",
      status: "Under Construction",
      description: "Prime commercial space in the bustling Hazratganj area. Perfect for retail outlets, offices, or showrooms with excellent footfall and connectivity to major business districts.",
      features: [
        "High Street Location",
        "Glass Facade",
        "Central AC",
        "24/7 Security",
        "Dedicated Parking",
        "Fire Safety Systems",
        "Power Backup",
        "Modern Elevators"
      ],
      specifications: {
        "Total Area": "2 Acres",
        "Number of Units": "45",
        "Floors": "8",
        "Lift": "4 High-speed elevators",
        "Possession": "2025",
        "RERA Approved": "Yes"
      },
      nearby: [
        { name: "Hazratganj Market", distance: "0.5 km" },
        { name: "Charbagh Railway Station", distance: "2 km" },
        { name: "UP Government Offices", distance: "1 km" },
        { name: "Shopping Malls", distance: "1.5 km" }
      ],
      images: ["/images/prop2.png", "/images/commercial-property-development-uttar-pradesh.jpg"],
      virtualTour: null,
      floorPlan: "/images/commercial-floor-plan.png"
    },
    {
      id: 3,
      title: "Alambagh Gardens",
      location: "Alambagh, Lucknow",
      type: "Residential",
      price: "₹35 - ₹65 Lac",
      sqft: "1500 - 3500 sq.ft",
      highlights: ["Affordable Luxury", "Green Environment", "Family Friendly"],
      image: "/images/prop3.png",
      status: "Available",
      description: "Beautiful residential complex in the peaceful Alambagh area, offering affordable luxury with excellent amenities and a serene environment perfect for families.",
      features: [
        "24/7 Security",
        "Children's Park",
        "Jogging Track",
        "Community Hall",
        "Power Backup",
        "Parking Space",
        "Water Supply",
        "Maintenance Service"
      ],
      specifications: {
        "Total Area": "3 Acres",
        "Number of Units": "85",
        "Floors": "12",
        "Lift": "2 elevators",
        "Possession": "Ready to Move",
        "RERA Approved": "Yes"
      },
      nearby: [
        { name: "Alambagh Bus Stand", distance: "1 km" },
        { name: "Schools", distance: "2 km" },
        { name: "Shopping Complex", distance: "1.5 km" },
        { name: "Medical Center", distance: "2.5 km" }
      ],
      images: ["/images/prop3.png", "/images/luxury-residential-property-development.jpg"],
      virtualTour: "https://example.com/alambagh-tour",
      floorPlan: "/images/residential-floor-plan.png"
    }
  ];

  return properties.find(p => p.id === parseInt(id));
}

export default function PropertyDetailPage({ params }) {
  return <PropertyDetail propertyId={params.id} />;
}