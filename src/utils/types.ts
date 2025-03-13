
export type UserRole = 'superadmin' | 'admin' | 'employee' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  clientId?: string; // For client users (references clients table)
}

export interface Client {
  id: string;
  name: string;
  logoUrl?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'review' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  clientId: string;
  assigneeId?: string;
  createdAt: string; // ISO date string
  dueDate?: string; // ISO date string
  priority: 'low' | 'medium' | 'high';
  attachments?: string[]; // URLs to attachments
  tags?: string[];
}

export interface Document {
  id: string;
  title: string;
  content: string; // HTML or rich text content
  clientId: string;
  createdById: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isTemplate: boolean;
  isPublic: boolean;
  tags?: string[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  issuedAt: string; // ISO date string
  dueAt: string; // ISO date string
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface AdsData {
  id: string;
  clientId: string;
  campaignId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cost: number;
  period: string; // e.g., "last_7_days", "last_30_days", etc.
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles: UserRole[];
}
