import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      redirect("/admin/signin");
    }

    // redirect to dashboard
    redirect("/admin/dashboard");
  } catch (error) {
    console.error('Error checking admin status:', error);
    redirect("/admin/signin");
  }
}
