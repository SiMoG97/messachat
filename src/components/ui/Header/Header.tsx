import React, { type ComponentProps } from "react";

import { CircleImage } from "@/components/ui/CircleImage";
import profilePic from "@/../public/pp.jpg";
import { type MenuItemT, Dropdown } from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";

type HeaderPropsT = {
  username?: string;
  menuItems: MenuItemT[];
} & ComponentProps<"header">;
export function Header({
  username,
  menuItems,
  className,
  children,
  ...props
}: HeaderPropsT) {
  return (
    <header
      className={cn(
        "flex items-center justify-between bg-grey-300 px-4 py-2 text-white-100",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <CircleImage size={"sm"} src={profilePic.src} />
        <div className="text-2md font-semibold">{username}</div>
      </div>
      <div className="flex items-center gap-3">
        {children}
        <Dropdown menuItems={menuItems} />
      </div>
    </header>
  );
}

// const menuItems: MenuItemT[] = [
//   { label: "Contact info", clickHandler: () => {} },
//   { label: "Select messages", clickHandler: () => {} },
//   { label: "Close chat", clickHandler: () => {} },
//   { label: "Mute notifications", clickHandler: () => {} },
//   { label: "Disappearing messages", clickHandler: () => {} },
//   { label: "Clear chat", clickHandler: () => {} },
//   { label: "Delete chat", clickHandler: () => {} },
//   { label: "Report", clickHandler: () => {} },
//   { label: "Block", clickHandler: () => {} },
// ];
