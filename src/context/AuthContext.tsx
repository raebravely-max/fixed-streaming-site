import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

interface AppUser {
  id: string;
  email: string;
  isPro: boolean;
  isTrialing: boolean;
  trialDaysRemaining: number | null;
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = async (email: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("role, subscription_status, trial_ends_at")
      .eq("email", email)
      .single();

    if (error || !data) return null;

    const now = new Date();

    const isPaidActive =
      data.role === "PRO" &&
      data.subscription_status === "active";

    const isTrialing =
      data.subscription_status === "trialing" &&
      data.trial_ends_at &&
      new Date(data.trial_ends_at) > now;

    let trialDaysRemaining: number | null = null;

    if (isTrialing && data.trial_ends_at) {
      const diff =
        new Date(data.trial_ends_at).getTime() - now.getTime();
      trialDaysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    return {
      isPro: isPaidActive || isTrialing,
      isTrialing,
      trialDaysRemaining,
    };
  };

  const loadUserFromSession = async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      return;
    }

    const status = await fetchUserStatus(session.user.email!);

    if (!status) {
      setUser(null);
      return;
    }

    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      isPro: status.isPro,
      isTrialing: status.isTrialing,
      trialDaysRemaining: status.trialDaysRemaining,
    });
  };

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      await loadUserFromSession(session);
      setLoading(false);
    };

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        await loadUserFromSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return { error: error.message };

    const user = data.user;
    if (!user) return { error: "User creation failed" };

    await fetch("/api/create-user-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
      }),
    });

    return {};
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};