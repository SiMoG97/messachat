import { DotsIcon } from "@/components/SVGs/Dots";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type MenuItemT = {
  label: string;
  clickHandler: () => Promise<void> | void;
};

type DropdownPropsT = {
  menuItems: MenuItemT[];
};
export function Dropdown({ menuItems }: DropdownPropsT) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {/* <div className="relative"> */}
      <DropdownMenuTrigger asChild>
        <Button
          variant={"rounded"}
          className={cn({ "bg-white-50": isOpen })}
          size={null}
        >
          <span className="text-grey-100">
            <DotsIcon />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-[-32px] w-56 rounded-none border-none bg-grey-300 px-0 py-2 shadow-xl">
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem onClick={item.clickHandler} key={item.label}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {/* </div> */}
    </DropdownMenu>
  );
}
