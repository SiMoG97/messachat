"use client";
import { cn } from "@/lib/utils";
import React, { useCallback, useMemo, useState } from "react";
import { useConversation } from "@/Hooks";
import { useRouter } from "next/navigation";
import type { User, Conversation } from "@prisma/client";
import type { MessageType } from "@/types";
import { Header } from "../ui/Header";
import { ConversationDisplayer } from "./ConversationDisplayer";
import { ChatTextareaForm } from "./ChatTextareaForm";
import { useSelectOtherUser } from "@/Hooks/useSelectOtherUser";
import Link from "next/link";
import { Arrow } from "../SVGs";
import { type MenuItemT } from "../ui/Dropdown";
import { AboutUserDrawer } from "../AboutUserDrawer";
import { Dialog } from "../Dialog";
import axios from "axios";
import { useToast } from "../ui/use-toast";

type ChatSidePropsT = {
  conversation: Conversation & { users: User[] };
  messages: MessageType[];
};

export function ChatSide({ conversation, messages }: ChatSidePropsT) {
  const router = useRouter();
  const { isOpen } = useConversation();
  const otherUser = useSelectOtherUser(conversation);
  const [contactInfoIsOpen, setContactInfoIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { toast } = useToast();

  const closeContactInfoHandler = () => {
    if (dialogOpen) return;
    setContactInfoIsOpen(false);
  };
  // const deleteChatHandler = () => {
  //   console.log("chat deleted");
  // };
  const dropDownItems: MenuItemT[] = useMemo(
    () => [
      {
        label: !conversation.isGroup ? "Contact info" : "Group info",
        clickHandler: () => {
          setContactInfoIsOpen(true);
        },
      },
      // {
      //   label: "Select messages",
      //   clickHandler: () => {
      //     console.log("not working yet");
      //   },
      // },
      {
        label: "Close chat",
        clickHandler: () => {
          router.push("/");
        },
      },
      // {
      //   label: "Mute notifications",
      //   clickHandler: () => {
      //     console.log("not working yet");
      //   },
      // },
      // {
      //   label: "Disappearing messages",
      //   clickHandler: () => {
      //     console.log("not working yet");
      //   },
      // },
      // {
      //   label: "Clear chat",
      //   clickHandler: () => {
      //     console.log("not working yet");
      //   },
      // },
      {
        label: conversation.isGroup ? "Delete group" : "Delete chat",
        clickHandler: () => {
          setDialogOpen(true);
        },
      },
      // {
      //   label: "Report",
      //   clickHandler: () => {
      //     console.log("not working yet");
      //   },
      // },
      // {
      //   label: "Block",
      //   clickHandler: () => {
      //     console.log("not working yet");
      //   },
      // },
    ],
    [router, conversation.isGroup],
  );

  const status = useMemo(() => {
    if (conversation.isGroup) {
      const numberOfMembers = conversation.users.length;
      return `${numberOfMembers} memeber${numberOfMembers !== 1 ? "s" : ""}`;
    }
  }, [conversation.isGroup, conversation.users.length]);

  const deleteCoversationHandler = useCallback(() => {
    console.log("clicked");
    setIsDeleteLoading(true);
    axios
      .delete(`/api/conversations/${conversation.id}`)
      .then((res) => {
        console.log(res);
        router.push("/");
        router.refresh();
      })
      .catch((err) => {
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        });
        console.log(err);
      })
      .finally(() => {
        setDialogOpen(false);
      });
  }, [conversation.id, router, toast]);
  return (
    <>
      <Dialog
        title={`Are you sure you want to delete this ${conversation.isGroup ? "group" : "chat"}?`}
        variant="danger"
        isOpen={dialogOpen}
        description="By clicking 'Delete' you confirm to delete this conversation"
        confirmText="Delete"
        closeHandler={() => setDialogOpen(false)}
        confirmHandler={deleteCoversationHandler}
        loading={isDeleteLoading}
        loadingText="Deleting..."
      />
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
                name={
                  conversation.isGroup ? conversation.name : otherUser?.name
                }
                image={otherUser?.image}
                className="flex-1"
                status={status}
                dropdownItems={dropDownItems}
                profileClick={() => setContactInfoIsOpen(true)}
                isGroup={conversation.isGroup}
              ></Header>
            </div>
            <div className=" relative flex flex-1  flex-col overflow-y-auto">
              <ConversationDisplayer
                initMessages={messages}
                conversation={conversation}
                isDialogOpen={dialogOpen}
              />
            </div>
            <div>
              <ChatTextareaForm conversationId={conversation.id} />
            </div>
          </div>
        ) : (
          <AboutUserDrawer
            closeHandler={closeContactInfoHandler}
            deleteChatHandler={() => setDialogOpen(true)}
            user={otherUser}
            conversation={conversation}
          />
        )}
      </div>
    </>
  );
}
