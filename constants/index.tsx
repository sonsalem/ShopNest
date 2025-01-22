// Barnd Name

// export const BRAND_NAME = `NASH'AT`;
// export const BRAND_NAME = `HeraYze`;
export const BRAND_NAME = `SHOPNEST`;

// NAVIGATION

import { House } from "lucide-react";
import { BadgeInfo } from "lucide-react";
import { Shirt } from "lucide-react";

export const NAV_LINKS = [
  { href: "/", key: "home", label: "Home", icon: <House /> },
  { href: "/about", key: "about", label: "About", icon: <BadgeInfo /> },
  {
    href: "/products",
    key: "products",
    label: "Products",
    icon: <Shirt />,
  },
];
