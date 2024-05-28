import { db } from "@/server/db";
import getCurrentUser from "./getCurrentUser";

export default async function getCurrentUserConversations() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) return [];

  try {
    const conversations = await db.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      where: { userIds: { has: currentUser.id } },
      include: {
        users: true,
        messages: { include: { sender: true, seen: true } },
      },
    });

    return conversations;
  } catch (error) {
    return [];
  }
}
