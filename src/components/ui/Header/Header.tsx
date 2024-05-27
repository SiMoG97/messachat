import React, { type ComponentProps } from "react";

import { CircleImage } from "@/components/ui/CircleImage";
import profilePic from "@/../public/pp.jpg";
import { Dropdown } from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";
import { type SelectDropdownType } from "@/Hooks";
// import { type User } from "@prisma/client";

type HeaderPropsT = {
  username?: string;
  image?: string | null;
  selectDropdown: SelectDropdownType;
} & ComponentProps<"header">;
export function Header({
  username,
  className,
  children,
  image,
  selectDropdown,
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
        <CircleImage size={"sm"} src={image} />
        <div className="text-2md font-semibold">{username}</div>
      </div>
      <div className="flex items-center gap-3">
        {children}
        <Dropdown selectDropdown={selectDropdown} />
      </div>
    </header>
  );
}
