
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageContainer from "@/components/layout/PageContainer";
import Tasks from "./pages/Tasks";
import Documents from "./pages/Documents";
import Invoices from "./pages/Invoices";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";

// Import new page components
import DocumentEditor from "./pages/DocumentEditor";
import InvoiceCreate from "./pages/InvoiceCreate";
import TaskDetails from "./pages/TaskDetails";
import CampaignDetails from "./pages/CampaignDetails";
import ReportCreate from "./pages/ReportCreate";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Users from "./pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageContainer>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Task routes */}
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />
              <Route path="/tasks/new" element={<TaskDetails />} />
              
              {/* Document routes */}
              <Route path="/documents" element={<Documents />} />
              <Route path="/documents/:id" element={<DocumentEditor />} />
              <Route path="/documents/new" element={<DocumentEditor />} />
              
              {/* Invoice routes */}
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id" element={<InvoiceCreate />} />
              <Route path="/invoices/new" element={<InvoiceCreate />} />
              
              {/* Campaign routes */}
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/:id" element={<CampaignDetails />} />
              <Route path="/campaigns/new" element={<CampaignDetails />} />
              
              {/* Report routes */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:id" element={<ReportCreate />} />
              <Route path="/reports/new" element={<ReportCreate />} />
              
              {/* Admin routes */}
              <Route path="/clients" element={<Clients />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/users" element={<Users />} />
              
              {/* User routes */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageContainer>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
