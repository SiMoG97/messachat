import { db } from "@/server/db";
import getCurrentUser from "./getCurrentUser";

export default async function getConversationById(convresationId: string) {
  console.log("\n\n\n\n\n from getconversationById \n\n\n\n\n\n");
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const conversation = await db.conversation.findUnique({
      where: { id: convresationId },
      include: { users: true },
    });

    return conversation;
  } catch (error) {
    console.log("\n\n\n\n\n from getconversationById \n\n\n\n\n\n");
    return null;
  }
}
