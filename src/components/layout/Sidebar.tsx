
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  Receipt,
  ChartLine,
  Settings,
  HelpCircle,
  Briefcase,
  FilePieChart,
  UserCog,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  allowedRoles: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={20} />,
    allowedRoles: ["superadmin", "admin", "employee", "client"],
  },
  {
    title: "Zadania",
    href: "/tasks",
    icon: <ClipboardList size={20} />,
    allowedRoles: ["superadmin", "admin", "employee", "client"],
  },
  {
    title: "Dokumenty",
    href: "/documents",
    icon: <FileText size={20} />,
    allowedRoles: ["superadmin", "admin", "employee", "client"],
  },
  {
    title: "Faktury",
    href: "/invoices",
    icon: <Receipt size={20} />,
    allowedRoles: ["superadmin", "admin", "client"],
  },
  {
    title: "Kampanie",
    href: "/campaigns",
    icon: <ChartLine size={20} />,
    allowedRoles: ["superadmin", "admin", "employee", "client"],
  },
  {
    title: "Klienci",
    href: "/clients",
    icon: <Briefcase size={20} />,
    allowedRoles: ["superadmin", "admin", "employee"],
  },
  {
    title: "Pracownicy",
    href: "/employees",
    icon: <Users size={20} />,
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Raporty",
    href: "/reports",
    icon: <FilePieChart size={20} />,
    allowedRoles: ["superadmin", "admin"],
  },
  {
    title: "Użytkownicy",
    href: "/users",
    icon: <UserCog size={20} />,
    allowedRoles: ["superadmin"],
  },
  {
    title: "Ustawienia",
    href: "/settings",
    icon: <Settings size={20} />,
    allowedRoles: ["superadmin", "admin", "employee", "client"],
  },
  {
    title: "Pomoc",
    href: "/help",
    icon: <HelpCircle size={20} />,
    allowedRoles: ["superadmin", "admin", "employee", "client"],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  // Filtrowanie elementów menu na podstawie roli użytkownika
  const filteredItems = sidebarItems.filter((item) => {
    if (!user) return false;
    return item.allowedRoles.includes(user.role);
  });

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Digital Agency</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {filteredItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="rounded-full bg-sidebar-accent w-8 h-8 flex items-center justify-center text-sm font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-sidebar-foreground/70">{user.role}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
