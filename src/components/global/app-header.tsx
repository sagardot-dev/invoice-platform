import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "./mode-toggle";


export const AppHeader = () => {
  return (
    <header className=" flex h-[49px] shrink-0 items-center justify-between gap-2 px-4 border-b bg-background ">
      <SidebarTrigger />
      <ModeToggle/>
    </header>
  );
};
