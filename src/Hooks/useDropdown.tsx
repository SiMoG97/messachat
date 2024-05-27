import { type MenuItemT } from "@/components/ui/Dropdown";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export type SelectDropdownType = "currUser" | "contact" | undefined;

export function useDropdown(selectedDropdown: SelectDropdownType) {
  const router = useRouter();

  return useMemo(() => {
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
        label: "Contact info",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Select messages",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Close chat",
        clickHandler: () => {
          router.push("/");
        },
      },
      {
        label: "Mute notifications",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Disappearing messages",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Clear chat",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Delete chat",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Report",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Block",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
    ];

    if (selectedDropdown === "currUser") return currUserNavItems;
    else if (selectedDropdown === "contact") return contactNavItems;
    return [];
  }, [selectedDropdown, router]);
}
