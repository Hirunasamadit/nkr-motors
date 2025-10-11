"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchIcon, AlertCircleIcon, FileTextIcon } from "lucide-react";
import { Booking } from "@/lib/types";

interface TrackBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TrackBookingDialog({ open, onOpenChange }: TrackBookingDialogProps) {
  const [trackBookingRef, setTrackBookingRef] = useState("");
  const [trackedBooking, setTrackedBooking] = useState<Booking | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackError, setTrackError] = useState("");
  const supabase = createClient();

  const getSignedUrl = async (url: string): Promise<string | null> => {
    try {
      // Extract filename from URL
      const fileName = url.split('/').pop();
      if (!fileName) return null;

      const { data, error } = await supabase.storage
        .from('payment-receipts')
        .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days expiry

      if (error) {
        console.error('Error creating signed URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }
  };

  const handleTrackBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackBookingRef.trim()) {
      setTrackError("Please enter a booking reference");
      return;
    }

    setIsTracking(true);
    setTrackError("");
    setTrackedBooking(null);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_reference', trackBookingRef.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setTrackError("No booking found with this reference number");
        } else {
          setTrackError("Error fetching booking details");
        }
        return;
      }

      setTrackedBooking(data);
    } catch (error) {
      console.error('Error tracking booking:', error);
      setTrackError("An error occurred while tracking your booking");
    } finally {
      setIsTracking(false);
    }
  };


  const handleClose = () => {
    onOpenChange(false);
    setTrackBookingRef("");
    setTrackedBooking(null);
    setTrackError("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center text-2xl font-industrial text-white">
            <SearchIcon className="h-6 w-6 text-[var(--primary-300)] mr-4" />
            Track Your Booking
          </DialogTitle>
          <DialogDescription className="text-white/80 text-base leading-relaxed">
            Enter your booking reference number to view your booking status and details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <form onSubmit={handleTrackBooking} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-reference" className="text-white font-semibold text-sm uppercase tracking-wide">
                Booking Reference Number
              </Label>
              <Input
                id="booking-reference"
                type="text"
                placeholder="ENTER YOUR BOOKING REFERENCE"
                value={trackBookingRef}
                onChange={(e) => setTrackBookingRef(e.target.value)}
                className="w-full px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
              />
            </div>
            
            <Button
              type="submit"
              variant="filled"
              disabled={isTracking}
              className="w-full p-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isTracking ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <SearchIcon className="h-5 w-5 mr-3" />
                  Track Booking
                </div>
              )}
            </Button>
          </form>

          {trackError && (
            <div className="p-4 alert-red border backdrop-blur-sm">
              <div className="flex items-center">
                <AlertCircleIcon className="h-5 w-5 text-red-400 mr-3" />
                <span className="text-sm text-red-400 font-medium">
                  {trackError}
                </span>
              </div>
            </div>
          )}

          {trackedBooking && (
            <div className="space-y-6">
              <div className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-300)] to-[var(--primary-500)]"></div>
                  <h3 className="text-xl font-semibold text-white">Booking Details</h3>
                </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Booking Reference</Label>
                      <p className="text-sm text-white font-mono">{trackedBooking.booking_reference}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Created At</Label>
                      <p className="text-sm text-white">{new Date(trackedBooking.created_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Customer</Label>
                      <p className="text-sm text-white">{trackedBooking.full_name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Contact</Label>
                      <p className="text-sm text-white">{trackedBooking.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Phone</Label>
                      <p className="text-sm text-white">{trackedBooking.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Service</Label>
                      <p className="text-sm text-white">{trackedBooking.service_type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Date & Time</Label>
                      <p className="text-sm text-white">
                        {new Date(trackedBooking.preferred_date).toLocaleDateString()} at {trackedBooking.preferred_time}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Status</Label>
                      <div className="mt-1"><StatusBadge status={trackedBooking.status} /></div>
                    </div>
                  </div>

                {trackedBooking.vehicle_make && (
                  <div className="mb-4">
                    <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Vehicle</Label>
                    <p className="text-sm text-white">
                      {trackedBooking.vehicle_make} {trackedBooking.vehicle_model} ({trackedBooking.vehicle_year})
                    </p>
                  </div>
                )}

                {trackedBooking.payment_receipt_url && (
                  <div className="mb-4">
                    <div className="mt-2">
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={async () => {
                          const signedUrl = await getSignedUrl(trackedBooking.payment_receipt_url!);
                          if (signedUrl) {
                            window.open(signedUrl, '_blank');
                          }
                        }}
                        className="text-sm"
                      >
                        <FileTextIcon className="mr-2" />
                        View Receipt
                      </Button>
                    </div>
                  </div>
                )}

                {trackedBooking.admin_notes && (
                  <div>
                    <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Admin Notes</Label>
                    <p className="text-sm text-white/90 mt-1 p-3 bg-white/5 border border-white/10">
                      {trackedBooking.admin_notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
