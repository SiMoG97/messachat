"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import { WelcomeComp } from "./WelcomeComp";
import { useConversation } from "@/Hooks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type User, type Conversation, type Message } from "@prisma/client";
import { type ConversationType, type MessageType } from "@/types";
import { Header } from "../ui/Header";
import { ConversationDisplayer } from "./ConversationDisplayer";
import { ChatTextareaForm } from "./ChatTextareaForm";
import { useSelectOtherUser } from "@/Hooks/useSelectOtherUser";
import Link from "next/link";
import { Arrow } from "../SVGs";
import { type MenuItemT } from "../ui/Dropdown";
import { AboutUserDrawer } from "../AboutUserDrawer";

type ChatSidePropsT = {
  conversation: Conversation & { users: User[] };
  messages: MessageType[];
};

export function ChatSide({ conversation, messages }: ChatSidePropsT) {
  const router = useRouter();
  const { isOpen } = useConversation();
  const otherUser = useSelectOtherUser(conversation);
  const [contactInfoIsOpen, setContactInfoIsOpen] = useState(true);

  const deleteChatHandler = () => {
    console.log("chat deleted");
  };
  const dropDownItems: MenuItemT[] = useMemo(
    () => [
      {
        label: "Contact info",
        clickHandler: () => {
          setContactInfoIsOpen(true);
        },
      },
      {
        label: "Select messages",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Close chat",
        clickHandler: () => {
          router.push("/");
        },
      },
      {
        label: "Mute notifications",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Disappearing messages",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Clear chat",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Delete chat",
        clickHandler: deleteChatHandler,
      },
      {
        label: "Report",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
      {
        label: "Block",
        clickHandler: () => {
          console.log("not working yet");
        },
      },
    ],
    [router],
  );

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
      {!contactInfoIsOpen ? (
        <div className="flex h-full flex-col bg-grey-600">
          <div className="flex items-center bg-grey-300">
            <Link href="/" className="block pl-3 md:hidden">
              <span className="text-grey-100 hover:text-white-70 active:text-white-100">
                <Arrow />
              </span>
            </Link>
            <Header
              name={otherUser?.name ?? conversation.name}
              image={otherUser?.image}
              className="flex-1"
              status={status}
              dropdownItems={dropDownItems}
              profileClick={() => setContactInfoIsOpen(true)}
            ></Header>
          </div>
          <div className=" relative flex flex-1  flex-col overflow-y-auto">
            <ConversationDisplayer
              initMessages={messages}
              conversation={conversation}
            />
          </div>
          <div>
            <ChatTextareaForm conversationId={conversation.id} />
          </div>
        </div>
      ) : (
        <AboutUserDrawer
          closeHandler={() => setContactInfoIsOpen(false)}
          deleteChatHandler={deleteChatHandler}
          user={otherUser}
        />
      )}
    </div>
  );
}
