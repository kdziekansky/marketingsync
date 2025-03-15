
import React, { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSupabaseAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMobile();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Przekieruj do logowania, jeśli użytkownik nie jest zalogowany
  useEffect(() => {
    console.log("PageContainer sprawdza autentykację:", { isAuthenticated, isLoading });
    if (!isLoading && !isAuthenticated) {
      console.log("Użytkownik nie jest zalogowany, przekierowuję do /login");
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Na urządzeniach mobilnych, domyślnie ukrywamy sidebar
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  // Jeśli trwa ładowanie lub użytkownik nie jest zalogowany, wyświetl pusty kontener
  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Ładowanie...</div>
    </div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            !isMobile && isSidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Overlay do zamykania sidebara na urządzeniach mobilnych */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default PageContainer;
