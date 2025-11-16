"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { menuItems } from "@/const";
import { CreditCardIcon, LogOutIcon, StarIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppSidebar = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sidebar className="" collapsible="icon">
      <SidebarHeader className="flex border-b">
        <div className=" flex items-center w-full justify-between">
          <SidebarMenu className="flex w-full">
            <SidebarMenuButton asChild className="flex w-full">
              <Link
                href="/dashboard"
                className="flex gap-2 group-data-[collapsible=icon]:hidden"
              >
                <Image width={15} height={15} alt="logo" src="/logo.svg" />
                <span className=" font-semibold text-sm">D-invoice</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>

          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((gp) => (
          <SidebarGroup key={gp.title}>
            <SidebarGroupContent className=" space-y-1">
              <SidebarMenu>
                {gp.items.map((it) => (
                  <SidebarMenuItem key={it.title}>
                    <SidebarMenuButton
                      tooltip={it.title}
                      isActive={
                        it.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(it.url)
                      }
                      asChild
                      className=" gap-x-4 h-9 px-4"
                    >
                      <Link prefetch href={it.url}>
                        <it.icon className=" size-4 " />
                        <span className=" ">{it.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className=" py-2 ">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Switch theme"
                  className="gap-x-2 cursor-pointer"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                  <span>Switch theme</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <SidebarMenuButton tooltip={"update to pro"} className=" gap-x-4">
              <CreditCardIcon className=" size-4" />
              <span>Billings </span>
            </SidebarMenuButton>
            <SidebarMenuButton
              tooltip={"sign out"}
              className=" gap-x-4"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/auth/sign-in");
                    },
                  },
                })
              }
            >
              <LogOutIcon className=" size-4" />
              <span>Sign out </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
