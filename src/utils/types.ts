
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
}

// Typy dla faktur
export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
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
