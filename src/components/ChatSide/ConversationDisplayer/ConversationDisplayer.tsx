import React, { useEffect, useRef, useState } from "react";
import { Message } from "../Message";
import { type MessageType } from "@/types";
import { useCloseWithEscape, useConversation } from "@/Hooks";
import { format } from "date-fns";
import { useSelectOtherUser } from "@/Hooks/useSelectOtherUser";
import { useSession } from "next-auth/react";
import { type User, type Conversation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

type ConversationDisplayerPropsT = {
  initMessages: MessageType[];
  conversation: Conversation & { users: User[] };
  isDialogOpen?: boolean;
};

export function ConversationDisplayer({
  initMessages,
  conversation,
  isDialogOpen,
}: ConversationDisplayerPropsT) {
  // useCloseChatWithEscapeBtnKeyboard();
  const router = useRouter();
  useCloseWithEscape(() => {
    if (isDialogOpen) return;
    router.push("/");
  });

  const [messages, setMesages] = useState(initMessages);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const { conversationId } = useConversation();
  const otherUser = useSelectOtherUser(conversation);

  useEffect(() => {
    if (typeof conversationId !== "string") return;

    axios
      .post(`/api/conversations/${conversationId}/seen`)
      .then(() => {
        router.refresh();
      })
      .catch((err) => console.error(err));
  }, [conversationId, router, messages]);

  useEffect(() => {
    if (typeof conversationId !== "string") return;
    pusherClient.subscribe(conversationId);

    scrollBottomRef.current?.scrollIntoView();

    const messageHandler = (message: MessageType) => {
      setMesages((prev) => {
        if (find(prev, { id: message.id })) return prev;

        return [...prev, message];
      });

      scrollBottomRef.current?.scrollIntoView();

      axios
        .post(`/api/conversations/${conversationId}/seen`)
        .then(() => {
          router.refresh();
        })
        .catch((err) => console.error(err));
    };

    const updateMessagesHandler = (newMessages: MessageType[]) => {
      setMesages((prev) =>
        prev.map((msg) => {
          const seenMessage = newMessages.find(
            (message) => message.id === msg.id,
          );
          if (seenMessage) return seenMessage;
          return msg;
        }),
      );
    };
    pusherClient.bind("message:new", messageHandler);
    pusherClient.bind("message:update", updateMessagesHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", messageHandler);
      pusherClient.unbind("message:update", updateMessagesHandler);
    };
  }, [conversationId, router, messages]);

  const hadnleSeenStatus = (message: MessageType) => {
    const filterredSeen = message.seen
      .filter((user) => user.email !== session.data?.user.email)
      .some((user) => user.email === otherUser?.email);

    if (filterredSeen) return "seen";
    return "delivered";
  };

  return (
    <>
      {/* bg image */}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-chat-bg opacity-5" />

      {/* conversation */}
      <div className="overflow-y-auto py-5">
        {messages.map((message) => (
          <Message
            key={message.id}
            direction={
              message.sender.email === session.data?.user.email
                ? "right"
                : "left"
            }
            message={message.body}
            image={message.image}
            status={hadnleSeenStatus(message)}
            time={format(new Date(message.createdAt), "p")}
          />
        ))}
        <div className="pt-24" ref={scrollBottomRef} />
      </div>
    </>
  );
}
