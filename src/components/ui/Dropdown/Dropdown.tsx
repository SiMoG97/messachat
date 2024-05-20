import { DotsIcons } from "@/components/SVGs/Dots";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={null}>
          <DotsIcons />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-grey-300 w-56 rounded-none px-0 py-2">
        <DropdownMenuGroup>
          <DropdownMenuItem>New Group</DropdownMenuItem>
          <DropdownMenuItem>New Community</DropdownMenuItem>
          <DropdownMenuItem>Starred messages</DropdownMenuItem>
          <DropdownMenuItem>Select chats</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
