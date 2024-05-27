import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

export async function getUsers() {
  const session = await getServerAuthSession();

  if (!session?.user?.email) return [];
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { NOT: { email: session.user.email } },
    });

    return users;
  } catch (e) {
    return [];
  }
}
