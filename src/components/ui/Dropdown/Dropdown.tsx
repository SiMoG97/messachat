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
  clickHandler: () => any;
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
          variant={null}
          className={cn("active:bg-white-50 size-10 rounded-full ", {
            "bg-white-50": isOpen,
          })}
          size={null}
        >
          <DotsIcon className="fill-grey-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-grey-300 absolute right-[-32px] w-56 rounded-none border-none px-0 py-2 shadow-xl">
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
