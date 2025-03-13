
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { FilePieChart, FileBarChart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const canCreateReport = user && (user.role === "admin" || user.role === "superadmin");
  
  // In a real application, this would fetch reports from an API or database
  const reports = []; // Placeholder for actual reports
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Raporty</h1>
        {canCreateReport && (
          <Button onClick={() => navigate("/reports/new")} className="gap-2">
            <Plus size={16} />
            <span>Nowy raport</span>
          </Button>
        )}
      </div>
      
      {reports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <FilePieChart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak raportów</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie utworzono jeszcze żadnych raportów.
            </p>
            {canCreateReport && (
              <Button onClick={() => navigate("/reports/new")}>Utwórz raport</Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/reports/${report.id}`)}>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{report.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
                <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                  <span>Ostatnia aktualizacja: {new Date(report.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
