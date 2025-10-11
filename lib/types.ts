import { ReactNode } from "react";

export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

export interface StatsCardProps {
  icon: ReactNode;
  number: string;
  label: string;
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface TipCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface WhyChooseUsItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ContactInfoItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
}

export interface AboutCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  stepNumber: number;
}

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  highlightWords: string[];
  buttonText: string;
  buttonAction: string;
}

export interface HeroCarouselProps {
  slides: CarouselSlide[];
}

// Booking system types
export interface Booking {
  id: string;
  booking_reference: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  additional_notes?: string;
  payment_receipt_url?: string;
  payment_amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  approved_at?: string;
}

export interface BookingFormData {
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  additional_notes?: string;
  payment_receipt: File | null;
}

export interface BookingNotification {
  id: string;
  booking_id: string;
  notification_type: 'confirmation' | 'approval' | 'rejection' | 'reminder';
  sent_at: string;
  email_sent: boolean;
  email_content?: string;
}