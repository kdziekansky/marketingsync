
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import DocumentEditorComponent from "@/components/documents/DocumentEditor";
import { getDocumentById, documents } from "@/utils/dummyData";
import { toast } from "sonner";
import { Document } from "@/utils/types";

const DocumentEditorPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNewDocument = id === "new" || !id;
  
  const [document, setDocument] = useState<Document>({
    id: isNewDocument ? `doc-${Date.now()}` : "",
    title: "",
    content: "",
    clientId: user?.clientId || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: user?.id || "",
    status: "draft",
    tags: []
  });

  useEffect(() => {
    if (!isNewDocument && id) {
      const existingDocument = getDocumentById(id);
      if (existingDocument) {
        setDocument(existingDocument);
      } else {
        toast.error("Dokument nie został znaleziony");
        navigate("/documents");
      }
    }
  }, [id, isNewDocument, navigate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(prev => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (content: string) => {
    setDocument(prev => ({ ...prev, content, updatedAt: new Date().toISOString() }));
  };

  const handleSave = () => {
    if (!document.title.trim()) {
      toast.error("Tytuł dokumentu jest wymagany");
      return;
    }

    // In a real app, this would save to an API or database
    toast.success(`Dokument "${document.title}" został zapisany`);
    
    // For demo purposes, let's simply go back to the documents list
    navigate("/documents");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/documents")}>
            <ArrowLeft size={16} />
          </Button>
          <Input
            value={document.title}
            onChange={handleTitleChange}
            placeholder="Tytuł dokumentu"
            className="text-xl font-semibold w-96 h-10"
          />
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save size={16} />
          <span>Zapisz</span>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DocumentEditorComponent 
            document={document}
            onChange={handleContentChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentEditorPage;
