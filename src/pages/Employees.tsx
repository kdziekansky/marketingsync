
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Employees = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // W prawdziwej aplikacji, pobieralibyśmy dane pracowników z API
  const employees = [
    { id: "1", name: "Jan Kowalski", email: "jan.kowalski@example.com", role: "employee", department: "Marketing" },
    { id: "2", name: "Anna Nowak", email: "anna.nowak@example.com", role: "employee", department: "Design" }
  ];
  
  // Sprawdź uprawnienia - tylko admin i superadmin mogą widzieć tę stronę
  const canAccessEmployees = user && (user.role === "admin" || user.role === "superadmin");
  
  if (!canAccessEmployees) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Brak dostępu</h1>
        <p>Nie masz uprawnień do przeglądania listy pracowników.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pracownicy</h1>
        <Button onClick={() => navigate("/employees/new")} className="gap-2">
          <Plus size={16} />
          <span>Dodaj pracownika</span>
        </Button>
      </div>
      
      {employees.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak pracowników</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie dodano jeszcze żadnych pracowników.
            </p>
            <Button onClick={() => navigate("/employees/new")}>Dodaj pracownika</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/employees/${employee.id}`)}>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{employee.name}</h3>
                <p className="text-sm text-muted-foreground">{employee.email}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {employee.department}
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

export default Employees;
