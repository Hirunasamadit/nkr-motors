import { createClient } from "@/lib/supabase/client";

export async function sendBookingNotification(
  bookingId: string, 
  notificationType: 'confirmation' | 'approval' | 'rejection' | 'reminder'
) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase.functions.invoke('send-booking-notification', {
      body: {
        booking_id: bookingId,
        notification_type: notificationType
      }
    });

    if (error) {
      console.error('Error sending notification:', error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error('Error sending notification:', error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
