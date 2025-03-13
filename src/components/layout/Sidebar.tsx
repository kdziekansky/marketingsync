
import React from "react";
import { cn } from "@/lib/utils";
import { NavItem, UserRole } from "@/utils/types";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Receipt,
  BarChart4,
  Users,
  Settings,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// For demo purposes, easily switch between roles
const DEMO_MODE = true;

const SidebarNav = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { user, setDemoUserRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  // Define navigation items with roles that can access them
  const navItems: { icon: LucideIcon; label: string; href: string; roles: UserRole[] }[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", roles: ["superadmin", "admin", "employee", "client"] },
    { icon: ClipboardList, label: "Zadania", href: "/tasks", roles: ["superadmin", "admin", "employee", "client"] },
    { icon: FileText, label: "Dokumenty", href: "/documents", roles: ["superadmin", "admin", "employee", "client"] },
    { icon: Receipt, label: "Faktury", href: "/invoices", roles: ["superadmin", "admin", "client"] },
    { icon: BarChart4, label: "Statystyki", href: "/analytics", roles: ["superadmin", "admin", "client"] },
    { icon: Users, label: "Klienci", href: "/clients", roles: ["superadmin", "admin"] },
    { icon: Settings, label: "Ustawienia", href: "/settings", roles: ["superadmin"] },
  ];

  // Filter items based on user role
  const filteredItems = navItems.filter((item) =>
    item.roles.includes(user.role)
  );

  const handleRoleChange = (role: UserRole) => {
    setDemoUserRole(role);
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="py-4">
          <div className="px-3 py-2">
            <div className="section-title">Menu główne</div>
            <nav className="grid gap-1 px-2">
              {filteredItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start gap-2",
                      isActive && "bg-accent text-accent-foreground",
                      !isCollapsed && "h-10"
                    )}
                    onClick={() => navigate(item.href)}
                  >
                    <item.icon size={18} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                );
              })}
            </nav>
          </div>

          {DEMO_MODE && (
            <div className="px-3 py-2">
              <div className="section-title">Demo: Zmień rolę</div>
              <div className="grid gap-1 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 gap-2"
                  onClick={() => handleRoleChange("superadmin")}
                >
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  {!isCollapsed && <span>Super Admin</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 gap-2"
                  onClick={() => handleRoleChange("admin")}
                >
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  {!isCollapsed && <span>Admin</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 gap-2"
                  onClick={() => handleRoleChange("employee")}
                >
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {!isCollapsed && <span>Pracownik</span>}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 gap-2"
                  onClick={() => handleRoleChange("client")}
                >
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  {!isCollapsed && <span>Klient</span>}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="mt-auto p-4">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-2">
              <HelpCircle size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            {!isCollapsed && (
              <div>
                <h4 className="text-sm font-medium">Potrzebujesz pomocy?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Skontaktuj się z naszym wsparciem
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button
              className="w-full mt-3 text-xs h-8"
              variant="outline"
              onClick={() => {}}
            >
              Centrum pomocy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  // Close sidebar on mobile when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed z-30 inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarNav isCollapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
