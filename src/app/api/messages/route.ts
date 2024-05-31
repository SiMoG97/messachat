import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestBodySchema = z.object({
  message: z.string().nullable(),
  image: z.string().nullable(),
  conversationId: z.string(),
});

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { conversationId, message, image } = requestBodySchema.parse(
      await req.json(),
    );

    if (!message && !image) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        seen: { connect: { id: currentUser.id } },
        seenIds: [currentUser.id],
      },
      include: { seen: true, sender: true },
    });

    const updatedConversation = await db.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
        messagesIds: { push: newMessage.id },
      },
      include: {
        users: true,
        messages: { include: { seen: true } },
      },
    });

    // Pusher
    await pusherServer.trigger(conversationId, "message:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer
        .trigger(user.email!, "conversation:update", {
          id: conversationId,
          messages: [lastMessage],
        })
        .catch(() => new Error("Something went wrong with pusher server"));
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError Mesaages", { status: 500 });
  }
}
