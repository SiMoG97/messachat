import { ChatSide } from "@/components/ChatSide";

export default async function ChatRoute({
  params,
}: {
  params: { conversationId: string };
}) {
  console.log(params);

  return <ChatSide />;
}
