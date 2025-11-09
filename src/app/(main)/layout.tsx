import { AppHeader } from "@/components/global/app-header";
import { AppSidebar } from "@/components/global/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className=" bg-accent/20">
        <AppHeader />
        <main className="p-4 w-full h-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
