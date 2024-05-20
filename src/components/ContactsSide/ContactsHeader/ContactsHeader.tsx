import React from "react";

import { CircleImage } from "@/components/ui/CircleImage";
import profilePic from "@/../public/pp.jpg";
import { Dropdown, MenuItemT } from "@/components/ui/Dropdown";

export function ContactsHeader() {
  return (
    <header className="bg-grey-300 text-white-100 flex items-center justify-between px-4 py-2">
      <CircleImage size={"sm"} src={profilePic.src} />
      <div>
        <Dropdown menuItems={menuItems} />
      </div>
    </header>
  );
}

const menuItems: MenuItemT[] = [
  { label: "New group", clickHandler: () => {} },
  { label: "New community", clickHandler: () => {} },
  { label: "Starred messages", clickHandler: () => {} },
  { label: "Select chats", clickHandler: () => {} },
  { label: "Log out", clickHandler: () => {} },
  { label: "Settings", clickHandler: () => {} },
];
