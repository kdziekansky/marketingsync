
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import PageContainer from "@/components/layout/PageContainer";
import { ThemeProvider } from "next-themes";

// Pages
import Index from "@/pages/Index";
import Tasks from "@/pages/Tasks";
import TaskDetails from "@/pages/TaskDetails";
import Documents from "@/pages/Documents";
import DocumentEditor from "@/pages/DocumentEditor";
import Invoices from "@/pages/Invoices";
import InvoiceCreate from "@/pages/InvoiceCreate";
import Clients from "@/pages/Clients";
import Campaigns from "@/pages/Campaigns";
import CampaignDetails from "@/pages/CampaignDetails";
import Reports from "@/pages/Reports";
import ReportCreate from "@/pages/ReportCreate";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Users from "@/pages/Users";
import Employees from "@/pages/Employees";
import NotFound from "@/pages/NotFound";
import Help from "@/pages/Help";

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import AuthCallback from "@/components/auth/AuthCallback";

// Auth Context
import { SupabaseAuthProvider } from "@/components/auth/SupabaseAuthContext";
import { AuthProvider } from "@/components/auth/AuthContext";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseAuthProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Ścieżki uwierzytelniania bez layoutu */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Strony z layoutem */}
              <Route
                path="*"
                element={
                  <PageContainer>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/tasks/:id" element={<TaskDetails />} />
                      <Route path="/documents" element={<Documents />} />
                      <Route path="/documents/:id" element={<DocumentEditor />} />
                      <Route path="/invoices" element={<Invoices />} />
                      <Route path="/invoices/new" element={<InvoiceCreate />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route path="/campaigns/:id" element={<CampaignDetails />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/reports/new" element={<ReportCreate />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </PageContainer>
                }
              />
            </Routes>
            <Toaster position="top-right" />
          </Router>
        </AuthProvider>
      </SupabaseAuthProvider>
    </ThemeProvider>
  );
}

export default App;
