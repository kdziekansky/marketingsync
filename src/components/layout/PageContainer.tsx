
import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Na urządzeniach mobilnych, domyślnie ukrywamy sidebar
  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex min-h-screen flex-col">
      {isAuthenticated && <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
      
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}
        
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            isAuthenticated && !isMobile && isSidebarOpen ? "ml-64" : "ml-0"
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
