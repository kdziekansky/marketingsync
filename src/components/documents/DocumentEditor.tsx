
import React, { useState } from "react";
import { Document } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, FileText, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface DocumentEditorProps {
  document: Document;
  onSave?: (updatedDoc: Document) => void;
  readOnly?: boolean;
}

export const DocumentEditor = ({
  document,
  onSave,
  readOnly = false,
}: DocumentEditorProps) => {
  const [editedDoc, setEditedDoc] = useState<Document>({ ...document });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!editedDoc.title.trim()) {
      toast.error("Tytuł dokumentu nie może być pusty");
      return;
    }

    setIsSaving(true);
    // Simulate saving delay
    setTimeout(() => {
      if (onSave) {
        onSave({
          ...editedDoc,
          updatedAt: new Date().toISOString(),
        });
      }
      setIsSaving(false);
      toast.success("Dokument został zapisany");
    }, 800);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDoc({ ...editedDoc, content: e.target.value });
  };

  const formattedDate = format(new Date(document.updatedAt), "d MMMM yyyy, HH:mm", {
    locale: pl,
  });

  return (
    <div className="w-full animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              <h2 className="text-xl font-semibold">
                {readOnly ? document.title : "Edycja dokumentu"}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{formattedDate}</span>
              </div>
              {document.tags && document.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag size={14} />
                  <div className="flex gap-1">
                    {document.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs rounded-full px-2 py-0 h-5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!readOnly && (
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2"
            >
              <Save size={16} />
              <span>{isSaving ? "Zapisywanie..." : "Zapisz"}</span>
            </Button>
          )}
        </div>

        <Card className="border border-slate-200 dark:border-slate-800 overflow-hidden">
          <CardContent className="p-0">
            {!readOnly && (
              <Input
                value={editedDoc.title}
                onChange={(e) =>
                  setEditedDoc({ ...editedDoc, title: e.target.value })
                }
                placeholder="Tytuł dokumentu"
                className="w-full border-0 border-b rounded-none text-lg py-4 px-6 font-medium focus:ring-0"
              />
            )}
            <div className="min-h-[500px] p-6">
              {readOnly ? (
                <div
                  className="prose prose-slate dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: document.content }}
                />
              ) : (
                <div className="h-full">
                  <textarea
                    value={editedDoc.content.replace(/<[^>]*>/g, "")}
                    onChange={handleContentChange}
                    placeholder="Treść dokumentu..."
                    className="w-full h-full min-h-[400px] resize-none border-0 bg-transparent focus:ring-0 text-sm"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentEditor;
