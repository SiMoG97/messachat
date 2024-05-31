import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/server/db";
import { SettingsFromSchema } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { bio, image, name } = SettingsFromSchema.parse(await req.json());
    if (!bio && !image && !name) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { id: currentUser.id },
      data: {
        name: name ?? currentUser.name,
        image: image ?? currentUser.image,
        bio: bio ?? currentUser.bio,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "ERROR_SETTINGS");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
