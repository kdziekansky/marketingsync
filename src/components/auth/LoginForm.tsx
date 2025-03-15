
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "./SupabaseAuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithProvider } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Zmiana: Dodanie logów, aby pomóc w debugowaniu
      console.log("Próba logowania z danymi:", { email });
      
      const { success, error } = await login(email, password);
      
      if (success) {
        toast.success("Zalogowano pomyślnie");
        navigate("/");
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

  // Dodanie: Funkcja do szybkiego logowania dla celów demonstracyjnych
  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    
    // Symuluj kliknięcie przycisku logowania
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    } else {
      // Jeśli nie można znaleźć formularza, wykonaj logowanie bezpośrednio
      setIsLoading(true);
      try {
        const { success, error } = await login(demoEmail, "password");
        
        if (success) {
          toast.success("Zalogowano pomyślnie");
          navigate("/");
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
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Logowanie</CardTitle>
        <CardDescription>
          Wprowadź swoje dane, aby się zalogować
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="twoj@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Hasło</Label>
              <Button
                variant="link"
                type="button"
                className="px-0 text-xs"
                onClick={() => navigate("/reset-password")}
              >
                Zapomniałeś hasła?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logowanie...
              </>
            ) : (
              "Zaloguj się"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Lub kontynuuj z
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleProviderLogin("google")}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleProviderLogin("github")}
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Demo logowanie */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Demo logowanie
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleDemoLogin("jan@agencja.pl")}
            >
              Zaloguj jako Superadmin
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleDemoLogin("anna@agencja.pl")}
            >
              Zaloguj jako Admin
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleDemoLogin("tomasz@agencja.pl")}
            >
              Zaloguj jako Pracownik
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => handleDemoLogin("kontakt@abc.pl")}
            >
              Zaloguj jako Klient
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Nie masz jeszcze konta?{" "}
          <Button variant="link" className="px-0" onClick={() => navigate("/register")}>
            Zarejestruj się
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
