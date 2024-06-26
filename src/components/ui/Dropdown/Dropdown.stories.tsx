import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, type MenuItemT } from ".";

const meta = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

function clickHandler() {
  return;
}
const menuItems: MenuItemT[] = [
  { label: "New group", clickHandler },
  { label: "New community", clickHandler },
  { label: "Starred messages", clickHandler },
  { label: "Select chats", clickHandler },
  { label: "Log out", clickHandler },
  { label: "Settings", clickHandler },
];
export const ContactsDropdown: Story = {
  args: {
    dropdownItems: menuItems,
  },
};
