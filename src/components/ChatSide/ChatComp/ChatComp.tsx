import { type MenuItemT } from "@/components/ui/Dropdown";
import { Header } from "@/components/ui/Header";
import React from "react";
import { ChatTextareaForm } from "../ChatTextareaForm";
import { ConversationDisplayer } from "../ConversationDisplayer";
import { Message } from "../Message";
import { useSession } from "next-auth/react";

// type ChatCompPropsT = {};

export function ChatComp() {
  const session = useSession();
  return (
    <div className="flex h-full flex-col bg-grey-600">
      <Header
        username="Super Mario"
        selectDropdown="contact"
        image={session.data?.user.image}
      >
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
