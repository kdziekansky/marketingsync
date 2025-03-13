
import React, { useState } from "react";
import { Invoice, InvoiceItem, Client } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { clients } from "@/utils/dummyData";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `FV/${year}/${month}/${random}`;
};

const emptyInvoiceItem: InvoiceItem = {
  id: "",
  description: "",
  quantity: 1,
  unitPrice: 0,
  amount: 0,
};

export const InvoiceForm = ({ invoice, onSave, onCancel }: InvoiceFormProps) => {
  const isEditing = !!invoice;
  const [formData, setFormData] = useState<Invoice>(
    invoice || {
      id: "",
      invoiceNumber: generateInvoiceNumber(),
      clientId: "",
      issuedAt: new Date().toISOString(),
      dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      items: [{ ...emptyInvoiceItem, id: Math.random().toString(36).substring(2, 10) }],
      subtotal: 0,
      taxRate: 23,
      taxAmount: 0,
      total: 0,
      status: "draft",
    }
  );

  const handleClientChange = (value: string) => {
    setFormData({ ...formData, clientId: value });
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate amount
    if (field === "quantity" || field === "unitPrice") {
      newItems[index].amount = Number(newItems[index].quantity) * Number(newItems[index].unitPrice);
    }
    
    // Update invoice with new items and recalculate totals
    const subtotal = newItems.reduce((sum, item) => sum + Number(item.amount), 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount;
    
    setFormData({
      ...formData,
      items: newItems,
      subtotal,
      taxAmount,
      total,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { ...emptyInvoiceItem, id: Math.random().toString(36).substring(2, 10) },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) {
      toast.error("Faktura musi zawierać co najmniej jedną pozycję");
      return;
    }
    
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    
    // Recalculate totals
    const subtotal = newItems.reduce((sum, item) => sum + Number(item.amount), 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount;
    
    setFormData({
      ...formData,
      items: newItems,
      subtotal,
      taxAmount,
      total,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientId) {
      toast.error("Wybierz klienta");
      return;
    }
    
    if (formData.items.some(item => !item.description.trim())) {
      toast.error("Wszystkie pozycje muszą mieć opis");
      return;
    }
    
    const finalInvoice: Invoice = {
      ...formData,
      id: formData.id || Math.random().toString(36).substring(2, 10),
    };
    
    onSave(finalInvoice);
    toast.success(`Faktura ${isEditing ? "zaktualizowana" : "utworzona"}`);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft size={18} />
          </Button>
          <h2 className="text-2xl font-semibold">
            {isEditing ? "Edycja faktury" : "Nowa faktura"}
          </h2>
        </div>
        <Button type="submit" className="gap-2">
          <Save size={16} />
          <span>{isEditing ? "Aktualizuj" : "Utwórz fakturę"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="invoiceNumber">Numer faktury</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="client">Klient</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={handleClientChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz klienta" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issuedAt">Data wystawienia</Label>
                  <Input
                    id="issuedAt"
                    type="date"
                    value={formData.issuedAt.split("T")[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        issuedAt: new Date(e.target.value).toISOString(),
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dueAt">Termin płatności</Label>
                  <Input
                    id="dueAt"
                    type="date"
                    value={formData.dueAt.split("T")[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dueAt: new Date(e.target.value).toISOString(),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as Invoice["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Szkic</SelectItem>
                    <SelectItem value="sent">Wysłana</SelectItem>
                    <SelectItem value="paid">Opłacona</SelectItem>
                    <SelectItem value="overdue">Zaległa</SelectItem>
                    <SelectItem value="cancelled">Anulowana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Uwagi</Label>
                <Textarea
                  id="notes"
                  value={formData.notes || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="taxRate">Stawka VAT (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.taxRate}
                  onChange={(e) => {
                    const taxRate = Number(e.target.value);
                    const taxAmount = (formData.subtotal * taxRate) / 100;
                    const total = formData.subtotal + taxAmount;
                    setFormData({
                      ...formData,
                      taxRate,
                      taxAmount,
                      total,
                    });
                  }}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1 pt-4">
                <div className="flex justify-between">
                  <span>Suma netto:</span>
                  <span className="font-medium">{formatCurrency(formData.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT ({formData.taxRate}%):</span>
                  <span className="font-medium">{formatCurrency(formData.taxAmount)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Razem:</span>
                  <span className="font-bold">{formatCurrency(formData.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Pozycje faktury</h3>
            <Button type="button" onClick={addItem} className="gap-2">
              <Plus size={16} />
              <span>Dodaj pozycję</span>
            </Button>
          </div>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-md">
                <div className="col-span-12 md:col-span-5">
                  <Label htmlFor={`item-${index}-desc`}>Opis</Label>
                  <Input
                    id={`item-${index}-desc`}
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label htmlFor={`item-${index}-qty`}>Ilość</Label>
                  <Input
                    id={`item-${index}-qty`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", Number(e.target.value))
                    }
                    required
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <Label htmlFor={`item-${index}-price`}>Cena jedn.</Label>
                  <Input
                    id={`item-${index}-price`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", Number(e.target.value))
                    }
                    required
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <Label htmlFor={`item-${index}-amount`}>Kwota</Label>
                  <Input
                    id={`item-${index}-amount`}
                    value={formatCurrency(item.amount)}
                    readOnly
                    className="bg-slate-50"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default InvoiceForm;
