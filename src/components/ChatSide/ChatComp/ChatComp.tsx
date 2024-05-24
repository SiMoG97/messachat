import { type MenuItemT } from "@/components/ui/Dropdown";
import { Header } from "@/components/ui/Header";
import React from "react";
import { ChatTextareaForm } from "../ChatTextareaForm";
import { ConversationDisplayer } from "../ConversationDisplayer";
import { Message } from "../Message";

type ChatCompPropsT = {
  closeChat: () => void;
};

export function ChatComp({ closeChat }: ChatCompPropsT) {
  return (
    <div className="flex h-full flex-col bg-grey-600">
      <Header menuItems={menuItems} username="Super Mario">
        <span>some icon</span>
      </Header>
      <div className=" relative flex flex-1  flex-col overflow-y-auto">
        <ConversationDisplayer />
      </div>
      <div>
        <ChatTextareaForm />
      </div>
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
