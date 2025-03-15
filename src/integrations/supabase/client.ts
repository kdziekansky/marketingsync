
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
