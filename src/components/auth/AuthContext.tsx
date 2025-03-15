
import React, { createContext, useContext, useEffect } from "react";
import { User } from "@/utils/types";
import { useSupabaseAuth } from "./SupabaseAuthContext";

// Ten kontekst jest używany jako adapter dla istniejącego kodu,
// który oczekuje AuthContext w starym formacie. 
// Wewnętrznie używa SupabaseAuthContext.

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  logout: () => {},
  isLoading: false,
  error: null
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { 
    user: supabaseUser, 
    isAuthenticated: supabaseIsAuthenticated,
    login: supabaseLogin,
    logout: supabaseLogout,
    isLoading: supabaseIsLoading,
    error: supabaseError
  } = useSupabaseAuth();

  // Mapuj użytkownika Supabase na format oczekiwany przez stary kod
  const mapToUser = (supabaseUser: any): User | null => {
    if (!supabaseUser) return null;
    
    return {
      id: supabaseUser.id,
      name: supabaseUser.name || "Użytkownik",
      email: supabaseUser.email || "",
      role: supabaseUser.role || "client",
      avatar: supabaseUser.avatar_url,
      clientId: supabaseUser.client_id
    };
  };

  // Wrapper dla metody login
  const login = async (email: string, password: string): Promise<boolean> => {
    const { success } = await supabaseLogin(email, password);
    return success;
  };

  const value = {
    user: mapToUser(supabaseUser),
    isAuthenticated: supabaseIsAuthenticated,
    login,
    logout: supabaseLogout,
    isLoading: supabaseIsLoading,
    error: supabaseError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
