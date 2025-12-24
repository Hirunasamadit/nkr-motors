import { Metadata } from "next";
import { BRAND } from "./constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nkr.lk";
const siteName = BRAND.NAME;
const defaultTitle = `${BRAND.NAME} - Professional Auto Service & Repair`;
const defaultDescription = BRAND.DESCRIPTION;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${BRAND.NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "auto service",
    "car repair",
    "automotive repair",
    "car maintenance",
    "NKR Motors",
    "Sri Lanka auto service",
    "vehicle repair",
    "car service center",
    "auto mechanic",
    "car diagnostics",
    "oil change",
    "tire repair",
    "battery replacement",
    "engine repair",
    "brake service",
    "AC repair",
    "electric vehicle service",
    "EV repair",
    "Nissan Leaf service",
    "Minuwangoda auto service",
    "Mahagama car repair",
  ],
  authors: [{ name: BRAND.NAME }],
  creator: BRAND.NAME,
  publisher: BRAND.NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: baseUrl,
    siteName: siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${baseUrl}/logo.jpeg`,
        width: 1200,
        height: 630,
        alt: `${BRAND.NAME} - Professional Auto Service`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${baseUrl}/logo.jpeg`],
    creator: "@nkr_motors",
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
    google: "qWcrHVl32IgpGkJ7qngGiEoV-RO6MhPtj0EDmZsS4Gw",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Automotive Services",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BRAND.NAME,
  },
};

export const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutomotiveRepair"],
    name: BRAND.NAME,
    description: BRAND.DESCRIPTION,
    url: baseUrl,
    logo: `${baseUrl}/logo.jpeg`,
    image: `${baseUrl}/logo.jpeg`,
    telephone: BRAND.CONTACT.PHONE,
    email: BRAND.CONTACT.EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.CONTACT.ADDRESS.LINE_1,
      addressLocality: BRAND.CONTACT.ADDRESS.LINE_2.split(",")[0].trim(),
      addressRegion: "Western Province",
      addressCountry: "LK",
      postalCode: "11550",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.178860428379338",
      longitude: "79.97273869863203",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:30",
        closes: "17:30",
      },
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    currenciesAccepted: "LKR",
    areaServed: [
      {
        "@type": "City",
        name: "Minuwangoda",
      },
      {
        "@type": "City",
        name: "Mahagama",
      },
      {
        "@type": "State",
        name: "Western Province",
      },
      {
        "@type": "Country",
        name: "Sri Lanka",
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Oil Change",
          serviceType: "Oil Change",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tire Repair",
          serviceType: "Tire Repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Battery Replacement",
          serviceType: "Battery Replacement",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Engine Repair",
          serviceType: "Engine Repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transmission Service",
          serviceType: "Transmission Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brake Repair",
          serviceType: "Brake Repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Steering Repair",
          serviceType: "Steering Repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AC & Heating Service",
          serviceType: "AC & Heating Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EV Battery Service",
          serviceType: "EV Battery Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EV Motor Repair",
          serviceType: "EV Motor Repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EV Software Updates",
          serviceType: "EV Software Updates",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cooling System",
          serviceType: "Cooling System",
        },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "VN Seneviratne",
        },
        datePublished: "2024-01-01",
        reviewBody:
          "The best place to get your Nissan leaf fixed. I had an issue with current leaking to body due to a defective battery. I had a range of 40 km and he fixed them with no time. Now my vehicle runs more than 100 km to Kandy. With my short interaction I realised that Nalaka is a man with few words but a very reliable person. I highly recommend his expert advice.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Udesh Niranga",
        },
        datePublished: "2024-01-01",
        reviewBody:
          "Really satisfied with the work they did. They reset my Nissan leaf battery. It was running only 35 km for a full charge. After reset it can run close to 90km. This is not what is shown in dashboard. This is actual distance.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ishara Rupasingha",
        },
        datePublished: "2024-01-01",
        reviewBody:
          "Great place to have your Nissan LEAF inspected or repaired. They have more experience than others as they are doing only leaf cars. Owner is very helpful.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    sameAs: [BRAND.SOCIAL.FACEBOOK],
  };
};

export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does NKR Motors offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NKR Motors offers comprehensive auto services including oil changes, tire repair, battery replacement, engine repair, transmission service, brake repair, steering repair, AC & heating service, cooling system maintenance, and specialized EV services including EV battery service, EV motor repair, and EV software updates.",
        },
      },
      {
        "@type": "Question",
        name: "Do you service electric vehicles like Nissan Leaf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we specialize in electric vehicle services, particularly Nissan Leaf. We offer EV battery service, EV motor repair, and EV software updates. Our technicians have extensive experience with electric vehicles.",
        },
      },
      {
        "@type": "Question",
        name: "What are your operating hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are open every day from 8:30 AM to 5:30 PM, including weekends.",
        },
      },
      {
        "@type": "Question",
        name: "Where is NKR Motors located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are located at 459/D, Horampella, Mahagama, Minuwangoda, Sri Lanka. We serve customers in Minuwangoda, Mahagama, and surrounding areas in the Western Province.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book an appointment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book an appointment online through our website by filling out the contact form, or call us directly at +94 11 229 4142. We offer convenient online scheduling for all services.",
        },
      },
      {
        "@type": "Question",
        name: "Do you use genuine parts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we use 100% OEM (Original Equipment Manufacturer) parts and genuine manufacturer parts to ensure optimal performance and reliability for your vehicle.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods do you accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept cash, credit cards, and debit cards. Payment is accepted in Sri Lankan Rupees (LKR).",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer warranties on your services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide comprehensive warranties on all our services. We stand behind our work and ensure customer satisfaction with our quality service guarantee.",
        },
      },
    ],
  };
};

export const generateBreadcrumbStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  };
};

export const generateAllStructuredData = () => {
  return [
    generateStructuredData(),
    generateFAQStructuredData(),
    generateBreadcrumbStructuredData(),
  ];
};

