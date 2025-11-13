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
