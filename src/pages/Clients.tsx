
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Clients = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // W prawdziwej aplikacji, pobieralibyśmy dane klientów z API
  const clients = [
    { id: "1", name: "Klient 1", email: "klient1@example.com", status: "active" },
    { id: "2", name: "Klient 2", email: "klient2@example.com", status: "active" }
  ];
  
  // Sprawdź uprawnienia - tylko admin i superadmin mogą widzieć tę stronę
  const canAccessClients = user && (user.role === "admin" || user.role === "superadmin" || user.role === "employee");
  
  if (!canAccessClients) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Brak dostępu</h1>
        <p>Nie masz uprawnień do przeglądania listy klientów.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Klienci</h1>
        {user && (user.role === "admin" || user.role === "superadmin") && (
          <Button onClick={() => navigate("/clients/new")} className="gap-2">
            <Plus size={16} />
            <span>Dodaj klienta</span>
          </Button>
        )}
      </div>
      
      {clients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak klientów</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie dodano jeszcze żadnych klientów.
            </p>
            {user && (user.role === "admin" || user.role === "superadmin") && (
              <Button onClick={() => navigate("/clients/new")}>Dodaj klienta</Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/clients/${client.id}`)}>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                <div className="flex items-center mt-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    client.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {client.status === "active" ? "Aktywny" : "Nieaktywny"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
