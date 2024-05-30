import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/server/db";
import { z } from "zod";

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
        },
        include: { users: true },
      });

      return NextResponse.json(newConversation);
    }

    // find a unique conversation between two people not a group Conversation
    const privateConversation = await db.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { id: currentUser.id } } },
          { users: { some: { id: userId } } },
        ],
        // OR: [
        //   { userIds: { equals: [currentUser.id, userId] } },
        //   { userIds: { equals: [userId, currentUser.id] } },
        // ],
      },
    });

    if (privateConversation) {
      return NextResponse.json(privateConversation);
    }

    // if no private conversation between two people found, create a new one
    const newPrivateConversation = await db.conversation.create({
      data: {
        // userIds: [currentUser.id, userId],
        users: { connect: [{ id: currentUser.id }, { id: userId }] },
      },
      include: { users: true },
    });

    return NextResponse.json(newPrivateConversation);
  } catch (error) {
    console.log(error, "ERROR_CONVERSATION");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
