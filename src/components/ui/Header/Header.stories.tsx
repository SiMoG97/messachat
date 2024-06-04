import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./";
import { type MenuItemT } from "../Dropdown";

function clickHandler() {
  return;
}
const menuItems: MenuItemT[] = [
  { label: "Contact info", clickHandler },
  { label: "Select messages", clickHandler },
  { label: "Close chat", clickHandler },
  { label: "Mute notifications", clickHandler },
  { label: "Disappearing messages", clickHandler },
  { label: "Clear chat", clickHandler },
  { label: "Delete chat", clickHandler },
  { label: "Report", clickHandler },
  { label: "Block", clickHandler },
];

const meta = {
  title: "UI/Header",
  component: Header,
  args: {
    dropdownItems: menuItems,
  },
  // tags:[""]
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithuserName: Story = {
  args: {
    name: "Simo Echaarani",
  },
};
