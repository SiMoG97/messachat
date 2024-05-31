import React, { type ComponentProps } from "react";

import { CircleImage } from "@/components/ui/CircleImage";
import { Dropdown, type MenuItemT } from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";
// import { type User } from "@prisma/client";

type HeaderPropsT = {
  name?: string | null;
  image?: string | null;
  status?: string;
  dropdownItems?: MenuItemT[];
  profileClick?: () => void | null;
  isGroup?: boolean | null;
} & ComponentProps<"header">;
export function Header({
  name,
  className,
  children,
  image,
  dropdownItems,
  status,
  isGroup = false,
  profileClick = () => null,
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
      <div
        className="flex cursor-pointer items-center gap-3 "
        onClick={profileClick}
      >
        {image && (
          <CircleImage
            isGroup={isGroup}
            size={"sm"}
            src={!isGroup ? image : undefined}
          />
        )}
        {/* <div className="w-full"> */}
        <div>
          {name && <div className="text-2md font-semibold">{name}</div>}
          {status && <div className="text-[13px] text-grey-100">{status}</div>}
        </div>
        {/* </div> */}
      </div>
      <div className="flex items-center gap-3">
        <>
          {children}
          {dropdownItems && <Dropdown dropdownItems={dropdownItems} />}
        </>
      </div>
    </header>
  );
}
