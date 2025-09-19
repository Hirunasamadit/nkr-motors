import { CarouselSlide } from './types';
import { RiOilFill } from "react-icons/ri";
import { GiFlatTire } from "react-icons/gi";
import { FaCarBattery } from "react-icons/fa";
import { PiEngineFill } from "react-icons/pi";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { GiGearStick } from "react-icons/gi";
import { GiAutoRepair } from "react-icons/gi";
import { GiSteeringWheel } from "react-icons/gi";
import { LuAirVent } from "react-icons/lu";
import { MdElectricCar } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { CgSoftwareDownload } from "react-icons/cg";
import { FaCloudSunRain } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaClock } from "react-icons/fa6";
import { BiSolidDonateHeart } from "react-icons/bi";

// Brand Constants
export const BRAND = {
  NAME: 'NKR MOTORS',
  TAGLINE: 'Professional Auto Service',
  DESCRIPTION: 'Professional auto service, repair, and maintenance at NKR Motors. Expert technicians, quality service, and competitive pricing for all your automotive and electric vehicle needs.',
  COPYRIGHT_YEAR: new Date().getFullYear(),
  CONTACT: {
    PHONE: '+94 11 229 4142',
    PHONE_LINK: 'tel:+94112294142',
    EMAIL: 'info@nkr.lk',
    ADDRESS: {
      LINE_1: '459/D, Horampella, Mahagama',
      LINE_2: 'Minuwangoda, Sri Lanka',
    },
    GOOGLE_MAPS: {
      EMBED_URL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4115.4295507009065!2d79.97273869863203!3d7.178860428379338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e519272c5899%3A0x8e7b95fe0794e0ce!2sNKR%20Motors!5e0!3m2!1sen!2slk!4v1758131100133!5m2!1sen!2slk',
    },
    HOURS: {
      DAYS: 'Every Day',
      TIMES: '8:30 AM - 5:30 PM',
      TIME_SLOTS: [
        '8:30 AM',
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
      ],
    },
  },
  SOCIAL: {
    FACEBOOK: 'https://www.facebook.com/p/NKR-Motors-100064323234436/',
  },
} as const;

export const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "EXPLORE OUR SERVICES",
    subtitle: "Complete Auto Care",
    description:
      "Discover our full range of automotive services from oil changes to engine repairs. We offer 12+ specialized services with expert technicians and quality parts. See what we can do for your vehicle.",
    buttonText: "VIEW SERVICES",
    buttonAction: "scrollToServices",
    highlightWords: ["EXPLORE", "SERVICES"],
  },
  {
    id: 2,
    title: "BOOK YOUR APPOINTMENT",
    subtitle: "Schedule Today",
    description:
      "Ready to get your car serviced? Book an appointment with our certified technicians. We offer convenient scheduling and will have your vehicle ready when you need it. Get started now!",
    buttonText: "BOOK APPOINTMENT",
    buttonAction: "scrollToContact",
    highlightWords: ["BOOK", "APPOINTMENT"],
  },
  {
    id: 3,
    title: "NEED IMMEDIATE HELP?",
    subtitle: "Call Us Now",
    description:
      "Car trouble can't wait? Our emergency service team is standing by. Call us directly for urgent repairs, roadside assistance, or immediate consultation. We're here when you need us most.",
    buttonText: "CALL NOW",
    buttonAction: "callPhone",
    highlightWords: ["NEED", "HELP?"],
  },
  {
    id: 4,
    title: "FIND THE RIGHT SERVICE",
    subtitle: "Expert Solutions",
    description:
      "Not sure what your car needs? Browse our comprehensive service menu to find the perfect solution. From basic maintenance to complex repairs, we have the expertise you need.",
    buttonText: "VIEW SERVICES",
    buttonAction: "scrollToServices",
    highlightWords: ["FIND", "SERVICE"],
  },
  {
    id: 5,
    title: "ABOUT NKR MOTORS",
    subtitle: "Your Trusted Partner",
    description:
      "Learn more about our 15+ years of experience, certified technicians, and commitment to quality service. Discover why thousands of customers trust us with their vehicles.",
    buttonText: "LEARN MORE",
    buttonAction: "scrollToAbout",
    highlightWords: ["ABOUT", "MOTORS"],
  },
];

