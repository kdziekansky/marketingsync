import React, { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import { useNavigate } from "react-router-dom";
import { testAuth, registerTestUser } from "@/integrations/supabase/client";

const TEST_USERS = [
  { email: "jan@agencja.pl", password: "password", name: "Jan Kowalski", role: "superadmin" },
  { email: "anna@agencja.pl", password: "password", name: "Anna Nowak", role: "admin" },
  { email: "tomasz@agencja.pl", password: "password", name: "Tomasz Wiśniewski", role: "employee" },
  { email: "kontakt@abc.pl", password: "password", name: "Firma ABC", role: "client" }
];

export const Login = () => {
  const { isAuthenticated, isLoading } = useSupabaseAuth();
  const navigate = useNavigate();

  // Funkcja do utworzenia użytkowników testowych
  const createTestUsers = async () => {
    console.log("Inicjalizacja użytkowników testowych...");
    
    for (const user of TEST_USERS) {
      try {
        // Sprawdź, czy użytkownik już istnieje
        const { data, error } = await registerTestUser(
          user.email,
          user.password,
          user.name,
          user.role
        );
        
        if (error) {
          console.log(`Użytkownik ${user.email} już może istnieć:`, error);
        } else {
          console.log(`Utworzono użytkownika testowego: ${user.email}`);
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
    createTestUsers();

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
