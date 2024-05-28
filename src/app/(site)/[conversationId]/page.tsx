import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import { ChatSide } from "@/components/ChatSide";
import { redirect } from "next/navigation";

export default async function ChatPageWithConversationId({
  params,
}: {
  params: { conversationId: string };
}) {
  const conversation = await getConversationById(params.conversationId);

  if (!conversation) {
    redirect("/");
  }

  const messages = await getMessages(params.conversationId);

  return <ChatSide conversation={conversation} messages={messages} />;
}
