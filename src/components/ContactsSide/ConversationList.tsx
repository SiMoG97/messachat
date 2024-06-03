import { type ConversationType } from "@/types";
import React, { useEffect, useMemo } from "react";
import ConversationCard from "./ConversationCard";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { useRouter } from "next/navigation";

export default function ConversationList({
  conversations,
  setConversations,
}: {
  conversations: ConversationType[];
  setConversations: React.Dispatch<React.SetStateAction<ConversationType[]>>;
}) {
  const session = useSession();
  const router = useRouter();
  const pusherKey = useMemo(
    () => session.data?.user.email,
    [session.data?.user.email],
  );

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newConvHandler = (conversation: ConversationType) => {
      setConversations((prev) => {
        if (find(prev, { id: conversation.id })) return prev;
        return [conversation, ...prev];
      });
    };

    const updateConvHandler = (conversation: ConversationType) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversation.id) {
            const newMessages = [...(conv?.messages ?? [])];

            conversation.messages.forEach((msg) => {
              const prevMsgIndex = newMessages.findIndex(
                (prevMsg) => prevMsg.id === msg.id,
              );
              if (prevMsgIndex !== -1) {
                newMessages[prevMsgIndex] = msg;
              } else {
                newMessages.push(msg);
              }
            });

            return {
              ...conv,
              messages: newMessages,
            };
          }
          return conv;
        }),
      );
    };
    const removeConvHandler = (conversation: ConversationType) => {
      setConversations((prev) => [
        ...prev.filter((convo) => convo.id !== conversation.id),
      ]);
      router.push("/");
    };

    pusherClient.bind("conversation:new", newConvHandler);
    pusherClient.bind("conversation:update", updateConvHandler);
    pusherClient.bind("conversation:remove", removeConvHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newConvHandler);
      pusherClient.unbind("conversation:update", updateConvHandler);
      pusherClient.bind("conversation:remove", removeConvHandler);
    };
  }, [pusherKey, router, setConversations]);
  return (
    <>
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </>
  );
}
