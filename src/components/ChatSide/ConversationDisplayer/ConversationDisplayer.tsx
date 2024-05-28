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
  useCloseWithEscape((e: KeyboardEvent) => {
    if (isDialogOpen) return;
    if (e.key === "Escape") router.push("/");
  });

  const [messages, setMesages] = useState(initMessages);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const { conversationId } = useConversation();
  const otherUser = useSelectOtherUser(conversation);

  useEffect(() => {
    axios
      .post(`/api/conversations/${conversationId as string}/seen`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, [conversationId]);

  const hadnleSeenStatus = (message: MessageType) => {
    const filterredSeen = message.seen
      .filter((user) => user.email !== session.data?.user.email)
      .some((user) => user.email === otherUser?.email);
    console.log(filterredSeen);

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
