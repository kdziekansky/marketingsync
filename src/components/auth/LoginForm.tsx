
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "./SupabaseAuthContext";
import { toast } from "sonner";
import { Loader2, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithProvider, user, isAuthenticated } = useSupabaseAuth();
  const navigate = useNavigate();

  // Dodane: Efekt do przekierowania zalogowanego użytkownika
  useEffect(() => {
    console.log("Sprawdzanie autentykacji:", { isAuthenticated, user });
    
    if (isAuthenticated && user) {
      console.log("Użytkownik zalogowany, przekierowuję na stronę główną");
      // Użyj setTimeout, aby dać czas na zakończenie renderowania
      setTimeout(() => navigate("/"), 100);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Próba logowania z danymi:", { email });
      
      // Używamy funkcji login z kontekstu auth
      const { success, error } = await login(email, password);
      
      if (success) {
        console.log("Logowanie zakończone sukcesem, toast zostanie wyświetlony");
        toast.success("Zalogowano pomyślnie");
        // Nie robimy przekierowania tutaj, przekierowanie jest obsługiwane przez useEffect
      } else {
        console.error("Błąd logowania:", error);
        toast.error(`Błąd logowania: ${error || "Nieprawidłowe dane logowania"}`);
      }
    } catch (error: any) {
      console.error("Nieoczekiwany błąd:", error);
      toast.error("Wystąpił nieoczekiwany błąd podczas logowania");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      await loginWithProvider(provider);
    } catch (error) {
      toast.error("Wystąpił błąd podczas logowania z dostawcą zewnętrznym");
    }
  };

  // Funkcja do szybkiego logowania dla celów demonstracyjnych
  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setIsLoading(true);
    
    try {
      console.log("Logowanie demo z użytkownikiem:", demoEmail);
      
      // Bezpośrednio używamy metody login z kontekstu auth, zamiast bezpośrednio korzystać z supabase
      const { success, error } = await login(demoEmail, "password");
      
      if (success) {
        console.log("Logowanie demo zakończone sukcesem");
        toast.success("Zalogowano pomyślnie");
        // Przekierowanie obsługiwane przez useEffect
      } else {
        console.error("Błąd logowania demo:", error);
        toast.error(`Błąd logowania: ${error || "Nieprawidłowe dane logowania"}`);
      }
    } catch (error: any) {
      console.error("Nieoczekiwany błąd:", error);
      toast.error("Wystąpił nieoczekiwany błąd podczas logowania");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Logowanie</CardTitle>
        <CardDescription>
          Wprowadź swoje dane, aby się zalogować
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="przyklad@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Hasło</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logowanie...
              </>
            ) : (
              "Zaloguj się"
            )}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Konta testowe
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("jan@agencja.pl")}
            disabled={isLoading}
          >
            SuperAdmin
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("anna@agencja.pl")}
            disabled={isLoading}
          >
            Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("tomasz@agencja.pl")}
            disabled={isLoading}
          >
            Pracownik
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin("kontakt@abc.pl")}
            disabled={isLoading}
          >
            Klient
          </Button>
        </div>

        <div className="flex items-center p-2 border rounded-lg bg-slate-50 dark:bg-slate-900">
          <Info className="h-4 w-4 mr-2 text-blue-500" />
          <span className="text-xs text-muted-foreground">
            Kliknij na jedną z powyższych ról, aby zalogować się na konto testowe.
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Lub zaloguj się przez
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => handleProviderLogin("google")}
            disabled={isLoading}
          >
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleProviderLogin("github")}
            disabled={isLoading}
          >
            GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
