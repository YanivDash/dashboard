import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingsFill, PiCubeDuotone } from "react-icons/pi";
import { BsFillWalletFill } from "react-icons/bs";

export const sidebarLinks = [
  {
    title: "Overview",
    href: "/",
    icon: IoHomeOutline,
  },
  {
    title: "Companies",
    dropdown: [
      { subTitle: "Warehouse", href: "Warehouse" },
      { subTitle: "Teams", href: "teams" },
    ],
    icon: PiBuildingsFill,
  },
  {
    title: "Catalogue",
    dropdown: [
      { subTitle: "Product", href: "/" },
      { subTitle: "Attributes", href: "/" },
    ],
    icon: PiCubeDuotone,
  },
  {
    title: "Inventory",
    href: "/",
    icon: BsFillWalletFill,
  },
];

export const sidebarSubLinks = ["Warehouse", "Roles & Permision", "Categories"];
