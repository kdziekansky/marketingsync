import React, { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import { useNavigate } from "react-router-dom";
import { testAuth, registerTestUser } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client"; // Dodajemy import supabase

// Lista użytkowników testowych
const TEST_USERS = [
  { email: "jan@agencja.pl", password: "password", name: "Jan Kowalski", role: "superadmin" },
  { email: "anna@agencja.pl", password: "password", name: "Anna Nowak", role: "admin" },
  { email: "tomasz@agencja.pl", password: "password", name: "Tomasz Wiśniewski", role: "employee" },
  { email: "kontakt@abc.pl", password: "password", name: "Firma ABC", role: "client" }
];

export const Login = () => {
  const { isAuthenticated, isLoading } = useSupabaseAuth();
  const navigate = useNavigate();

  // Funkcja do utworzenia użytkowników testowych z opóźnieniem
  const createTestUsers = async () => {
    console.log("Inicjalizacja użytkowników testowych...");
    
    // Sprawdźmy najpierw, czy możemy zalogować się na każdego z użytkowników
    // Jeśli tak, to znaczy że istnieją i nie musimy ich tworzyć
    let allExist = true;
    
    for (const user of TEST_USERS) {
      try {
        const { exists } = await checkIfUserExists(user.email);
        if (!exists) {
          allExist = false;
          break;
        }
      } catch (e) {
        console.error(`Błąd sprawdzania użytkownika ${user.email}:`, e);
        allExist = false;
        break;
      }
    }
    
    if (allExist) {
      console.log("Wszyscy użytkownicy testowi już istnieją, pomijam rejestrację");
      return;
    }
    
    // Wprowadź opóźnienie między rejestracjami, aby uniknąć limitu API
    for (const [index, user] of TEST_USERS.entries()) {
      try {
        // Odczekaj dłuższą chwilę między rejestracjami, aby uniknąć ograniczeń API
        // Zwiększam opóźnienie dla każdego kolejnego użytkownika (10 sekund między każdym)
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 10000));
        }
        
        // Sprawdź, czy użytkownik już istnieje i zarejestruj go
        const { success, error, data, skipped } = await registerTestUser(
          user.email,
          user.password,
          user.name,
          user.role
        );
        
        if (skipped) {
          console.log(`Użytkownik ${user.email} już istnieje - pomijam rejestrację`);
          continue;
        }
        
        if (error) {
          console.log(`Błąd przy weryfikacji użytkownika ${user.email}: ${error}`);
        } else if (data) {
          console.log(`Weryfikacja użytkownika testowego: ${user.email} zakończona pomyślnie`);
        }
      } catch (e) {
        console.error(`Błąd podczas tworzenia użytkownika ${user.email}:`, e);
      }
    }
    
    console.log("Inicjalizacja użytkowników testowych zakończona");
  };

  // Funkcja do sprawdzenia, czy użytkownik istnieje
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

  useEffect(() => {
    // Testujemy stan autoryzacji na stronie logowania
    testAuth().then(({ data }) => {
      console.log("Test auth na stronie logowania:", data);
    });
    
    // Przy pierwszym ładowaniu strony, próbujemy utworzyć użytkowników testowych
    // ale tylko jeśli nie są jeszcze zalogowani
    if (!isAuthenticated && !isLoading) {
      createTestUsers().catch(err => {
        console.error("Błąd podczas inicjalizacji użytkowników testowych:", err);
        toast.error("Nie udało się zainicjalizować użytkowników testowych");
      });
    }

    // Jeśli użytkownik jest już zalogowany, przekieruj go na stronę główną
    if (!isLoading && isAuthenticated) {
      console.log("Użytkownik już zalogowany, przekierowuję na stronę główną");
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <LoginForm />
    </div>
  );
};

export default Login;
