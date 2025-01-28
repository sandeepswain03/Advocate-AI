import { HomeIcon } from "lucide-react";
import { JSX } from "react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

const mainLinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <HomeIcon size={18} />,
  },
];

export const getNavigationLinks = (): SideLink[] => {
  return mainLinks;
};
