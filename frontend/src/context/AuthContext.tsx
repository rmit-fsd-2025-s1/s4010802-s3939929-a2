import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    sessionStorage.setItem("currentUser", JSON.stringify(user)); 
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("currentUser"); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
