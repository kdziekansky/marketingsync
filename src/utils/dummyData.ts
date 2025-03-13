
import { User, Client, Task, Document, Invoice, AdsData, UserRole } from "./types";

// Helper to generate IDs
const generateId = (): string => Math.random().toString(36).substring(2, 10);

// Users
export const users: User[] = [
  {
    id: "user1",
    name: "Jan Kowalski",
    email: "jan@digitalagency.com",
    role: "superadmin",
    avatar: "https://ui-avatars.com/api/?name=Jan+Kowalski&background=0D8ABC&color=fff"
  },
  {
    id: "user2",
    name: "Anna Nowak",
    email: "anna@digitalagency.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Anna+Nowak&background=0D8ABC&color=fff"
  },
  {
    id: "user3",
    name: "Piotr Wiśniewski",
    email: "piotr@digitalagency.com",
    role: "employee",
    avatar: "https://ui-avatars.com/api/?name=Piotr+Wiśniewski&background=0D8ABC&color=fff"
  },
  {
    id: "user4",
    name: "Marta Lewandowska",
    email: "marta@digitalagency.com",
    role: "employee",
    avatar: "https://ui-avatars.com/api/?name=Marta+Lewandowska&background=0D8ABC&color=fff"
  },
  {
    id: "user5",
    name: "Tomasz Kamiński",
    email: "tomasz@client1.com",
    role: "client",
    clientId: "client1",
    avatar: "https://ui-avatars.com/api/?name=Tomasz+Kamiński&background=6E0DAB&color=fff"
  },
  {
    id: "user6",
    name: "Katarzyna Wójcik",
    email: "katarzyna@client2.com",
    role: "client",
    clientId: "client2",
    avatar: "https://ui-avatars.com/api/?name=Katarzyna+Wójcik&background=AB0D0D&color=fff"
  }
];

// Clients
export const clients: Client[] = [
  {
    id: "client1",
    name: "Firma ABC",
    logoUrl: "https://ui-avatars.com/api/?name=Firma+ABC&background=6E0DAB&color=fff&format=svg",
    contactName: "Tomasz Kamiński",
    contactEmail: "tomasz@client1.com",
    contactPhone: "+48 123 456 789"
  },
  {
    id: "client2",
    name: "Korporacja XYZ",
    logoUrl: "https://ui-avatars.com/api/?name=Korporacja+XYZ&background=AB0D0D&color=fff&format=svg",
    contactName: "Katarzyna Wójcik",
    contactEmail: "katarzyna@client2.com",
    contactPhone: "+48 987 654 321"
  }
];

// Tasks
export const tasks: Task[] = [
  {
    id: "task1",
    title: "Przygotowanie kampanii FB",
    description: "Przygotowanie kreacji graficznych i tekstów do kampanii na Facebook.",
    status: "in_progress",
    clientId: "client1",
    assigneeId: "user3",
    createdAt: "2023-06-01T10:00:00Z",
    dueDate: "2023-06-10T18:00:00Z",
    priority: "high",
    tags: ["facebook", "kreacja"]
  },
  {
    id: "task2",
    title: "Optymalizacja SEO",
    description: "Audyt i optymalizacja strony internetowej pod kątem SEO.",
    status: "pending",
    clientId: "client1",
    createdAt: "2023-06-02T09:30:00Z",
    dueDate: "2023-06-15T18:00:00Z",
    priority: "medium",
    tags: ["seo", "audyt"]
  },
  {
    id: "task3",
    title: "Raport miesięczny",
    description: "Przygotowanie raportu z wyników kampanii za ostatni miesiąc.",
    status: "completed",
    clientId: "client1",
    assigneeId: "user4",
    createdAt: "2023-05-25T14:00:00Z",
    dueDate: "2023-06-05T18:00:00Z",
    priority: "medium",
    tags: ["raport"]
  },
  {
    id: "task4",
    title: "Kampania Google Ads",
    description: "Przygotowanie i uruchomienie kampanii w Google Ads.",
    status: "review",
    clientId: "client2",
    assigneeId: "user3",
    createdAt: "2023-06-03T11:15:00Z",
    dueDate: "2023-06-12T18:00:00Z",
    priority: "high",
    tags: ["google ads", "ppc"]
  },
  {
    id: "task5",
    title: "Projekt graficzny ulotki",
    description: "Zaprojektowanie ulotki reklamowej w formacie A5.",
    status: "pending",
    clientId: "client2",
    createdAt: "2023-06-05T13:45:00Z",
    dueDate: "2023-06-20T18:00:00Z",
    priority: "low",
    tags: ["grafika", "druk"]
  }
];

