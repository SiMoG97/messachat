import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { conversationId: string } },
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await db.conversation.delete({
      where: {
        id: conversationId,
        users: { some: { id: currentUser.id } },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer
          .trigger(user.email, "conversation:remove", existingConversation)
          .then((r) => console.log(r))
          .catch((e) => console.log(e));
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION_ID");
  }
}
