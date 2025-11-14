import { CoinsIcon, PaperclipIcon, UserCheck } from "lucide-react";

export const menuItems = [
  {
    title: "WorkFlows",
    items: [
      {
        title: "Invoices",
        icon: PaperclipIcon,
        url: "/invoices",
      },
      {
        title: "Sale-Men",
        icon: UserCheck,
        url: "/sale-men",
      },
      {
        title: "Sale-Revenue",
        icon: CoinsIcon,
        url: "/sale-revenue",
      },
    ],
  },
];

export const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "settings", label: "Settings", path: "/settings" },
  { id: "doc", label: "Doc", path: "#" },
];

export const logos = [
  { name: "Alpha", src: "/logo1.svg" },
  { name: "Beta", src: "/logo2.svg" },
  { name: "Gamma", src: "/logo3.svg" },
  { name: "Delta", src: "/logo4.svg" },
  { name: "Epsilon", src: "/logo5.svg" },
  { name: "Zeta", src: "/logo6.svg" },
];

