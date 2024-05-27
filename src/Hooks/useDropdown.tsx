import { type MenuItemT } from "@/components/ui/Dropdown";
import { signOut } from "next-auth/react";
import { useMemo } from "react";

export type SelectDropdownType = "currUser" | "contact" | undefined;

export function useDropdown(selectedDropdown: SelectDropdownType) {
  return useMemo(() => {
    if (selectedDropdown === "currUser") return currUserNavItems;
    else if (selectedDropdown === "contact") return contactNavItems;
    return [];
  }, [selectedDropdown]);
}

const currUserNavItems: MenuItemT[] = [
  {
    label: "New group",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "New community",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Starred messages",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Select chats",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Settings",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Log out",
    clickHandler: async () => await signOut(),
  },
];

const contactNavItems: MenuItemT[] = [
  {
    label: "New group",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "New community",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Starred messages",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Select chats",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Settings",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Log out",
    clickHandler: async () => await signOut(),
  },
];
