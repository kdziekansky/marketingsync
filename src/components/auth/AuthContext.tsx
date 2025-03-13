
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/utils/types";
import { users } from "@/utils/dummyData";

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
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sprawdź, czy użytkownik jest już zalogowany (z localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Logowanie użytkownika
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // W normalnej aplikacji, tutaj byłoby faktyczne sprawdzenie z API
      // Do celów demonstracyjnych, używamy danych testowych
      
      // Symulacja opóźnienia sieci
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Znajdź użytkownika w danych testowych
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password === "password") { // W prawdziwej aplikacji nigdy nie porównujemy haseł bezpośrednio
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
      } else {
        setError("Nieprawidłowy email lub hasło");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Wystąpił błąd podczas logowania");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Wylogowanie użytkownika
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
