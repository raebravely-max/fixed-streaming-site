import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface AppUser {
  id: string;
  email: string;
  isPro: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      setSession(session);

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          isPro,
        });
      }

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            isPro,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [isPro]);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsPro(false);
  };

  const upgradeToPro = () => {
    setIsPro(true);
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
        upgradeToPro,
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