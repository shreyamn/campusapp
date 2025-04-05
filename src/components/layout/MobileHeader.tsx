
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface MobileHeaderProps {
  user: User | null;
}

export function MobileHeader({ user }: MobileHeaderProps) {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [roleColor, setRoleColor] = useState<string>("");
  
  // Set page title based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("dashboard")) setPageTitle("Dashboard");
    else if (path.includes("map")) setPageTitle("Campus Map");
    else if (path.includes("events")) setPageTitle("Events");
    else if (path.includes("clubs")) setPageTitle("Clubs");
    else if (path.includes("subjects")) setPageTitle("Subjects");
    else if (path.includes("notifications")) setPageTitle("Notifications");
    else if (path.includes("support")) setPageTitle("Support");
    else setPageTitle("Campus APP");
  }, [location]);
  
  // Set color based on user role
  useEffect(() => {
    if (user?.role === "student") setRoleColor("border-campus-student");
    else if (user?.role === "faculty") setRoleColor("border-campus-secondary");
    else if (user?.role === "staff") setRoleColor("border-campus-accent");
  }, [user]);

  return (
    <header className="block md:hidden border-b z-10">
      <div className="flex items-center h-14 px-4">
        <SidebarTrigger />
        <div className={cn("h-8 mx-3 border-l-2", roleColor)} />
        <h2 className="font-medium text-lg">{pageTitle}</h2>
      </div>
    </header>
  );
}