export const statisticsData = [
  {
    value: "99",
    suffix: "%",
    title: "First-Time Fix Rate",
    description: "Get it right the first time with our expert diagnostics and repair",
  },
  {
    value: "2",
    suffix: "hr",
    title: "Average Repair Time",
    description: "Fast and efficient repairs to get you back on the road quickly",
  },
  {
    value: "100",
    suffix: "%",
    title: "OEM Parts",
    description: "Only genuine manufacturer parts for optimal performance and reliability",
  },
  {
    value: "0",
    suffix: "*",
    title: "Diagnostic Fee",
    description: "Free diagnostic service when you choose us for your repairs",
  },
];

export const servicesData = [
  // Basic Maintenance Services (Most Common)
  {
    icon: <RiOilFill className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "OIL CHANGE SERVICE",
    description: "Regular oil changes are essential for engine longevity. We provide quick, professional oil change services using high-quality oils and filters.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <GiFlatTire className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "TIRE REPAIR",
    description: "You need new tires, and you have questions. What type of tire do you really need? We help you choose the right tires and provide expert installation.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <FaCarBattery className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "BATTERY REPAIR",
    description: "Your vehicle just won't start? We provide battery testing, replacement, and starting system repair to get you back on the road quickly.",
    buttonText: "BOOK NOW",
  },

  // Engine & Power Systems
  {
    icon: <PiEngineFill className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "ENGINE REPAIR",
    description: "When your check engine light comes on, we can quickly find and fix the problem. Our expert mechanics handle all engine issues to keep your car running smoothly.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <FaTemperatureThreeQuarters className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "COOLING SYSTEM",
    description: "Keep your engine cool and prevent breakdowns. We fix radiator problems, replace coolant, and ensure your car doesn't overheat in Sri Lanka's hot weather.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <GiGearStick className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "TRANSMISSION SERVICE",
    description: "Keep your car shifting smoothly. We service and repair both manual and automatic gearboxes to ensure smooth gear changes and better fuel efficiency.",
    buttonText: "BOOK NOW",
  },

  // Safety & Control Systems
  {
    icon: <GiAutoRepair className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "BRAKE REPAIR",
    description: "Keep your family safe with reliable brakes. We replace worn brake pads and discs, and fix any brake problems to ensure your car stops safely every time.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <GiSteeringWheel className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "STEERING REPAIR",
    description: "Keep your car driving straight and smooth. We fix steering problems and suspension issues to ensure comfortable, safe driving on Sri Lankan roads.",
    buttonText: "BOOK NOW",
  },

  // Comfort & Climate
  {
    icon: <LuAirVent className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "AC & HEATING SERVICE",
    description: "Stay cool in Sri Lanka's heat with working air conditioning. We fix AC problems, recharge refrigerant, and ensure your car stays comfortable year-round.",
    buttonText: "BOOK NOW",
  },

  // Specialized EV Services (Grouped Together)
  {
    icon: <MdElectricCar className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "EV BATTERY SERVICE",
    description: "Keep your electric car running at its best. We check battery health, fix charging issues, and ensure your EV battery lasts longer and performs better.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <MdElectricBolt className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "EV MOTOR REPAIR",
    description: "Fix electric car motor problems safely. Our trained technicians handle electric vehicle motors and charging systems to keep your EV running smoothly.",
    buttonText: "BOOK NOW",
  },
  {
    icon: <CgSoftwareDownload className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "EV SOFTWARE UPDATES",
    description: "Keep your electric car's computer systems up to date. We install software updates that improve performance, fix bugs, and add new features to your EV.",
    buttonText: "BOOK NOW",
  },
];

export const aboutCardsData = [
  {
    icon: <AiFillSafetyCertificate className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "Certified Technicians",
    description: "Our team consists of certified mechanics with extensive training and experience in all aspects of car repair and maintenance.",
    iconThemeClass: "theme-bg-component-1",
  },
  {
    icon: <FaClock className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "15+ Years Experience",
    description: "Since 2009, we've been serving the community with honest, reliable auto service. We've grown from a small shop to a full-service automotive center.",
    iconThemeClass: "theme-bg-component-2",
  },
  {
    icon: <BiSolidDonateHeart className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    title: "Customer First",
    description: "Your satisfaction is our priority. We provide transparent pricing, honest recommendations, and stand behind our work with comprehensive warranties.",
    iconThemeClass: "theme-bg-component-3",
  },
];

