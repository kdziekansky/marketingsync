
import React, { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import { useNavigate } from "react-router-dom";
import { testAuth, registerTestUser } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    
    // Wprowadź opóźnienie między rejestraciami, aby uniknąć limitu API
    for (const [index, user] of TEST_USERS.entries()) {
      try {
        // Odczekaj dłuższą chwilę między rejestracjami, aby uniknąć ograniczeń API
        // Zwiększam opóźnienie dla każdego kolejnego użytkownika
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 3000 * index));
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

  useEffect(() => {
    // Testujemy stan autoryzacji na stronie logowania
    testAuth().then(({ data }) => {
      console.log("Test auth na stronie logowania:", data);
    });
    
    // Przy pierwszym ładowaniu strony, próbujemy utworzyć użytkowników testowych
    createTestUsers().catch(err => {
      console.error("Błąd podczas inicjalizacji użytkowników testowych:", err);
      toast.error("Nie udało się zainicjalizować użytkowników testowych");
    });

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
