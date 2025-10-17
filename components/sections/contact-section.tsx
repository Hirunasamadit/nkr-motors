"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/ui/section-header";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BRAND, servicesData } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { UploadIcon, CheckCircleIcon, AlertCircleIcon, SearchIcon } from "lucide-react";
import { ContactInfoItem } from "@/components/cards/contact-info-item";
import { AnimatedContent, StaggeredContainer, StaggeredItem } from "@/lib/animations";
import { createClient } from "@/lib/supabase/client";
import { sendBookingNotification } from "@/lib/email-notifications";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrackBookingDialog } from "@/components/dialogs/track-booking-dialog";

const bookingSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service_type: z.string().min(1, "Please select a service type"),
  preferred_date: z.string().min(1, "Please select a preferred date"),
  preferred_time: z.string().min(1, "Please select a preferred time"),
  vehicle_make: z.string().optional(),
  vehicle_model: z.string().optional(),
  vehicle_year: z.string().optional(),
  additional_notes: z.string().optional(),
});

export function ContactSection() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  
  // Track booking dialog state
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const serviceTitles = useMemo(
    () => new Set(servicesData.map((s) => s.title)),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      service_type: "",
      preferred_date: "",
      preferred_time: "",
      vehicle_make: "",
      vehicle_model: "",
      vehicle_year: "",
      additional_notes: "",
    }
  });

  const supabase = createClient();

  useEffect(() => {
    const fromQuery = searchParams.get("service") || undefined;
    if (fromQuery && serviceTitles.has(fromQuery)) {
      setSelectedService(fromQuery);
      setValue("service_type", fromQuery);
      // Clear the URL parameter after preselection
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("service");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, [searchParams, serviceTitles, setValue]);

  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data, error: urlError } = await supabase.storage
        .from('payment-receipts')
        .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days expiry

      if (urlError) {
        throw urlError;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    setIsSubmitting(true);

    try {
      // Upload payment receipt first
      let receiptUrl: string | null = null;
      if (paymentReceipt) {
        receiptUrl = await handleFileUpload(paymentReceipt);
        if (!receiptUrl) {
          throw new Error("Failed to upload payment receipt");
        }
      }

      // Create booking 
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          service_type: data.service_type,
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          vehicle_make: data.vehicle_make,
          vehicle_model: data.vehicle_model,
          vehicle_year: data.vehicle_year,
          additional_notes: data.additional_notes,
          payment_receipt_url: receiptUrl,
          payment_amount: 1000.00,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Create notification record
      await supabase
        .from('booking_notifications')
        .insert({
          booking_id: booking.id,
          notification_type: 'confirmation',
          email_sent: false
        });

      // Send confirmation email
      await sendBookingNotification(booking.id, 'confirmation');

      // Store booking reference for display
      setBookingReference(booking.booking_reference);

      // Reset form
      reset();
      setPaymentReceipt(null);
      setShowSuccessDialog(true);

    } catch (error: unknown) {
      console.error('Booking error:', error);
      
      // Provide specific error messages
      let errorMsg = "An error occurred while creating your booking";
      
      if (error instanceof Error && error.message) {
        if (error.message.includes('infinite recursion')) {
          errorMsg = "Database configuration error. Please try again later.";
        } else if (error.message.includes('foreign key')) {
          errorMsg = "Database constraint error. Please try again.";
        } else if (error.message.includes('permission')) {
          errorMsg = "Permission denied. Please check your input and try again.";
        } else {
          errorMsg = error.message;
        }
      }
      
      setErrorMessage(errorMsg);
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
    if (date) {
      setValue("preferred_date", date.toISOString().split('T')[0]);
    }
  };

  const handleTimeSelect = (time: string) => {
    setValue("preferred_time", time);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Please upload a valid image (JPEG, PNG) or PDF file");
        setShowErrorDialog(true);
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB");
        setShowErrorDialog(true);
        return;
      }

      setPaymentReceipt(file);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 theme-bg-hero relative overflow-hidden"
    >
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="absolute top-0 left-0 w-full h-1 theme-bg-component-1"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent delay={0.2}>
          <SectionHeader
            badge="CONTACT US"
            title="Request an"
            titleAccent="Appointment"
            description="Request an appointment online. After you submit the form, a representative will call you back with the information you'll need to make an appointment."
            gradientClass="theme-text-gradient-accent"
          />
        </AnimatedContent>

        <div className="w-full space-y-6">
          <AnimatedContent delay={0.4} direction="left" className="relative flex">
            <div id="booking-form" className="bg-white/10 backdrop-blur-md p-8 theme-shadow-card border border-white/20 w-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-industrial text-white">
                  Book Your Service
                </h3>
                <Button
                  variant="outlined"
                  onClick={() => setShowTrackDialog(true)}
                  className="p-6"
                >
                  <div className="flex items-center space-x-2">
                    <SearchIcon className="h-6 w-6" />
                    <span>Track Booking</span>
                  </div>
                </Button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-300)] to-[var(--primary-500)] rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                      </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Input
                              {...register("full_name")}
                              type="text"
                              placeholder="YOUR NAME"
                              className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                            />
                            {errors.full_name && (
                              <p className="text-sm text-red-400 mt-1">
                                {errors.full_name.message}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Input
                                {...register("email")}
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                              />
                              {errors.email && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Input
                                {...register("phone")}
                                type="tel"
                                placeholder="YOUR PHONE"
                                className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                              />
                              {errors.phone && (
                                <p className="text-sm text-red-400 mt-1">
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                    </div>

                    {/* Appointment Details Section */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-300)] to-[var(--primary-500)] rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">Appointment Details</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Select value={selectedService || ""} onValueChange={(value) => {
                            setSelectedService(value);
                            setValue("service_type", value);
                          }}>
                            <SelectTrigger className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]">
                              <SelectValue placeholder="SELECT SERVICE" />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--dark-800)] border-[var(--dark-600)]">
                              {servicesData.map((service) => (
                                <SelectItem
                                  key={service.title}
                                  value={service.title}
                                  className="text-white hover:bg-[var(--dark-700)] focus:bg-[var(--primary-600)]"
                                >
                                  {service.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.service_type && (
                            <p className="text-sm text-red-400 mt-1">
                              {errors.service_type.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Date Picker */}
                            <div className="flex-1 space-y-2">
                              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date-picker"
                                    className="w-full justify-between font-normal px-6 py-6 theme-input group"
                                  >
                                    <span className={selectedDate ? "pl-3 text-white" : "pl-3 text-[var(--dark-400)] group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out"}>
                                      {selectedDate ? selectedDate.toLocaleDateString() : "SELECT DATE"}
                                    </span>
                                    <ChevronDownIcon className="mr-3 opacity-30" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0 bg-[var(--dark-800)] border-[var(--dark-600)]" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    captionLayout="dropdown"
                                    onSelect={handleDateSelect}
                                    className="bg-[var(--dark-800)] text-white"
                                  />
                                </PopoverContent>
                              </Popover>
                              {errors.preferred_date && (
                                <p className="text-sm text-red-400">
                                  {errors.preferred_date.message}
                                </p>
                              )}
                            </div>
                            
                            {/* Time Selector */}
                            <div className="flex-1 space-y-2">
                              <Select value={watch("preferred_time") || ""} onValueChange={handleTimeSelect}>
                                <SelectTrigger className="w-full px-6 py-6 theme-input">
                                  <SelectValue placeholder="SELECT TIME" />
                                </SelectTrigger>
                                <SelectContent className="bg-[var(--dark-800)] border-[var(--dark-600)]">
                                  {BRAND.CONTACT.HOURS.TIME_SLOTS.map((time) => (
                                    <SelectItem
                                      key={time}
                                      value={time}
                                      className="text-white hover:bg-[var(--dark-700)]"
                                    >
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.preferred_time && (
                                <p className="text-sm text-red-400">
                                  {errors.preferred_time.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-300)] to-[var(--primary-500)] rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">Vehicle Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Input
                            {...register("vehicle_make")}
                            type="text"
                            placeholder="BRAND"
                            className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            {...register("vehicle_model")}
                            type="text"
                            placeholder="MODEL"
                            className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            {...register("vehicle_year")}
                            type="text"
                            placeholder="YEAR"
                            className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button - Left Column (Desktop) */}
                    <div className="hidden lg:block">
                      <Button 
                        variant="filled" 
                        type="submit" 
                        className="w-full p-6 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            <span>Creating Booking...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            BOOK SERVICE
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col h-full space-y-8">
                    {/* Payment & Additional Information Section */}
                    <div className="flex flex-col h-full space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-300)] to-[var(--primary-500)] rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">Payment & Additional Information</h3>
                      </div>
                      
                      {/* Bank Account Details */}
                      <div className="p-6 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm">
                        <p className="text-sm text-white/80 font-medium mb-4">
                          Bank Account Details
                        </p>
                        <div className="text-sm text-white/70 space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium">Account Name:</span>
                            <span>K.A.D.N.S.KUMARAPELI</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Account Number:</span>
                            <span className="font-mono">094010020059</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Bank:</span>
                            <span>HNB, MINUWANGODA</span>
                          </div>
                          <div className="flex justify-between border-t border-white/20 pt-3">
                            <span className="font-medium">Amount:</span>
                            <span className="text-[var(--primary-300)] font-bold">LKR 1,000.00</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-all duration-300 hover:bg-white/5">
                        <Label htmlFor="payment_receipt" className="cursor-pointer block group">
                          <UploadIcon className="mx-auto h-12 w-12 text-white/70 mb-4 group-hover:text-white/90 transition-colors duration-300" />
                          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 mb-2">
                            Click here to upload a photo or PDF of your payment receipt
                          </p>
                          <Input
                            id="payment_receipt"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </Label>
                        
                        {paymentReceipt && (
                          <div className="mt-4 p-4 alert-green border rounded-lg backdrop-blur-sm">
                            <div className="flex items-center justify-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                              <span className="text-sm icon-text-green font-medium">
                                {paymentReceipt.name} selected
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Additional Notes - Flex to fill remaining space */}
                      <div className="flex-1 flex flex-col">
                        <Textarea
                          {...register("additional_notes")}
                          placeholder="ADDITIONAL NOTES (Optional)"
                          className="flex-1 w-full px-6 py-6 resize-none theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                        />
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 {/* Submit Button - Mobile */}
                 <div className="pt-6 lg:hidden">
                   <Button 
                     variant="filled" 
                     type="submit" 
                     className="w-full p-6 disabled:opacity-70 disabled:cursor-not-allowed"
                     disabled={isSubmitting}
                   >
                     {isSubmitting ? (
                       <div className="flex items-center justify-center">
                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                         <span>Creating Booking...</span>
                       </div>
                     ) : (
                       <div className="flex items-center justify-center">
                         BOOK SERVICE
                       </div>
                     )}
                   </Button>
                 </div>
               </form>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.6} direction="right" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information Card */}
            <div className="p-8 bg-white/10 border border-white/20 backdrop-blur-md theme-shadow-card flex flex-col">
              <h3 className="mb-6 text-3xl font-industrial text-white">
                Contact Information
              </h3>
              <StaggeredContainer className="flex flex-col space-y-6" staggerDelay={0.1}>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<FaPhone className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.PHONE}
                    secondaryText="Call us anytime"
                    iconThemeClass="theme-bg-component-1"
                    href={BRAND.CONTACT.PHONE_LINK}
                  />
                </StaggeredItem>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<MdEmail className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.EMAIL}
                    secondaryText="Email us"
                    iconThemeClass="theme-bg-component-2"
                    href={`mailto:${BRAND.CONTACT.EMAIL}`}
                  />
                </StaggeredItem>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<FaLocationDot className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.ADDRESS.LINE_1}
                    secondaryText={BRAND.CONTACT.ADDRESS.LINE_2}
                    iconThemeClass="theme-bg-component-3"
                  />
                </StaggeredItem>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<FaClock className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.HOURS.DAYS}
                    secondaryText={BRAND.CONTACT.HOURS.TIMES}
                    iconThemeClass="theme-bg-component-4"
                  />
                </StaggeredItem>
              </StaggeredContainer>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md theme-shadow-card overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <h3 className="text-2xl font-industrial text-white mb-2">
                  Find Us
                </h3>
                <p className="text-sm text-[var(--dark-400)]">
                  Visit our location at {BRAND.CONTACT.ADDRESS.LINE_2}
                </p>
              </div>
              <div className="relative w-full h-64">
                <iframe
                  src={BRAND.CONTACT.GOOGLE_MAPS.EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-lg bg-white/20 backdrop-blur-md border border-white/20 theme-shadow-card">
          <DialogHeader className="space-y-4">
            <DialogTitle className="flex items-center text-2xl font-industrial text-white">
              <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4" />
              Booking Request Submitted
            </DialogTitle>
            <DialogDescription className="text-white/80 text-base leading-relaxed">
              Your booking request has been submitted successfully! We will review your payment receipt and contact you within 24 hours to confirm your appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-300)] to-[var(--primary-500)]"></div>
                <h4 className="text-lg font-semibold text-white">Booking Reference</h4>
              </div>
              <div className="text-lg font-mono text-[var(--primary-300)] bg-black/20 p-4 border border-white/10 text-center">
                {bookingReference}
              </div>
            </div>
            <p className="text-sm text-white/60">
              Please save this reference number for tracking your booking.
            </p>
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              variant="filled"
              className="w-full p-6"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-lg bg-white/10 backdrop-blur-md border border-white/10 theme-shadow-card">
          <DialogHeader className="space-y-4">
            <DialogTitle className="flex items-center text-2xl font-industrial text-white">
              <AlertCircleIcon className="h-6 w-6 text-red-400 mr-4" />
              Booking Error
            </DialogTitle>
            <DialogDescription className="text-white/80 text-base leading-relaxed">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button 
              onClick={() => setShowErrorDialog(false)}
              variant="filled"
              className="w-full p-6"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Track Booking Dialog */}
      <TrackBookingDialog 
        open={showTrackDialog} 
        onOpenChange={setShowTrackDialog} 
      />
    </section>
  );
}
