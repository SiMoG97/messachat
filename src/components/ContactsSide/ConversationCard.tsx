"use client";
import React, { useCallback, useMemo } from "react";
import { ContactCard } from "./ContactCard";
import { type ConversationType } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useSelectOtherUser } from "@/Hooks/useSelectOtherUser";
import { useConversation } from "@/Hooks";
import { formatDate } from "@/lib/utils";

type ConversationCardPropsT = {
  conversation: ConversationType;
};

export default function ConversationCard({
  conversation,
}: ConversationCardPropsT) {
  const { conversationId, isOpen } = useConversation();
  const otherUser = useSelectOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    const sortedMessages = messages.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedMessages[0];
  }, [conversation.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email],
  );

  const numberOfNotifications = useMemo(() => {
    if (!userEmail || isOpen) return 0;

    const unseenMsgsNmbr = conversation.messages?.filter(
      (msg) => !msg.seen.some((user) => user.email === userEmail),
    ).length;

    return unseenMsgsNmbr;
  }, [conversation.messages, userEmail, isOpen]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;
    return "Start chatting!";
  }, [lastMessage?.body, lastMessage?.image]);

  return (
    <>
      <ContactCard
        lastMessage={lastMessageText}
        // image={otherUser?.image}
        image={!conversation.isGroup ? otherUser?.image : null}
        notificationNumber={numberOfNotifications}
        date={
          lastMessage?.createdAt
            ? formatDate(new Date(lastMessage.createdAt))
            : ""
        }
        handleClick={handleClick}
        name={conversation.name ?? otherUser?.name ?? ""}
        selected={conversationId === conversation.id}
        isGroup={conversation.isGroup}
      />
    </>
  );
}
