import { ChatSide } from "@/components/ChatSide";

export default async function ChatPageWithConversationId({
  params,
}: {
  params: { conversationId: string };
}) {
  console.log(params);

  return <ChatSide />;
}
