import React from "react";
import { ChatSide } from "@/components/ChatSide";
import { ContactsAside } from "@/components/ContactsSide";
import { getCurrentUserConversations } from "@/actions/getCurrentUserConversations";
import AuthContext from "@/context/AuthContext";
import { getUsers } from "@/actions/getUsers";

export async function InterfaceWrapper() {
  const conversations = await getCurrentUserConversations();

  const contacts = await getUsers();
  return (
    <div className="h-svh w-full bg-black px-0 py-0 2xl:px-5 2xl:py-3">
      <div className=" bg-blue-400 mx-auto flex h-full w-full  max-w-[1700px] overflow-hidden md:flex-row">
        <AuthContext>
          <ContactsAside
            initConversations={conversations}
            contacts={contacts}
          />
          <ChatSide />
        </AuthContext>
      </div>
    </div>
  );
}