// Documents
export const documents: Document[] = [
  {
    id: "doc1",
    title: "Strategia marketingowa 2023",
    content: "<h1>Strategia marketingowa 2023</h1><p>Ten dokument przedstawia strategię marketingową na rok 2023...</p>",
    clientId: "client1",
    createdById: "user2",
    createdAt: "2023-05-15T10:00:00Z",
    updatedAt: "2023-05-15T10:00:00Z",
    isTemplate: false,
    isPublic: true,
    tags: ["strategia", "marketing"]
  },
  {
    id: "doc2",
    title: "Raport z kampanii FB - maj 2023",
    content: "<h1>Raport z kampanii Facebook - maj 2023</h1><p>Wyniki kampanii reklamowej na Facebooku za maj 2023...</p>",
    clientId: "client1",
    createdById: "user3",
    createdAt: "2023-06-01T14:30:00Z",
    updatedAt: "2023-06-02T09:15:00Z",
    isTemplate: false,
    isPublic: true,
    tags: ["raport", "facebook"]
  },
  {
    id: "doc3",
    title: "Szablon raportu miesięcznego",
    content: "<h1>Raport miesięczny</h1><p>Szablon raportu miesięcznego dla klientów...</p>",
    clientId: "client1",
    createdById: "user2",
    createdAt: "2023-04-10T11:20:00Z",
    updatedAt: "2023-04-10T11:20:00Z",
    isTemplate: true,
    isPublic: false,
    tags: ["szablon", "raport"]
  }
];

// Invoices
export const invoices: Invoice[] = [
  {
    id: "inv1",
    invoiceNumber: "FV/2023/05/001",
    clientId: "client1",
    issuedAt: "2023-05-31T12:00:00Z",
    dueAt: "2023-06-14T12:00:00Z",
    items: [
      {
        id: "item1",
        description: "Prowadzenie kampanii w mediach społecznościowych",
        quantity: 1,
        unitPrice: 3000,
        amount: 3000
      },
      {
        id: "item2",
        description: "Optymalizacja SEO",
        quantity: 1,
        unitPrice: 2000,
        amount: 2000
      }
    ],
    subtotal: 5000,
    taxRate: 23,
    taxAmount: 1150,
    total: 6150,
    status: "paid",
    notes: "Faktura za usługi marketingowe za maj 2023."
  },
  {
    id: "inv2",
    invoiceNumber: "FV/2023/06/001",
    clientId: "client2",
    issuedAt: "2023-06-02T10:30:00Z",
    dueAt: "2023-06-16T10:30:00Z",
    items: [
      {
        id: "item3",
        description: "Przygotowanie i prowadzenie kampanii Google Ads",
        quantity: 1,
        unitPrice: 4000,
        amount: 4000
      }
    ],
    subtotal: 4000,
    taxRate: 23,
    taxAmount: 920,
    total: 4920,
    status: "sent",
    notes: "Faktura za usługi marketingowe za czerwiec 2023."
  }
];

// Google Ads data
export const adsData: AdsData[] = [
  {
    id: "ads1",
    clientId: "client1",
    campaignId: "c-123456",
    campaignName: "Kampania produktowa",
    impressions: 50000,
    clicks: 2500,
    ctr: 5.0,
    conversions: 125,
    cost: 3750,
    period: "last_30_days"
  },
  {
    id: "ads2",
    clientId: "client1",
    campaignId: "c-123457",
    campaignName: "Kampania brandowa",
    impressions: 30000,
    clicks: 1800,
    ctr: 6.0,
    conversions: 90,
    cost: 2700,
    period: "last_30_days"
  },
  {
    id: "ads3",
    clientId: "client2",
    campaignId: "c-234567",
    campaignName: "Kampania promocyjna",
    impressions: 45000,
    clicks: 2250,
    ctr: 5.0,
    conversions: 112,
    cost: 3375,
    period: "last_30_days"
  }
];

// Function to get current user by role for demo purposes
export const getCurrentUser = (role: UserRole): User => {
  const user = users.find(u => u.role === role);
  if (!user) {
    throw new Error(`No user found with role ${role}`);
  }
  return user;
};

// Function to get client by ID
export const getClientById = (id: string): Client | undefined => {
  return clients.find(client => client.id === id);
};

// Function to get tasks by client ID
export const getTasksByClientId = (clientId: string): Task[] => {
  return tasks.filter(task => task.clientId === clientId);
};

// Function to get invoices by client ID
export const getInvoicesByClientId = (clientId: string): Invoice[] => {
  return invoices.filter(invoice => invoice.clientId === clientId);
};

// Function to get documents by client ID
export const getDocumentsByClientId = (clientId: string): Document[] => {
  return documents.filter(doc => doc.clientId === clientId);
};

// Function to get ads data by client ID
export const getAdsDataByClientId = (clientId: string): AdsData[] => {
  return adsData.filter(data => data.clientId === clientId);
};
