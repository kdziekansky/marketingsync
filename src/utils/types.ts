
// Typy użytkowników
export type UserRole = "superadmin" | "admin" | "employee" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  clientId?: string; // Tylko dla roli "client"
  departmentId?: string; // Tylko dla roli "employee"
}

// Typy dla zadań
export type TaskStatus = "pending" | "in_progress" | "review" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  clientId: string;
  assigneeId?: string;
  createdAt: string;
  dueDate?: string;
  labels: string[];
  tags?: string[]; // Dodane pole dla kompatybilności z TaskCard
  attachments?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

// Typy dla dokumentów
export interface Document {
  id: string;
  title: string;
  content: string;
  clientId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sharedWith: string[];
  tags?: string[]; // Dodane pole dla kompatybilności z DocumentEditor
}

// Typy dla faktur
export interface Invoice {
  id: string;
  number: string; // Oryginalne pole
  invoiceNumber?: string; // Dodane dla kompatybilności z InvoiceForm/List
  clientId: string;
  amount: number;
  currency: string;
  issueDate: string;
  issuedAt?: string; // Dodane dla kompatybilności z InvoiceForm/List
  dueDate: string;
  dueAt?: string; // Dodane dla kompatybilności z InvoiceForm/List
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  items: InvoiceItem[];
  notes?: string; // Dodane dla kompatybilności z InvoiceForm
  taxRate?: number; // Dodane dla kompatybilności z InvoiceForm
  taxAmount?: number; // Dodane dla kompatybilności z InvoiceForm
  subtotal?: number; // Dodane dla kompatybilności z InvoiceForm
  total?: number; // Dodane dla kompatybilności z InvoiceForm/List
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number; // Wymagane pole
  amount?: number; // Dodane dla kompatybilności z InvoiceForm, używane zamiennie z total
}

// Dodajemy typ Client, który jest używany w InvoiceForm
export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

// Typy dla danych Google Ads
export interface AdsData {
  id: string;
  clientId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  date: string;
}
