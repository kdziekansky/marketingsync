
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/utils/types";
import { users, getCurrentUser } from "@/utils/dummyData";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setDemoUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, make API call to authenticate
    // For demo, just find user with matching email
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Invalid credentials"));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // For demo purposes only
  const setDemoUserRole = (role: UserRole) => {
    const demoUser = getCurrentUser(role);
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, setDemoUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
