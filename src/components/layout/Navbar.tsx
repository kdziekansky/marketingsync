
import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { UserRole } from "@/utils/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  LogOut,
  Menu,
  Bell,
  X,
  HelpCircle,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const ROLE_COLORS: Record<UserRole, string> = {
  superadmin: "bg-purple-500",
  admin: "bg-blue-500",
  employee: "bg-green-500",
  client: "bg-orange-500",
};

export const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (!user) {
    return null;
  }

  const roleColor = ROLE_COLORS[user.role];
  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-slate-200 dark:border-slate-800">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="ml-4 lg:ml-0">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-semibold animate-pulse-subtle"
            >
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                MarketingSync
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-float"
          >
            <Bell size={18} className="text-slate-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-float"
            style={{ animationDelay: "0.2s" }}
          >
            <HelpCircle size={18} className="text-slate-500" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span
                  className={cn(
                    "absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white",
                    roleColor
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-fade-in">
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span>{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center justify-center w-fit mt-1">
                  {roleLabel}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ustawienia</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Wyloguj</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
