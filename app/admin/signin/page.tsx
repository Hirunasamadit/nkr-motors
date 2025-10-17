"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircleIcon, ShieldIcon } from "lucide-react";
import { PageTransition } from "@/lib/animations";

export default function AdminSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        setError("Sign in failed. Please try again.");
        setIsLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : "An error occurred during sign in.");
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--background)]">
        <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 theme-shadow-card">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl font-industrial text-white text-center flex items-center justify-center">
              <ShieldIcon className="h-6 w-6 mr-2 text-[var(--primary-300)]" />
              Admin Portal
            </CardTitle>
            <CardDescription className="text-center text-white/80">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-semibold text-sm uppercase tracking-wide">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER ADMIN EMAIL"
                  className="px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-semibold text-sm uppercase tracking-wide">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ENTER ADMIN PASSWORD"
                  className="px-6 py-6 theme-input transition-all duration-300 focus:ring-2 focus:ring-[var(--primary-300)] focus:border-[var(--primary-300)]"
                  required
                />
              </div>

              {error && (
                <div className="p-4 alert-red border backdrop-blur-sm">
                  <div className="flex items-center">
                    <AlertCircleIcon className="h-5 w-5 text-red-400 mr-3" />
                    <span className="text-sm text-red-400 font-medium">
                      {error}
                    </span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="filled"
                className="w-full p-6 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "SIGN IN"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>
      </div>
    </PageTransition>
  );
}
