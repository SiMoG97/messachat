"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo } from "react";
import { WelcomeComp } from "./WelcomeComp";
import { useCloseChatWithEscapeBtnKeyboard, useConversation } from "@/Hooks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type User, type Conversation, type Message } from "@prisma/client";
import { type MessageType } from "@/types";
import { Header } from "../ui/Header";
import { ConversationDisplayer } from "./ConversationDisplayer";
import { ChatTextareaForm } from "./ChatTextareaForm";
import { useSelectOtherUser } from "@/Hooks/useSelectOtherUser";
import Link from "next/link";
import { Arrow } from "../SVGs";

type ChatSidePropsT = {
  conversation: Conversation & { users: User[] };
  messages: MessageType[];
};

export function ChatSide({ conversation, messages }: ChatSidePropsT) {
  useCloseChatWithEscapeBtnKeyboard();

  const { isOpen } = useConversation();
  const otherUser = useSelectOtherUser(conversation);

  const status = useMemo(() => {
    if (conversation.isGroup) {
      const numberOfMembers = conversation.users.length;
      return `${numberOfMembers} memeber${numberOfMembers !== 1 ? "s" : ""}`;
    }
  }, [conversation.isGroup, conversation.users.length]);

  return (
    <div
      className={cn(
        " fixed h-full w-full border-myBorder transition md:static md:w-[60%] md:translate-x-0 md:border-l-[1px]  md:transition-none lg:w-[70%]",
        {
          "translate-x-full": !isOpen,
        },
      )}
    >
      <div className="flex h-full flex-col bg-grey-600">
        <div className="flex items-center bg-grey-300">
          <Link href="/" className="block pl-3 md:hidden">
            <span className="text-grey-100 hover:text-white-70 active:text-white-100">
              <Arrow />
            </span>
          </Link>
          <Header
            name={otherUser?.name ?? conversation.name}
            selectDropdown="contact"
            image={otherUser?.image}
            className="flex-1"
            status={status}
          ></Header>
        </div>
        <div className=" relative flex flex-1  flex-col overflow-y-auto">
          <ConversationDisplayer />
        </div>
        <div>
          <ChatTextareaForm conversationId={conversation.id} />
        </div>
      </div>
    </div>
  );
}
