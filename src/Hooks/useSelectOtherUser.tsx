import { type ConversationType } from "@/types";
import { type User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function useSelectOtherUser(
  conversation: ConversationType | { users: User[] },
) {
  const session = useSession();

  return useMemo(() => {
    const currUserEmail = session.data?.user?.email;
    if (!currUserEmail) return {} as User;

    return (
      conversation.users.filter((user) => user.email !== currUserEmail)[0] ??
      ({} as User)
    );
  }, [session.data?.user?.email, conversation.users]);
}
