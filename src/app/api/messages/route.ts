import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/server/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestBodySchema = z.object({
  message: z.string(),
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

    const newMessage = await db.message.create({
      data: {
        body: message,
        image,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        seen: { connect: { id: currentUser.id } },
      },
      include: { seen: true, sender: true },
    });

    const updatedConversation = await db.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: {
        users: true,
        messages: { include: { seen: true } },
      },
    });

    //
    // pusher implementation
    //

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log("ERROR messages api route: ", error);
    return new NextResponse("InternalError", { status: 500 });
  }
}
