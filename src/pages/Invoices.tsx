
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { getInvoicesByClientId, invoices } from "@/utils/dummyData";
import InvoiceList from "@/components/invoices/InvoiceList";
import { Button } from "@/components/ui/button";
import { Plus, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Invoices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Pobierz odpowiednie faktury w zależności od roli użytkownika
  const getInvoices = () => {
    if (!user) return [];
    
    if (user.role === "client" && user.clientId) {
      return getInvoicesByClientId(user.clientId);
    } else if (user.role === "admin" || user.role === "superadmin") {
      // Administratorzy widzą wszystkie faktury
      return invoices;
    }
    
    return [];
  };
  
  const userInvoices = getInvoices();
  const canCreateInvoice = user && (user.role === "admin" || user.role === "superadmin");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faktury</h1>
        {canCreateInvoice && (
          <Button onClick={() => navigate("/invoices/new")} className="gap-2">
            <Plus size={16} />
            <span>Nowa faktura</span>
          </Button>
        )}
      </div>
      
      {userInvoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Receipt className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak faktur</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie masz jeszcze żadnych faktur.
            </p>
            {canCreateInvoice && (
              <Button onClick={() => navigate("/invoices/new")}>Utwórz fakturę</Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <InvoiceList invoices={userInvoices} />
      )}
    </div>
  );
};

export default Invoices;