export const whyChooseUsData = [
  "Modern car diagnostic equipment",
  "Genuine manufacturer and quality replacement parts",
  "Competitive pricing and fair estimates",
  "Convenient online appointment booking",
  "Comprehensive warranty on all services",
];

export const stepsData = [
  {
    title: "MAKE AN APPOINTMENT",
    description: `${BRAND.NAME} has made it easy to schedule an appointment online at a location near you in a few simple steps.`,
  },
  {
    title: "SELECT SERVICE",
    description: "We specialize in car services and have more than 12 years of experience. We are car experts from day one.",
  },
  {
    title: "CONFIRM REQUEST",
    description: "Has your request been confirmed? We reduce no-shows, save time, and focus on serving clients.",
  },
  {
    title: "GET YOUR CAR",
    description: "It is a vehicle inspection that keeps your car in a reliable, safe and fully-functioning condition.",
  },
];

export const testimonialsData = [
  {
    stars: 5,
    quote: `Excellent service! ${BRAND.NAME} fixed my brake issue quickly and professionally. The staff was friendly and the pricing was fair. Highly recommended!`,
    name: "John Smith",
    role: "Regular Customer",
    avatarInitials: "JS",
  },
  {
    stars: 5,
    quote: `I've been bringing my cars to ${BRAND.NAME} for years. They always provide honest service and never try to upsell unnecessary repairs. Trustworthy and reliable!`,
    name: "Maria Johnson",
    role: "Loyal Customer",
    avatarInitials: "MJ",
  },
  {
    stars: 5,
    quote: "Fast, efficient, and professional. They diagnosed my engine problem accurately and fixed it the same day. Great customer service and fair pricing!",
    name: "Robert Brown",
    role: "New Customer",
    avatarInitials: "RB",
  },
];

export const tipsData = [
  {
    icon: <FaCarBattery className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "BATTERY",
    title: "Battery Check",
    description: "Dim lights and slow engine start? Your battery may need replacement.",
  },
  {
    icon: <GiFlatTire className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "TIRES",
    title: "Tire Rotation",
    description: "Rotate tires every 6,000 km for even wear and better performance.",
  },
  {
    icon: <FaCloudSunRain className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "SEASONAL",
    title: "Monsoon Prep",
    description: "Check wiper blades, tire tread depth, and drainage before rainy season.",
  },
  {
    icon: <PiEngineFill className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "ENGINE",
    title: "Oil Change",
    description: "Change oil every 5,000-7,000 km to keep your engine running smoothly.",
  },
  {
    icon: <GiFlatTire className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "TIRES",
    title: "Tire Pressure",
    description: "Check tire pressure monthly. Underinflated tires reduce fuel efficiency.",
  },
  {
    icon: <GiAutoRepair className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "BRAKES",
    title: "Brake Inspection",
    description: "Squeaking or grinding sounds? Get your brakes checked immediately.",
  },
  {
    icon: <FaTemperatureThreeQuarters className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "COOLING",
    title: "Cooling System",
    description: "Check radiator and coolant levels regularly in Sri Lanka's hot climate.",
  },
  {
    icon: <MdElectricBolt className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "LIGHTS",
    title: "Light Check",
    description: "Test all lights monthly. Replace burned-out bulbs for safety.",
  },
  {
    icon: <PiEngineFill className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "ENGINE",
    title: "Air Filter",
    description: "Replace air filter every 10,000-15,000 km for better engine performance.",
  },
  {
    icon: <LuAirVent className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "AC",
    title: "Cabin Filter",
    description: "Replace cabin filter yearly to keep your AC airflow clean and strong.",
  },
  {
    icon: <GiSteeringWheel className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "STEERING",
    title: "Wheel Alignment",
    description: "Misaligned wheels cause uneven tire wear. Check alignment every 10,000 km.",
  },
  {
    icon: <RiOilFill className="w-8 h-8 text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-in-out" />,
    category: "MAINTENANCE",
    title: "Fluid Top-Up",
    description: "Check engine oil, coolant, brake and washer fluids monthly for safe driving.",
  },
];