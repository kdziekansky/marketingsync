
import React from "react";
import { Invoice } from "@/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useAuth } from "@/components/auth/AuthContext";

interface InvoiceListProps {
  invoices: Invoice[];
  onViewInvoice?: (invoice: Invoice) => void;
}

const statusStyles: Record<
  string,
  { color: string; label: string }
> = {
  draft: { color: "bg-slate-100 text-slate-800", label: "Szkic" },
  sent: { color: "bg-blue-100 text-blue-800", label: "Wysłana" },
  paid: { color: "bg-green-100 text-green-800", label: "Opłacona" },
  overdue: { color: "bg-red-100 text-red-800", label: "Zaległa" },
  cancelled: { color: "bg-slate-100 text-slate-800", label: "Anulowana" },
};

export const InvoiceList = ({ invoices, onViewInvoice }: InvoiceListProps) => {
  const { user } = useAuth();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "d MMM yyyy", { locale: pl });
  };

  return (
    <div className="space-y-4">
      {invoices.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <Receipt size={48} className="text-slate-300" />
            <h3 className="text-xl font-medium">Brak faktur</h3>
            <p className="text-muted-foreground">
              W tym momencie nie masz żadnych faktur.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card
              key={invoice.id}
              className="overflow-hidden animate-fade-in"
              style={{ animationDelay: `${Math.random() * 0.3}s` }}
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Receipt size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Faktura {invoice.invoiceNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Wystawiona {formatDate(invoice.issuedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-2">
                    <Badge
                      className={cn(
                        "rounded-full px-3",
                        statusStyles[invoice.status].color
                      )}
                    >
                      {statusStyles[invoice.status].label}
                    </Badge>
                    <span className="text-lg font-medium">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    <span>Termin płatności: </span>
                    <span className="font-medium text-foreground">
                      {formatDate(invoice.dueAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => onViewInvoice && onViewInvoice(invoice)}
                    >
                      <Eye size={16} />
                      <span>Podgląd</span>
                    </Button>
                    <Button variant="default" size="sm" className="gap-2">
                      <Download size={16} />
                      <span>Pobierz PDF</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
