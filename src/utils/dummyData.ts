
import { User, Task, Document, Invoice, AdsData } from "./types";

// Użytkownicy
export const users: User[] = [
  {
    id: "1",
    name: "Jan Kowalski",
    email: "jan@agencja.pl",
    role: "superadmin",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Anna Nowak",
    email: "anna@agencja.pl",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "3",
    name: "Tomasz Wiśniewski",
    email: "tomasz@agencja.pl",
    role: "employee",
    departmentId: "1",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Monika Lewandowska",
    email: "monika@agencja.pl",
    role: "employee",
    departmentId: "2",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "Firma ABC",
    email: "kontakt@abc.pl",
    role: "client",
    clientId: "1",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: "6",
    name: "XYZ Sp. z o.o.",
    email: "biuro@xyz.pl",
    role: "client",
    clientId: "2",
    avatar: "https://i.pravatar.cc/150?img=10"
  }
];

// Klienci
export const clients = [
  {
    id: "1",
    name: "Firma ABC",
    contactPerson: "Adam Nowacki",
    email: "kontakt@abc.pl",
    phone: "+48 123 456 789",
    address: "ul. Główna 1, 00-001 Warszawa"
  },
  {
    id: "2",
    name: "XYZ Sp. z o.o.",
    contactPerson: "Zofia Kowalczyk",
    email: "biuro@xyz.pl",
    phone: "+48 987 654 321",
    address: "ul. Boczna 2, 00-002 Warszawa"
  }
];

// Zadania
export const tasks: Task[] = [
  {
    id: "1",
    title: "Przygotowanie kampanii Google Ads",
    description: "Przygotowanie kampanii reklamowej dla nowego produktu klienta",
    status: "pending",
    priority: "high",
    clientId: "1",
    assigneeId: "3",
    createdAt: "2023-05-15T10:00:00Z",
    dueDate: "2023-05-20T18:00:00Z",
    labels: ["google-ads", "kampania"]
  },
  {
    id: "2",
    title: "Aktualizacja strony www",
    description: "Aktualizacja treści na stronie głównej klienta",
    status: "in_progress",
    priority: "medium",
    clientId: "1",
    assigneeId: "4",
    createdAt: "2023-05-14T14:30:00Z",
    dueDate: "2023-05-18T16:00:00Z",
    labels: ["www", "content"]
  },
  {
    id: "3",
    title: "Raport z kampanii FB",
    description: "Przygotowanie raportu z wyników kampanii na Facebooku",
    status: "review",
    priority: "low",
    clientId: "2",
    assigneeId: "3",
    createdAt: "2023-05-10T09:15:00Z",
    dueDate: "2023-05-17T12:00:00Z",
    labels: ["facebook", "raport"]
  },
  {
    id: "4",
    title: "Projekt graficzny logo",
    description: "Przygotowanie projektu nowego logo dla klienta",
    status: "completed",
    priority: "high",
    clientId: "2",
    assigneeId: "4",
    createdAt: "2023-05-05T11:45:00Z",
    dueDate: "2023-05-15T15:00:00Z",
    labels: ["grafika", "logo"]
  }
];

// Dokumenty
export const documents: Document[] = [
  {
    id: "1",
    title: "Strategia marketingowa 2023",
    content: "# Strategia marketingowa\n\nTreść dokumentu strategii marketingowej...",
    clientId: "1",
    createdBy: "2",
    createdAt: "2023-04-10T10:00:00Z",
    updatedAt: "2023-04-15T14:30:00Z",
    sharedWith: ["3", "5"]
  },
  {
    id: "2",
    title: "Analiza konkurencji",
    content: "# Analiza konkurencji\n\nSzczegółowa analiza konkurencji w branży...",
    clientId: "2",
    createdBy: "3",
    createdAt: "2023-04-20T13:45:00Z",
    updatedAt: "2023-04-22T09:15:00Z",
    sharedWith: ["2", "6"]
  }
];

// Faktury
export const invoices: Invoice[] = [
  {
    id: "1",
    number: "FV/2023/05/001",
    clientId: "1",
    amount: 5000,
    currency: "PLN",
    issueDate: "2023-05-05T00:00:00Z",
    dueDate: "2023-05-19T00:00:00Z",
    status: "paid",
    items: [
      {
        id: "1",
        description: "Prowadzenie kampanii Google Ads",
        quantity: 1,
        unitPrice: 3000,
        total: 3000
      },
      {
        id: "2",
        description: "Obsługa mediów społecznościowych",
        quantity: 1,
        unitPrice: 2000,
        total: 2000
      }
    ]
  },
  {
    id: "2",
    number: "FV/2023/05/002",
    clientId: "2",
    amount: 7500,
    currency: "PLN",
    issueDate: "2023-05-10T00:00:00Z",
    dueDate: "2023-05-24T00:00:00Z",
    status: "sent",
    items: [
      {
        id: "3",
        description: "Projekt logo",
        quantity: 1,
        unitPrice: 2500,
        total: 2500
      },
      {
        id: "4",
        description: "Projekt strony www",
        quantity: 1,
        unitPrice: 5000,
        total: 5000
      }
    ]
  }
];

// Dane Google Ads
export const adsData: AdsData[] = [
  {
    id: "1",
    clientId: "1",
    campaignName: "Kampania produktowa",
    impressions: 12500,
    clicks: 750,
    conversions: 25,
    cost: 1500,
    ctr: 6.0,
    date: "2023-05-01T00:00:00Z"
  },
  {
    id: "2",
    clientId: "1",
    campaignName: "Kampania brandowa",
    impressions: 8000,
    clicks: 600,
    conversions: 20,
    cost: 1200,
    ctr: 7.5,
    date: "2023-05-01T00:00:00Z"
  },
  {
    id: "3",
    clientId: "2",
    campaignName: "Kampania wizerunkowa",
    impressions: 15000,
    clicks: 900,
    conversions: 30,
    cost: 1800,
    ctr: 6.0,
    date: "2023-05-01T00:00:00Z"
  }
];

// Funkcje pomocnicze do pobierania danych

export const getTasksByClientId = (clientId: string): Task[] => {
  return tasks.filter(task => task.clientId === clientId);
};

export const getTasksByAssigneeId = (assigneeId: string): Task[] => {
  return tasks.filter(task => task.assigneeId === assigneeId);
};

export const getDocumentsByClientId = (clientId: string): Document[] => {
  return documents.filter(doc => doc.clientId === clientId);
};

export const getInvoicesByClientId = (clientId: string): Invoice[] => {
  return invoices.filter(invoice => invoice.clientId === clientId);
};

export const getAdsDataByClientId = (clientId: string): AdsData[] => {
  return adsData.filter(data => data.clientId === clientId);
};

export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

export const getClientById = (clientId: string) => {
  return clients.find(client => client.id === clientId);
};
