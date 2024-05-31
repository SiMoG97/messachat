"use client";
import React, { useCallback, useMemo } from "react";
import { ContactCard } from "./ContactCard";
import { type ConversationType } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { useSelectOtherUser } from "@/Hooks/useSelectOtherUser";
import { useConversation } from "@/Hooks";

type ConversationCardPropsT = {
  conversation: ConversationType;
};

export default function ConversationCard({
  conversation,
}: ConversationCardPropsT) {
  const { conversationId } = useConversation();
  const otherUser = useSelectOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    // router.push(`?conversationId=${conversation.id}`);
    router.push(`/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email],
  );

  const numberOfNotifications = useMemo(() => {
    if (!userEmail) return 0;

    return conversation.messages.filter(
      (msg) =>
        !msg.seen.some((user) => user.email === session.data?.user.email),
    ).length;
  }, [userEmail, conversation.messages, session.data?.user.email]);

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
            ? format(new Date(lastMessage.createdAt), "p")
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
