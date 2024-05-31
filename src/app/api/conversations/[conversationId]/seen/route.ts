import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { conversationId: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true } },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Conversation Id", { status: 400 });
    }

    const unseenMessages = conversation.messages.filter((message) => {
      return (
        message.senderId !== currentUser.id &&
        !message.seen.some((user) => user.id === currentUser.id)
      );
    });

    if (unseenMessages.length === 0) {
      return NextResponse.json(conversation);
    }

    const updatedMessages = await Promise.all(
      unseenMessages.map((message) => {
        return db.message.update({
          where: { id: message.id },
          include: { sender: true, seen: true },
          data: {
            // seenIds: [...message.seenIds, currentUser.id],
            seen: { connect: { id: currentUser.id } },
            seenIds: { push: currentUser.id },
          },
        });
      }),
    );

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [...updatedMessages],
    });

    // updatedMessages.forEach(msg=>{
    //   if(msg.seen.includes(currentUser))
    // })

    return NextResponse.json(updatedMessages);
    // console.log(unseenMessages);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATIONID_MESSAGES_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
