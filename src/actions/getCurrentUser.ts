import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export default async function getCurrentUser() {
  try {
    const session = await getServerAuthSession();

    if (!session?.user?.email) return null;

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (e) {
    return null;
  }
}
