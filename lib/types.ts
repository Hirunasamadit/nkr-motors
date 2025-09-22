// Component Props Interfaces
export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  index: number;
  onClick?: () => void;
}

export interface TestimonialCardProps {
  stars: number;
  quote: string;
  name: string;
  role: string;
  photoUrl: string;
  index: number;
}

export interface TipCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  index: number;
}

export interface StepCardProps {
  title: string;
  description: string;
  stepNumber: number;
}

// Data Interfaces
export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonAction: string;
  highlightWords: string[];
}

export interface HeroCarouselProps {
  slides: CarouselSlide[];
}
