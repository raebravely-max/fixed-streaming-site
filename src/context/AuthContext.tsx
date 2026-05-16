import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

interface AppUser {
  id: string;
  email: string;
  isPro: boolean;
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

  const fetchUserRole = async (email: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from("users")
      .select("role, subscription_status, trial_ends_at")
      .eq("email", email)
      .single();

    if (error || !data) return false;

    const now = new Date();

    const isPaidActive =
      data.role === "PRO" &&
      data.subscription_status === "active";

    const isTrialActive =
      data.trial_ends_at &&
      new Date(data.trial_ends_at) > now;

    return isPaidActive || isTrialActive;
  };

  const loadUserFromSession = async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      return;
    }

    const isPro = await fetchUserRole(session.user.email!);

    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      isPro,
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

  // ✅ SIGN UP WITH BACKEND TRIAL CREATION
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const user = data.user;

    if (!user) {
      return { error: "User creation failed" };
    }

    try {
      const response = await fetch("/api/create-user-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        return { error: errData.error || "Failed to create user profile" };
      }
    } catch (err) {
      console.error("Profile creation error:", err);
      return { error: "Failed to initialize user profile" };
    }

    return {};
  };

  // ✅ SIGN IN
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

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
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};