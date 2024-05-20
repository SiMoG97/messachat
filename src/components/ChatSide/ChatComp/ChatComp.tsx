import { type MenuItemT } from "@/components/ui/Dropdown";
import { Header } from "@/components/ui/Header";
import React from "react";

type ChatCompPropsT = {
  closeChat: () => void;
};

export function ChatComp({ closeChat }: ChatCompPropsT) {
  return (
    <div className="h-full bg-[red]">
      <Header menuItems={menuItems} username="Super Mario">
        <span>some icon</span>
      </Header>
      <button onClick={closeChat}>close chat</button>
    </div>
  );
}
const menuItems: MenuItemT[] = [
  {
    label: "Contact info",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Select messages",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Close chat",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Mute notifications",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Disappearing messages",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Clear chat",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Delete chat",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Report",
    clickHandler: () => {
      return;
    },
  },
  {
    label: "Block",
    clickHandler: () => {
      return;
    },
  },
];
