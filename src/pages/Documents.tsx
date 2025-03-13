
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { getDocumentsByClientId, documents } from "@/utils/dummyData";
import { Button } from "@/components/ui/button";
import { Plus, File } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Documents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Pobierz odpowiednie dokumenty w zależności od roli użytkownika
  const getDocuments = () => {
    if (!user) return [];
    
    if (user.role === "client" && user.clientId) {
      return getDocumentsByClientId(user.clientId);
    } else if (user.role === "admin" || user.role === "superadmin" || user.role === "employee") {
      // Pracownicy i administratorzy widzą wszystkie dokumenty
      return documents;
    }
    
    return [];
  };
  
  const userDocuments = getDocuments();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dokumenty</h1>
        <Button onClick={() => navigate("/documents/new")} className="gap-2">
          <Plus size={16} />
          <span>Nowy dokument</span>
        </Button>
      </div>
      
      {userDocuments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <File className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak dokumentów</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie masz jeszcze żadnych dokumentów. Utwórz pierwszy dokument, aby rozpocząć.
            </p>
            <Button onClick={() => navigate("/documents/new")}>Utwórz dokument</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/documents/${doc.id}`)}>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{doc.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {doc.content.replace(/#+\s|__|_|\*\*|\*|~~|`/g, '').substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                  <span>Ostatnia edycja: {new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;
