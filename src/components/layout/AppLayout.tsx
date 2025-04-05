
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "@/types";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MobileHeader } from "./MobileHeader";

interface AppLayoutProps {
  user: User | null;
  onLogout: () => void;
}

const AppLayout = ({ user, onLogout }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar user={user} onLogout={onLogout} />
        <div className="flex-1 flex flex-col h-screen">
          <MobileHeader user={user} />
          <main className="flex-1 overflow-auto p-4 md:p-6 pb-16">
            <div className="campus-container">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
