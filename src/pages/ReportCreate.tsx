
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const ReportCreate = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNewReport = id === "new" || !id;
  
  const [report, setReport] = useState({
    id: isNewReport ? `report-${Date.now()}` : "",
    title: "",
    description: "",
    type: "performance",
    clientId: "",
    dateRange: "this_month",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value, updatedAt: new Date().toISOString() }));
  };

  const handleSave = () => {
    if (!report.title.trim()) {
      toast.error("Tytuł raportu jest wymagany");
      return;
    }

    if (!report.clientId) {
      toast.error("Wybierz klienta");
      return;
    }

    // In a real app, this would save to an API or database
    toast.success(`Raport "${report.title}" został zapisany`);
    
    // For demo purposes, let's simply go back to the reports list
    navigate("/reports");
  };

  const canCreateReport = user && (user.role === "admin" || user.role === "superadmin");

  if (!canCreateReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/reports")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">Brak dostępu</h1>
        </div>
        <p>Nie masz uprawnień do tworzenia raportów.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/reports")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">
            {isNewReport ? "Nowy raport" : "Edycja raportu"}
          </h1>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save size={16} />
          <span>Zapisz</span>
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium">Tytuł</label>
            <Input 
              id="title"
              name="title"
              value={report.title}
              onChange={handleInputChange}
              placeholder="Wprowadź tytuł raportu"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">Opis</label>
            <Textarea 
              id="description"
              name="description"
              value={report.description}
              onChange={handleInputChange}
              placeholder="Wprowadź opis raportu"
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="font-medium">Typ raportu</label>
              <select 
                id="type"
                name="type"
                value={report.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="performance">Wydajność kampanii</option>
                <option value="roi">ROI</option>
                <option value="conversion">Konwersje</option>
                <option value="audience">Analiza odbiorców</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dateRange" className="font-medium">Zakres dat</label>
              <select 
                id="dateRange"
                name="dateRange"
                value={report.dateRange}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="this_week">Ten tydzień</option>
                <option value="this_month">Ten miesiąc</option>
                <option value="last_month">Poprzedni miesiąc</option>
                <option value="last_quarter">Ostatni kwartał</option>
                <option value="last_year">Ostatni rok</option>
                <option value="custom">Niestandardowy</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="clientId" className="font-medium">Klient</label>
            <select 
              id="clientId"
              name="clientId"
              value={report.clientId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Wybierz klienta</option>
              <option value="1">Klient 1</option>
              <option value="2">Klient 2</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportCreate;
