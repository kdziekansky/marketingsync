
import { createClient } from '@supabase/supabase-js';
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
const checkIfUserExists = async (email: string): Promise<{ exists: boolean, confirmed: boolean }> => {
  try {
    // Spróbujmy bezpośrednio zalogować się na konto testowe
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: "password" // Używamy prawdziwego hasła dla kont testowych
    });
    
    // Jeśli logowanie się powiodło, to użytkownik istnieje i ma poprawne hasło
    if (data?.user) {
      console.log(`Użytkownik ${email} istnieje i hasło jest poprawne`);
      // Wylogujmy użytkownika, żeby nie pozostawić sesji
      await supabase.auth.signOut();
      return { exists: true, confirmed: true };
    }
    
    // Jeśli mamy błąd "Invalid login credentials", sprawdźmy czy użytkownik istnieje w inny sposób
    if (error) {
      // Sprawdzamy, czy użytkownik istnieje sprawdzając resetowanie hasła
      const { data: resetData, error: resetError } = await supabase.auth.resetPasswordForEmail(email);
      
      // Jeśli nie ma błędu przy resetowaniu hasła, użytkownik prawdopodobnie istnieje
      if (!resetError) {
        console.log(`Użytkownik ${email} istnieje ale hasło nie pasuje`);
        return { exists: true, confirmed: false };
      }
    }
    
    console.log(`Użytkownik ${email} nie istnieje`);
    return { exists: false, confirmed: false };
  } catch (e) {
    console.error("Błąd podczas sprawdzania istnienia użytkownika:", e);
    return { exists: false, confirmed: false };
  }
};

// Funkcja do rejestracji użytkowników testowych z poprawioną obsługą błędów
export const registerTestUser = async (email: string, password: string, name: string, role: string = 'client') => {
  try {
    console.log(`Próba rejestracji użytkownika testowego: ${email}`);
    
    // Najpierw sprawdź, czy użytkownik już istnieje
    const { exists, confirmed } = await checkIfUserExists(email);
    
    if (exists) {
      console.log(`Użytkownik ${email} już istnieje - pomijam rejestrację`);
      return { 
        success: true, 
        data: { user: { id: "already_exists", email } },
        skipped: true
      };
    }
    
    // 1. Zarejestruj użytkownika w auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
        emailRedirectTo: window.location.origin
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
    if (authData?.user) {
      try {
        // Sprawdź, czy profil już istnieje
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();
          
        if (existingProfile) {
          console.log(`Profil użytkownika ${email} już istnieje`);
          return { success: true, data: authData };
        }
        
        // Utwórz profil, jeśli nie istnieje
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
    
    console.log(`Weryfikacja użytkownika testowego: ${email} zakończona pomyślnie`);
    return { success: true, data: authData };
  } catch (e: any) {
    console.error("Nieoczekiwany błąd rejestracji:", e);
    return { success: false, error: e.message };
  }
};

// Funkcja do logowania demonstracyjnego - poprawiona
export const loginWithDemoCredentials = async (email: string, password: string) => {
  try {
    console.log("Próba logowania z danymi demo:", email);
    
    // Bezpośrednie logowanie z podanymi danymi
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    // Jeśli logowanie się powiodło, zwracamy dane
    if (data?.user) {
      console.log("Logowanie demo udane:", data);
      return { data, error: null };
    }
    
    // Jeśli logowanie się nie powiodło
    if (error) {
      console.error("Błąd logowania demo:", error);
      
      // Sprawdźmy czy konto istnieje
      const { exists } = await checkIfUserExists(email);
      
      if (!exists) {
        // Spróbujmy utworzyć konto przed ponowną próbą logowania
        console.log(`Użytkownik ${email} nie istnieje, tworzę konto testowe...`);
        
        const roleBasedOnEmail = email.includes('admin') ? 'admin' : 
                                email.includes('superadmin') ? 'superadmin' : 
                                email.includes('employee') ? 'employee' : 'client';
        
        const { success, error: registerError } = await registerTestUser(
          email, 
          password, 
          email.split('@')[0], 
          roleBasedOnEmail
        );
        
        if (!success) {
          return { data: null, error: { message: registerError || "Nie udało się utworzyć konta testowego" } };
        }
        
        // Teraz spróbuj ponownie zalogować
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (retryError) {
          console.error("Błąd logowania po utworzeniu konta:", retryError);
          return { data: null, error: retryError };
        }
        
        console.log("Logowanie po utworzeniu konta udane:", retryData);
        return { data: retryData, error: null };
      }
      
      return { data: null, error };
    }
    
    // Ten kod nie powinien być nigdy osiągnięty, ale dodajemy dla kompletności
    return { data, error };
  } catch (e) {
    console.error("Wyjątek podczas logowania demo:", e);
    return { data: null, error: e };
  }
};
