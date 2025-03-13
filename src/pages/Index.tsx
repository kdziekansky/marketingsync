
import React from "react";
import { useAuth } from "@/components/auth/AuthContext";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Laptop, Pen, UserCircle2 } from "lucide-react";

export default function Index() {
  const { user, isAuthenticated, login } = useAuth();

  // Jeśli użytkownik jest zalogowany, wyświetl odpowiedni dashboard
  if (isAuthenticated && user) {
    switch (user.role) {
      case "client":
        return <ClientDashboard />;
      case "employee":
        return <div>Panel pracownika - wkrótce dostępny</div>;
      case "admin":
        return <div>Panel administratora - wkrótce dostępny</div>;
      case "superadmin":
        return <div>Panel superadministratora - wkrótce dostępny</div>;
      default:
        return <div>Nieznana rola użytkownika</div>;
    }
  }

  // Dla celów demo, dodajmy przyciski do szybkiego logowania różnymi rolami
  const handleDemoLogin = async (email: string) => {
    await login(email, "password");
  };

  // Jeśli użytkownik nie jest zalogowany, wyświetl stronę powitalną
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Witaj w Digital Agency CRM</h1>
        <p className="text-xl text-muted-foreground">
          Kompleksowe narzędzie do zarządzania agencją marketingową
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-12">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <Laptop className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Zarządzanie projektami</CardTitle>
            <CardDescription>
              Pełna kontrola nad wszystkimi projektami marketingowymi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Tablica zadań w stylu Trello</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Śledzenie postępu prac</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Zarządzanie terminami</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <Pen className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Dokumenty</CardTitle>
            <CardDescription>
              Tworzenie i edycja dokumentów w stylu Notion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Współdzielone dokumenty</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Bogaty edytor tekstu</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Historia zmian</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <UserCircle2 className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Zarządzanie klientami</CardTitle>
            <CardDescription>
              Pełna kontrola nad relacjami z klientami
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Panel klienta</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Zarządzanie fakturami</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Raportowanie</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <Laptop className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Integracje</CardTitle>
            <CardDescription>
              Połączenie z popularnymi narzędziami marketingowymi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Google Ads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Facebook Ads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Google Analytics</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Sekcja demo logowania */}
      <div className="w-full max-w-md p-6 border rounded-lg shadow-sm bg-card">
        <h2 className="text-xl font-semibold mb-4 text-center">Demo aplikacji</h2>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Zaloguj się jako przykładowy użytkownik, aby zobaczyć różne panele aplikacji
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => handleDemoLogin("jan@agencja.pl")}
            className="w-full"
            variant="default"
          >
            Zaloguj jako Superadmin
          </Button>
          <Button
            onClick={() => handleDemoLogin("anna@agencja.pl")}
            className="w-full"
            variant="outline"
          >
            Zaloguj jako Admin
          </Button>
          <Button
            onClick={() => handleDemoLogin("tomasz@agencja.pl")}
            className="w-full"
            variant="outline"
          >
            Zaloguj jako Pracownik
          </Button>
          <Button
            onClick={() => handleDemoLogin("kontakt@abc.pl")}
            className="w-full"
            variant="outline"
          >
            Zaloguj jako Klient
          </Button>
        </div>
      </div>
    </div>
  );
}
