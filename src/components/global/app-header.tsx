import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode-toggle";


export const AppHeader = () => {
  return (
    <header className=" flex h-12 shrink-0 items-center justify-between gap-2 px-4 border-b bg-background">
      <SidebarTrigger />
      <ModeToggle/>
    </header>
  );
};
