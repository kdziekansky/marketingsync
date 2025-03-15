
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider, UserProfile } from "@/types/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithProvider: (provider: AuthProvider) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => ({ success: false }),
  loginWithProvider: async () => {},
  signup: async () => ({ success: false }),
  logout: async () => {},
  resetPassword: async () => ({ success: false }),
  updateProfile: async () => ({ success: false }),
});

export const useSupabaseAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const SupabaseAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pobierz profil użytkownika z bazy danych
  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (e) {
      console.error('Exception fetching profile:', e);
      return null;
    }
  };

  // Sprawdź sesję przy ładowaniu
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);

        if (data.session?.user) {
          const profile = await getUserProfile(data.session.user.id);
          setUser(profile);
        }
      } catch (err) {
        console.error('Session check error:', err);
        setError('Wystąpił problem podczas sprawdzania twojej sesji');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Słuchaj zmian w autoryzacji
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      
      if (event === 'SIGNED_IN' && newSession?.user) {
        const profile = await getUserProfile(newSession.user.id);
        setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Logowanie przez email/hasło
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const profile = await getUserProfile(data.user.id);
        setUser(profile);
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logowanie przez dostawcę zewnętrznego (Google, GitHub, itd.)
  const loginWithProvider = async (provider: AuthProvider) => {
    try {
      setError(null);
      const providerMap: Record<AuthProvider, any> = {
        'email': 'email',
        'google': 'google',
        'github': 'github',
        'facebook': 'facebook'
      };
      
      await supabase.auth.signInWithOAuth({
        provider: providerMap[provider],
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err: any) {
      setError(err.message);
      toast.error(`Błąd logowania: ${err.message}`);
    }
  };

  // Rejestracja nowego użytkownika
  const signup = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      // Utwórz profil użytkownika
      if (data.user) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email,
              name,
              role: 'client',
              created_at: new Date().toISOString(),
            });

          if (profileError) {
            console.error('Error creating profile:', profileError);
            return { success: false, error: profileError.message };
          }
        } catch (e) {
          console.error('Exception creating profile:', e);
          return { success: false, error: 'Błąd podczas tworzenia profilu użytkownika' };
        }
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Wylogowanie
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Błąd wylogowania: ${err.message}`);
    }
  };

  // Reset hasła
  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Aktualizacja profilu użytkownika
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user?.id) {
        return { success: false, error: 'Użytkownik nie jest zalogowany' };
      }

      try {
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('id', user.id);

        if (error) {
          return { success: false, error: error.message };
        }

        // Aktualizuj lokalny stan
        setUser({ ...user, ...data });
        return { success: true };
      } catch (e) {
        console.error('Exception updating profile:', e);
        return { success: false, error: 'Błąd podczas aktualizacji profilu' };
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    loginWithProvider,
    signup,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
