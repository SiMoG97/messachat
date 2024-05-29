import { db } from "@/server/db";
import getCurrentUser from "./getCurrentUser";

export default async function getCurrentUserConversations() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) return [];

  console.log("\n\n\n\n\n from getCurrentUserConversations \n\n\n\n\n\n");
  try {
    const conversations = await db.conversation.findMany({
      orderBy: { lastMessageAt: "desc" },
      // where: { userIds: { has: currentUser.id } },
      where: { users: { some: { id: currentUser.id } } },
      include: {
        users: true,
        messages: { include: { sender: true, seen: true } },
      },
    });

    return conversations;
  } catch (error) {
    console.log("\n\n\n\n\n from getCurrentUserConversations \n\n\n\n\n\n");
    return [];
  }
}
