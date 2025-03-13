
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import { useAuth } from "@/components/auth/AuthContext";
import { getInvoiceById } from "@/utils/dummyData";
import { toast } from "sonner";

const InvoiceCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewInvoice = id === "new" || !id;
  
  // Verify permissions
  const canEditInvoice = user && (user.role === "admin" || user.role === "superadmin");
  
  if (!canEditInvoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/invoices")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">Brak dostępu</h1>
        </div>
        <p>Nie masz uprawnień do edycji faktur.</p>
      </div>
    );
  }
  
  const existingInvoice = !isNewInvoice && id ? getInvoiceById(id) : null;
  
  const handleSubmit = (invoiceData: any) => {
    // In a real app, this would save to an API or database
    toast.success(`Faktura ${isNewInvoice ? "utworzona" : "zaktualizowana"}`);
    navigate("/invoices");
  };

  const handleCancel = () => {
    navigate("/invoices");
  };
  
  return (
    <div className="space-y-6">
      <InvoiceForm 
        invoice={existingInvoice}
        onSave={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default InvoiceCreate;
