"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NavigationLogo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  CarIcon, 
  PhoneIcon, 
  MailIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  FileTextIcon,
  LogOutIcon,
  RefreshCwIcon
} from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import { PageTransition } from "@/lib/animations";
import { Booking } from "@/lib/types";
import { sendBookingNotification } from "@/lib/email-notifications";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [adminNotes, setAdminNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);


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

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/admin/signin');
      return;
    }

    setIsAuthenticated(true);
    fetchBookings();
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/signin');
  };

  const handleBookingAction = async () => {
    if (!selectedBooking) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          status: actionType === 'approve' ? 'approved' : 'rejected',
          admin_notes: adminNotes,
          approved_at: new Date().toISOString()
        })
        .eq('id', selectedBooking.id);

      if (error) {
        console.error('Error updating booking:', error);
        return;
      }

      // Create notification record
      await supabase
        .from('booking_notifications')
        .insert({
          booking_id: selectedBooking.id,
          notification_type: actionType === 'approve' ? 'approval' : 'rejection',
          email_sent: false
        });

      // Send approval/rejection email
      await sendBookingNotification(
        selectedBooking.id, 
        actionType === 'approve' ? 'approval' : 'rejection'
      );

      // Refresh bookings
      await fetchBookings();
      
      setShowActionDialog(false);
      setShowDetailsDialog(false);
      setAdminNotes("");
    } catch (error) {
      console.error('Error processing booking:', error);
    } finally {
      setIsProcessing(false);
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--background)]">
        {/* Navigation Header */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed z-50 w-full border-b bg-[var(--dark-900)] border-[var(--primary-20)] backdrop-blur-xl shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-24">
              <NavigationLogo href="/" />
              
              {/* Desktop Title - Hidden on mobile */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                <div className="text-center">
                  <h1 className="text-2xl font-industrial text-white">Admin Dashboard</h1>
                  <p className="text-white/80 text-sm">Manage booking requests</p>
                </div>
              </div>

              {/* Desktop Actions - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-4 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchBookings}
                  disabled={isLoading}
                  className="p-3"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="p-3"
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden ml-auto">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="group relative p-3 text-white bg-transparent shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300 ease-out"
                    >
                      <FiMenu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[320px] sm:w-[380px] bg-[var(--dark-900)] border-l border-[var(--dark-700)] p-0"
                  >
                    <SheetTitle className="sr-only">Admin Menu</SheetTitle>
                    
                    {/* Mobile Menu Header */}
                    <div className="sticky top-0 z-10 bg-[var(--dark-900)] border-b border-[var(--dark-700)] h-24 px-4 sm:px-6">
                      <div className="flex items-center justify-between h-full">
                        <div>
                          <h2 className="text-lg font-industrial text-white">Admin Dashboard</h2>
                          <p className="text-white/80 text-sm">Manage booking requests</p>
                        </div>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="group relative p-3 text-white bg-transparent shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300 ease-out"
                          >
                            <FiX className="h-6 w-6" />
                          </Button>
                        </SheetTrigger>
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex-1 px-4 py-6">
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            fetchBookings();
                          }}
                          disabled={isLoading}
                          className="w-full p-4"
                        >
                          <RefreshCwIcon className="h-4 w-4 mr-2" />
                          Refresh Bookings
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleSignOut();
                          }}
                          className="w-full p-4"
                        >
                          <LogOutIcon className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content with proper spacing for fixed nav */}
        <div className="pt-24">

          {/* Stats */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 icon-container-yellow border">
                    <ClockIcon className="h-6 w-6 icon-text-yellow" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">Pending</p>
                    <p className="text-2xl font-bold text-white">
                      {bookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 icon-container-green border">
                    <CheckCircleIcon className="h-6 w-6 icon-text-green" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">Approved</p>
                    <p className="text-2xl font-bold text-white">
                      {bookings.filter(b => b.status === 'approved').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 icon-container-red border">
                    <XCircleIcon className="h-6 w-6 icon-text-red" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">Rejected</p>
                    <p className="text-2xl font-bold text-white">
                      {bookings.filter(b => b.status === 'rejected').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 icon-container-blue border">
                    <CalendarIcon className="h-6 w-6 icon-text-blue" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">Total</p>
                    <p className="text-2xl font-bold">{bookings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings List */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl font-industrial text-white">Booking Requests</CardTitle>
              <CardDescription className="text-white/80">
                Review and manage customer booking requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white/60 text-lg">No bookings found</p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-white">{booking.full_name}</h3>
                            <StatusBadge status={booking.status} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-white/80">
                          <div className="flex items-center">
                            <MailIcon className="h-4 w-4 mr-2 text-[var(--primary-300)]" />
                            <span className="truncate">{booking.email}</span>
                          </div>
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-2 text-[var(--primary-300)]" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center">
                            <CarIcon className="h-4 w-4 mr-2 text-[var(--primary-300)]" />
                            <span className="truncate">{booking.service_type}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-white/60">
                          Requested: {formatDate(booking.preferred_date)} at {booking.preferred_time}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowDetailsDialog(true);
                            }}
                            className="action-button-blue w-full sm:w-auto"
                          >
                            <EyeIcon className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setActionType('approve');
                                  setShowActionDialog(true);
                                }}
                                className="action-button-green w-full sm:w-auto"
                              >
                                <CheckCircleIcon className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setActionType('reject');
                                  setShowActionDialog(true);
                                }}
                                className="action-button-red w-full sm:w-auto"
                              >
                                <XCircleIcon className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl mx-4 bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-2xl font-industrial text-white">Booking Details</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-6">
                <div className="p-6 bg-white/10 border border-white/20 backdrop-blur-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Booking Reference</Label>
                      <p className="text-sm text-white font-mono">{selectedBooking.booking_reference}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Created At</Label>
                      <p className="text-sm text-white">{formatDateTime(selectedBooking.created_at)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Customer</Label>
                      <p className="text-sm text-white">{selectedBooking.full_name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Contact</Label>
                      <p className="text-sm text-white">{selectedBooking.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Phone</Label>
                      <p className="text-sm text-white">{selectedBooking.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Service</Label>
                      <p className="text-sm text-white">{selectedBooking.service_type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Date & Time</Label>
                      <p className="text-sm text-white">
                        {formatDate(selectedBooking.preferred_date)} at {selectedBooking.preferred_time}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Status</Label>
                      <div className="mt-1"><StatusBadge status={selectedBooking.status} /></div>
                    </div>
                  </div>

                  {selectedBooking.vehicle_make && (
                    <div className="mb-4">
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Vehicle</Label>
                      <p className="text-sm text-white">
                        {selectedBooking.vehicle_make} {selectedBooking.vehicle_model} ({selectedBooking.vehicle_year})
                      </p>
                    </div>
                  )}

                  {selectedBooking.additional_notes && (
                    <div className="mb-4">
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Additional Notes</Label>
                      <p className="text-sm text-white/90 mt-1 p-3 bg-white/5 border border-white/10">
                        {selectedBooking.additional_notes}
                      </p>
                    </div>
                  )}

                  {selectedBooking.payment_receipt_url && (
                    <div className="mb-4">
                      <div className="mt-2">
                        <Button
                          variant="outlined"
                          size="sm"
                          onClick={async () => {
                            const signedUrl = await getSignedUrl(selectedBooking.payment_receipt_url!);
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

                  {selectedBooking.admin_notes && (
                    <div>
                      <Label className="text-sm font-semibold text-white/90 uppercase tracking-wide">Admin Notes</Label>
                      <p className="text-sm text-white/90 mt-1 p-3 bg-white/5 border border-white/10">
                        {selectedBooking.admin_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Action Dialog */}
        <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
          <DialogContent className="mx-4 bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-2xl font-industrial text-white">
                {actionType === 'approve' ? 'Approve Booking' : 'Reject Booking'}
              </DialogTitle>
              <DialogDescription className="text-white/80">
                {actionType === 'approve' 
                  ? 'This will approve the booking and send a confirmation email to the customer.'
                  : 'This will reject the booking and notify the customer.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="adminNotes" className="text-white font-semibold text-sm uppercase tracking-wide">Admin Notes (Optional)</Label>
                <Textarea
                  id="adminNotes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any notes for the customer..."
                  rows={3}
                  className={`mt-2 px-6 py-6 ${
                    actionType === 'reject' ? 'theme-input-destructive' : 'theme-input'
                  }`}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={handleBookingAction}
                disabled={isProcessing}
                variant={actionType === 'reject' ? 'destructive' : 'filled'}
                className="w-full p-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  actionType === 'approve' ? 'Approve' : 'Reject'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>
    </PageTransition>
  );
}
