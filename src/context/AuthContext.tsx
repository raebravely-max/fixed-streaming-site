import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  isPro: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string) => {
    const newUser = { email, isPro: false };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const upgradeToPro = () => {
    if (!user) return;
    const updated = { ...user, isPro: true };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPro }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};