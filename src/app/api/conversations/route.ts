import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/server/db";
import { z } from "zod";
import { pusherServer } from "@/lib/pusher";

const requestBodySchema = z.object({
  userId: z.string().optional(),
  isGroup: z.boolean(),
  members: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional(),
  name: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { isGroup, userId, members, name } = requestBodySchema.parse(
      await req.json(),
    );

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 1 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...(members ?? []).map((member) => ({ id: member.id })),
              { id: currentUser.id },
            ],
          },
          userIds: [...(members ?? []).map((m) => m.id), currentUser.id],
        },
        include: { users: true },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer
            .trigger(user.email, "conversation:new", newConversation)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        }
      });

      return NextResponse.json(newConversation);
    }

    if (!userId) {
      return new NextResponse("Invalid Data", { status: 400 });
    }
    // find a unique conversation between two people not a group Conversation
    const privateConversation = await db.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { id: currentUser.id } } },
          { users: { some: { id: userId } } },
          { isGroup: false || null },
        ],
      },
    });

    if (privateConversation) {
      return NextResponse.json(privateConversation);
    }

    // if no private conversation between two people found, create a new one
    const newPrivateConversation = await db.conversation.create({
      data: {
        users: { connect: [{ id: currentUser.id }, { id: userId }] },
        userIds: [currentUser.id, userId],
      },
      include: { users: true },
    });

    newPrivateConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer
          .trigger(user.email, "conversation:new", newPrivateConversation)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    });
    return NextResponse.json(newPrivateConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
