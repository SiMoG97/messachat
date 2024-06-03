import { useEffect, useState } from "react";
import { useOnlineMembers } from "./useOnlineMembers";
import { type Channel, type Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";

type Member = { id: string };
export function useOnlineChannel() {
  const { add, remove, set } = useOnlineMembers();
  const [onlineChannel, setOnlineChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = onlineChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messanger");
      setOnlineChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initMembers: string[] = [];

      // console.log("\n\n\n-----", members, "------\n\n\n");
      members.each((member: Member) => {
        console.log("member:", member);
        initMembers.push(member.id);
      });
      set([...new Set(initMembers)]);
    });

    channel.bind("pusher:member_added", (member: Member) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Member) => {
      remove(member.id);
    });

    return () => {
      if (onlineChannel) {
        pusherClient.unsubscribe("presence-messanger");
        setOnlineChannel(null);
      }
    };
  }, [onlineChannel, set, add, remove]);
}
