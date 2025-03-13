import { Task, Document, Invoice, User, Client } from "./types";

// Dummy data for tasks
export const tasks: Task[] = [
  {
    id: "1",
    title: "Stworzenie landing page",
    description: "Zaprojektowanie i wdrożenie landing page dla nowego produktu.",
    status: "in progress",
    assigneeId: "3",
    clientId: "1",
    createdAt: "2023-08-01T10:00:00Z",
    dueDate: "2023-08-15T16:00:00Z",
    priority: "high",
    tags: ["web", "design", "marketing"],
  },
  {
    id: "2",
    title: "Kampania Google Ads",
    description: "Uruchomienie i optymalizacja kampanii Google Ads.",
    status: "todo",
    assigneeId: "2",
    clientId: "2",
    createdAt: "2023-08-05T09:00:00Z",
    dueDate: "2023-08-20T17:00:00Z",
    priority: "medium",
    tags: ["ads", "google", "ppc"],
  },
  {
    id: "3",
    title: "Raport SEO",
    description: "Przygotowanie raportu SEO dla klienta.",
    status: "completed",
    assigneeId: "3",
    clientId: "1",
    createdAt: "2023-07-20T14:00:00Z",
    dueDate: "2023-07-30T18:00:00Z",
    priority: "low",
    tags: ["seo", "raport", "analiza"],
  },
];

export const documents: Document[] = [
  {
    id: "doc1",
    title: "Strategia marketingowa Q2 2023",
    content: "<h1>Strategia marketingowa Q2 2023</h1><p>To jest przykładowy dokument zawierający strategię marketingową na drugi kwartał 2023.</p>",
    clientId: "client1",
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-20T14:45:00Z",
    createdBy: "user1",
    status: "published",
    tags: ["marketing", "strategia", "2023"]
  },
  {
    id: "doc2",
    title: "Raport SEO - Czerwiec 2023",
    content: "<h1>Raport SEO - Czerwiec 2023</h1><p>Miesięczny raport z działań SEO za czerwiec 2023.</p><ul><li>Wzrost ruchu o 15%</li><li>Poprawa pozycji dla 10 kluczowych fraz</li></ul>",
    clientId: "client1",
    createdAt: "2023-07-02T09:15:00Z",
    updatedAt: "2023-07-02T09:15:00Z",
    createdBy: "user2",
    status: "draft",
    tags: ["SEO", "raport", "2023"]
  },
  {
    id: "doc3",
    title: "Kampania Google Ads - Analiza",
    content: "<h1>Kampania Google Ads - Analiza</h1><p>Analiza wyników kampanii reklamowej w Google Ads za ostatni kwartał.</p>",
    clientId: "client2",
    createdAt: "2023-05-20T11:00:00Z",
    updatedAt: "2023-06-01T13:30:00Z",
    createdBy: "user3",
    status: "published",
    tags: ["Google Ads", "analiza", "kampania"]
  }
];

export const invoices: Invoice[] = [
  {
    id: "inv1",
    number: "FV/2023/01/001",
    invoiceNumber: "FV/2023/01/001",
    clientId: "client1",
    amount: 1500,
    currency: "PLN",
    issueDate: "2023-01-15T00:00:00Z",
    issuedAt: "2023-01-15T00:00:00Z",
    dueDate: "2023-01-29T00:00:00Z",
    dueAt: "2023-01-29T00:00:00Z",
    items: [
      {
        id: "item1",
        description: "Usługi marketingowe - styczeń 2023",
        quantity: 1,
        unitPrice: 1500,
        amount: 1500,
        total: 1500
      }
    ],
    subtotal: 1500,
    taxRate: 23,
    taxAmount: 345,
    total: 1845,
    status: "paid",
    notes: ""
  },
  {
    id: "inv2",
    number: "FV/2023/02/001",
    invoiceNumber: "FV/2023/02/001",
    clientId: "client1",
    amount: 2000,
    currency: "PLN",
    issueDate: "2023-02-15T00:00:00Z",
    issuedAt: "2023-02-15T00:00:00Z",
    dueDate: "2023-02-28T00:00:00Z",
    dueAt: "2023-02-28T00:00:00Z",
    items: [
      {
        id: "item2",
        description: "Usługi marketingowe - luty 2023",
        quantity: 1,
        unitPrice: 1500,
        amount: 1500,
        total: 1500
      },
      {
        id: "item3",
        description: "Dodatkowe prace graficzne",
        quantity: 5,
        unitPrice: 100,
        amount: 500,
        total: 500
      }
    ],
    subtotal: 2000,
    taxRate: 23,
    taxAmount: 460,
    total: 2460,
    status: "paid",
    notes: ""
  },
  {
    id: "inv3",
    number: "FV/2023/03/001",
    invoiceNumber: "FV/2023/03/001",
    clientId: "client2",
    amount: 3000,
    currency: "PLN",
    issueDate: "2023-03-10T00:00:00Z",
    issuedAt: "2023-03-10T00:00:00Z",
    dueDate: "2023-03-24T00:00:00Z",
    dueAt: "2023-03-24T00:00:00Z",
    items: [
      {
        id: "item4",
        description: "Kampania Google Ads - marzec 2023",
        quantity: 1,
        unitPrice: 3000,
        amount: 3000,
        total: 3000
      }
    ],
    subtotal: 3000,
    taxRate: 23,
    taxAmount: 690,
    total: 3690,
    status: "sent",
    notes: "Prosimy o terminową wpłatę"
  }
];

// Dummy data for users
export const users: User[] = [
  {
    id: "1",
    name: "Jan Kowalski",
    email: "jan@agencja.pl",
    role: "superadmin",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Jan",
  },
  {
    id: "2",
    name: "Anna Nowak",
    email: "anna@agencja.pl",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Anna",
  },
  {
    id: "3",
    name: "Tomasz Wiśniewski",
    email: "tomasz@agencja.pl",
    role: "employee",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Tomasz",
  },
  {
    id: "4",
    name: "Adam Nowak",
    email: "kontakt@abc.pl",
    role: "client",
    clientId: "1",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Adam",
  },
  {
    id: "5",
    name: "Ewa Jankowska",
    email: "ewa@xyz.pl",
    role: "client",
    clientId: "2",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Ewa",
  },
];

// Dummy data for clients
export const clients: Client[] = [
  {
    id: "1",
    name: "ABC Sp. z o.o.",
    email: "kontakt@abc.pl",
    phone: "123-456-789",
    address: "ul. Kwiatowa 1, 00-001 Warszawa",
  },
  {
    id: "2",
    name: "XYZ S.A.",
    email: "ewa@xyz.pl",
    phone: "987-654-321",
    address: "pl. Wolności 10, 30-001 Kraków",
  },
];

// Helper functions to get data by ID
export const getTaskById = (id: string) => {
  return tasks.find(task => task.id === id) || null;
};

export const getDocumentById = (id: string) => {
  return documents.find(doc => doc.id === id) || null;
};

export const getInvoiceById = (id: string) => {
  return invoices.find(invoice => invoice.id === id) || null;
};

// Helper functions to filter data by client ID or assignee ID
export const getTasksByClientId = (clientId: string) => {
  return tasks.filter(task => task.clientId === clientId);
};

export const getInvoicesByClientId = (clientId: string) => {
  return invoices.filter(invoice => invoice.clientId === clientId);
};

export const getTasksByAssigneeId = (assigneeId: string) => {
  return tasks.filter(task => task.assigneeId === assigneeId);
};
