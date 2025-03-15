
import { createClient } from '@supabase/supabase-js';
// Import typu używając aliasu, aby uniknąć konfliktu nazw
import type { Database } from './types';

const SUPABASE_URL = "https://zqzxyqtfccjxyhdtsqqu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxenh5cXRmY2NqeHloZHRzcXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTgxMDQsImV4cCI6MjA1NzU3NDEwNH0.Z1JC9B1HtLXEuXGzzBJBuPhATYSDnzZ46A3x1aRpAhM";

// Eksportujemy klienta Supabase z poprawnym typem
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Dodajemy funkcję demonstracyjną do testowania logowania
export const testAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log("Sesja testowa:", data, "Błąd:", error);
    return { data, error };
  } catch (e) {
    console.error("Błąd testowania auth:", e);
    return { data: null, error: e };
  }
};

// Funkcja do sprawdzania, czy użytkownik już istnieje
const checkIfUserExists = async (email: string) => {
  try {
    // Próbujemy zalogować się na konto z pustym hasłem - to zawsze się nie powiedzie,
    // ale jeśli użytkownik istnieje, otrzymamy konkretny błąd
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: "check_if_exists_only"
    });
    
    // Jeśli mamy błąd "Invalid login credentials", to użytkownik istnieje
    if (error && error.message.includes("Invalid login credentials")) {
      return true;
    }
    
    // W innych przypadkach zakładamy, że użytkownik nie istnieje
    return false;
  } catch (e) {
    console.error("Błąd podczas sprawdzania istnienia użytkownika:", e);
    return false;
  }
};

// Funkcja do rejestracji użytkowników testowych z opóźnieniem i sprawdzaniem istnienia
export const registerTestUser = async (email: string, password: string, name: string, role: string = 'client') => {
  try {
    console.log(`Próba rejestracji użytkownika testowego: ${email}`);
    
    // Najpierw sprawdź, czy użytkownik już istnieje
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      console.log(`Użytkownik ${email} już istnieje - pomijam rejestrację`);
      return { success: true, data: { user: { id: "already_exists", email } } };
    }
    
    // 1. Zarejestruj użytkownika w auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    });
    
    if (authError) {
      // Jeśli błąd to "User already registered", uznajemy to za sukces
      if (authError.message.includes("User already registered")) {
        console.log(`Użytkownik ${email} już zarejestrowany`);
        return { success: true, data: { user: { id: "already_exists", email } } };
      }
      
      // Ograniczenie API - rezygnujemy z rejestracji
      if (authError.message.includes("rate limit")) {
        console.log(`Ograniczenie API dla ${email}, pomijam rejestrację`);
        return { success: true, data: null, skipped: true };
      }
      
      console.error("Błąd rejestracji auth:", authError);
      return { success: false, error: authError.message };
    }
    
    console.log("Rejestracja auth zakończona pomyślnie:", authData);
    
    // 2. Utwórz profil użytkownika
    if (authData.user) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email,
            name,
            role,
            created_at: new Date().toISOString()
          });
        
        if (profileError) {
          // Jeśli profil już istnieje, to pomijamy błąd
          if (profileError.message.includes("duplicate key")) {
            console.log(`Profil użytkownika ${email} już istnieje`);
            return { success: true, data: authData };
          }
          
          console.error("Błąd tworzenia profilu:", profileError);
          return { success: true, data: authData, warning: profileError.message };
        }
      } catch (profileErr) {
        console.error("Wyjątek przy tworzeniu profilu:", profileErr);
        return { success: true, data: authData, warning: "Błąd przy tworzeniu profilu" };
      }
    }
    
    return { success: true, data: authData };
  } catch (e: any) {
    console.error("Nieoczekiwany błąd rejestracji:", e);
    return { success: false, error: e.message };
  }
};

// Dodajemy funkcję do logowania demonstracyjnego
export const loginWithDemoCredentials = async (email: string, password: string) => {
  try {
    console.log("Próba logowania z danymi demo:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    console.log("Wynik logowania demo:", data, "Błąd:", error);
    return { data, error };
  } catch (e) {
    console.error("Wyjątek podczas logowania demo:", e);
    return { data: null, error: e };
  }
};
