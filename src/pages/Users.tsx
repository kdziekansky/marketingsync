
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Users as UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // W prawdziwej aplikacji, pobieralibyśmy dane użytkowników z API
  const users = [
    { id: "1", name: "Jan Kowalski", email: "jan.kowalski@example.com", role: "employee" },
    { id: "2", name: "Anna Nowak", email: "anna.nowak@example.com", role: "employee" },
    { id: "3", name: "Piotr Wiśniewski", email: "piotr.wisniewski@example.com", role: "admin" },
    { id: "4", name: "Klient 1", email: "klient1@example.com", role: "client" }
  ];
  
  // Sprawdź uprawnienia - tylko superadmin może widzieć tę stronę
  const canAccessUsers = user && user.role === "superadmin";
  
  if (!canAccessUsers) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Brak dostępu</h1>
        <p>Nie masz uprawnień do przeglądania listy użytkowników.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Użytkownicy</h1>
        <Button onClick={() => navigate("/users/new")} className="gap-2">
          <Plus size={16} />
          <span>Dodaj użytkownika</span>
        </Button>
      </div>
      
      {users.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <UsersIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak użytkowników</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie dodano jeszcze żadnych użytkowników.
            </p>
            <Button onClick={() => navigate("/users/new")}>Dodaj użytkownika</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((userData) => (
            <Card key={userData.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/users/${userData.id}`)}>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <div className="flex items-center mt-4">
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {userData.role === "client" && "Klient"}
                    {userData.role === "employee" && "Pracownik"}
                    {userData.role === "admin" && "Administrator"}
                    {userData.role === "superadmin" && "Super Administrator"}
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

export default Users;
