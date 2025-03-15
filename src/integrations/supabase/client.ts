
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types'; // Poprawiony import

const SUPABASE_URL = "https://zqzxyqtfccjxyhdtsqqu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxenh5cXRmY2NqeHloZHRzcXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTgxMDQsImV4cCI6MjA1NzU3NDEwNH0.Z1JC9B1HtLXEuXGzzBJBuPhATYSDnzZ46A3x1aRpAhM";

// Eksportujemy klienta Supabase z poprawnym typem
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Funkcja testowa do sprawdzenia stanu autentykacji
export const testAuth = async () => {
  try {
    const authData = await supabase.auth.getSession();
    return { data: authData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Funkcja do rejestracji użytkowników testowych
export const registerTestUser = async (email: string, password: string, name: string, role: string = 'client') => {
  try {
    console.log(`Próba rejestracji użytkownika testowego: ${email}`);
    
    // Najpierw sprawdź, czy użytkownik już istnieje
    const { data: { user } } = await supabase.auth.getUser();
    
    // Jeśli użytkownik jest zalogowany, wyloguj go
    if (user) {
      await supabase.auth.signOut();
    }
    
    // Spróbuj zalogować się jako użytkownik testowy
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    // Jeśli udało się zalogować, to użytkownik już istnieje
    if (loginData.user) {
      console.log(`Użytkownik ${email} już istnieje i ma poprawne hasło`);
      // Wyloguj się po sprawdzeniu
      await supabase.auth.signOut();
      return { 
        success: true, 
        data: loginData,
        skipped: true
      };
    }
    
    // Jeśli nie udało się zalogować z powodu złego hasła, ale użytkownik istnieje
    if (loginError && loginError.message.includes("Invalid login credentials")) {
      // Użytkownik może istnieć, ale mieć inne hasło - spróbujmy resetować hasło
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
      
      if (!resetError) {
        console.log(`Użytkownik ${email} istnieje, ale ma inne hasło`);
        return { 
          success: true, 
          data: { user: { id: "already_exists", email } },
          skipped: true
        };
      }
    }
    
    // Jeśli użytkownik nie istnieje, zarejestruj go
    console.log(`Rejestracja nowego użytkownika: ${email}`);
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
      
      console.error("Błąd rejestracji auth:", authError);
      return { success: false, error: authError.message };
    }
    
    console.log("Rejestracja auth zakończona pomyślnie:", authData);
    
    // Dodajemy profil użytkownika w bazie danych
    if (authData.user) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: email,
            name: name,
            role: role,
          });
        
        if (profileError) {
          console.error("Błąd tworzenia profilu:", profileError);
          // Nie zwracamy błędu, kontynuujemy mimo to
        }
      } catch (e) {
        console.error("Wyjątek przy tworzeniu profilu:", e);
        // Nie zwracamy błędu, kontynuujemy mimo to
      }
    }
    
    console.log(`Weryfikacja użytkownika testowego: ${email} zakończona pomyślnie`);
    return { success: true, data: authData };
  } catch (e: any) {
    console.error("Nieoczekiwany błąd rejestracji:", e);
    return { success: false, error: e.message };
  }
};
