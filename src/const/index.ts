import { CoinsIcon, PaperclipIcon, Plus, UserCheck } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiGoogle,
  SiGooglecloud,
  SiGmail,
  SiGoogledrive,
  SiGooglesheets,
  SiResend,
  SiDocker,
  SiKubernetes,
  SiGitlab,
  SiJenkins,
  SiTerraform,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiNginx,
  SiFigma,
  SiStripe,
  SiCloudflare,
  SiSupabase,
} from "react-icons/si";

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

export const STACK_ICONS = [
  {
    name: "React",
    icon: SiReact,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    name: "Google",
    icon: SiGoogle,
  },
  {
    name: "Resend",
    icon: SiResend,
  },
  {
    name: "Google Sheets",
    icon: SiGooglesheets,
  },
  {
    name: "Gmail",
    icon: SiGmail,
  },
  {
    name: "Google Drive",
    icon: SiGoogledrive,
  },
];

import {} from "react-icons/si";

export const ENTERPRISE_STACK = [
  {
    name: "Docker",
    icon: SiDocker,
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
  },
  {
    name: "GitLab",
    icon: SiGitlab,
  },
  {
    name: "Jenkins",
    icon: SiJenkins,
  },
  {
    name: "Terraform",
    icon: SiTerraform,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
  },
  {
    name: "Redis",
    icon: SiRedis,
  },
  {
    name: "Nginx",
    icon: SiNginx,
  },
  {
    name: "Figma",
    icon: SiFigma,
  },
  {
    name: "Stripe",
    icon: SiStripe,
  },
  {
    name: "Cloudflare",
    icon: SiCloudflare,
  },
  {
    name: "Supabase",
    icon: SiSupabase,
  },
];

export const STACK_THREE = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    name: "Docker",
    icon: SiDocker,
  },
  {
    name: "Stripe",
    icon: SiStripe,
  },
  {
    name: "3",
    icon: Plus,
  },
];

export const STACK_THREE_B = [
  {
    name: "Cloud",
    icon: SiGooglecloud,
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
  },
  {
    name: "Cloudflare",
    icon: SiCloudflare,
  },
];

export const STACK_THREE_C = [
  {
    name: "React",
    icon: SiReact,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    name: "Cloud",
    icon: SiGooglecloud,
  },
];

export const STACK_THREE_D = [
  {
    name: "Docker",
    icon: SiDocker,
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
  },
];

export const testimonials = [
  {
    name: "David Miller",
    role: "Founder",
    company: "Miller Consulting",
    avatar: "👨‍💼",
    content:
      "This invoice platform saved me hours every week. Creating professional invoices is now effortless, and tracking my sales has never been easier. Best investment for my business!",
    rating: 5,
  },
  {
    name: "Jessica Thompson",
    role: "Small Business Owner",
    company: "Thompson Design Studio",
    avatar: "👩‍💼",
    content:
      "Finally, an invoicing solution that actually works! The sales tracking features help me understand my business growth. My clients love how professional the invoices look.",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "Freelance Developer",
    company: "Chen Tech Solutions",
    avatar: "👨‍💻",
    content:
      "I've tried many invoicing tools, but this one stands out. The yearly sales analytics give me insights I never had before. Managing my finances has become stress-free.",
    rating: 5,
  },
];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 1;
