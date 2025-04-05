
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { 
  BookOpen, 
  CalendarIcon, 
  HomeIcon, 
  Map, 
  Users, 
  Bell, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  user: User | null;
  onLogout: () => void;
}

export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const location = useLocation();
  const [roleColor, setRoleColor] = useState<string>("");
  
  useEffect(() => {
    if (user?.role === "student") setRoleColor("bg-campus-student");
    else if (user?.role === "faculty") setRoleColor("bg-campus-secondary");
    else if (user?.role === "staff") setRoleColor("bg-campus-accent");
  }, [user]);

  // Base navigation items for all users
  const navItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
      showFor: ["student", "faculty", "staff"],
    },
    {
      name: "Campus Map",
      icon: Map,
      path: "/map",
      showFor: ["student", "faculty", "staff"],
    },
    {
      name: "Events",
      icon: CalendarIcon,
      path: "/events",
      showFor: ["student", "faculty", "staff"],
    },
    {
      name: "Clubs",
      icon: Users,
      path: "/clubs",
      showFor: ["student", "faculty"],
    },
    {
      name: "Subjects",
      icon: BookOpen,
      path: "/subjects",
      showFor: ["student"], // Changed: only show for students
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
      showFor: ["student", "faculty", "staff"],
    },
    {
      name: "Support",
      icon: HelpCircle,
      path: "/support",
      showFor: ["student", "faculty", "staff"],
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => 
    user && item.showFor.includes(user.role)
  );

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 mb-2">
        <div className="flex items-center space-x-2">
          <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-white", roleColor)}>
            CA
          </div>
          <div>
            <h2 className="text-lg font-bold">Campus APP</h2>
            {user && (
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {user ? (
          <SidebarMenu>
            {filteredNavItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            Please log in to access navigation.
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <>
            <SidebarSeparator />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
