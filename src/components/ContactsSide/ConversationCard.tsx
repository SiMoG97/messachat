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
  selected?: boolean;
};

export default function ConversationCard({
  conversation,
  selected,
}: ConversationCardPropsT) {
  const { conversationId } = useConversation();
  const otherUser = useSelectOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`?conversationId=${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email],
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;

    const seenArray = lastMessage.seen || [];

    return seenArray.some((user) => user.email === userEmail);
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;
    return "Start chatting!";
  }, [lastMessage?.body, lastMessage?.image]);

  return (
    <>
      <ContactCard
        id={conversation.id}
        lastMessage={lastMessageText}
        image={otherUser?.image}
        notificationNumber={hasSeen ? 0 : 1}
        // date={form(conversation.createdAt)}
        date={
          lastMessage?.createdAt
            ? format(new Date(lastMessage.createdAt), "p")
            : ""
        }
        handleClick={handleClick}
        name={conversation.name ?? otherUser?.name ?? ""}
        selected={conversationId === conversation.id}
      />
    </>
  );
}
