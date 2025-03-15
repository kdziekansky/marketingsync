
import React, { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import { useNavigate, useLocation } from "react-router-dom";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { isAuthenticated, isLoading, session } = useSupabaseAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Przekieruj do logowania, jeśli użytkownik nie jest zalogowany
  useEffect(() => {
    console.log("PageContainer sprawdza autentykację:", { 
      isAuthenticated, 
      isLoading, 
      currentPath: location.pathname,
      session: session ? "istnieje" : "brak" 
    });
    
    // Publiczne ścieżki, które nie wymagają logowania
    const publicPaths = ['/login', '/register', '/auth/callback', '/reset-password'];
    const isPublicPath = publicPaths.includes(location.pathname);
    
    if (!isLoading && !isAuthenticated && !isPublicPath) {
      console.log("Użytkownik nie jest zalogowany, przekierowuję do /login");
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname, session]);

  // Na urządzeniach mobilnych, domyślnie ukrywamy sidebar
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  // Jeśli trwa ładowanie lub użytkownik nie jest zalogowany na chronionej ścieżce, wyświetl loader
  const publicPaths = ['/login', '/register', '/auth/callback', '/reset-password'];
  const isPublicPath = publicPaths.includes(location.pathname);
  
  if (isLoading || (!isAuthenticated && !isPublicPath)) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Ładowanie...</div>
    </div>;
  }

  // Jeśli to publiczna ścieżka, nie pokazuj układu z Sidebar i Navbar
  if (isPublicPath) {
    return <div className="min-h-screen">{children}</div>;
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
