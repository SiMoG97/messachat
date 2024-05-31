import getCurrentUserConversations from "@/actions/getCurrentUserConversations";
import getUsers from "@/actions/getUsers";
import { ContactsAside } from "@/components/ContactsSide";
import AuthContext from "@/context/AuthContext";
import { loginIsRequiredServer } from "@/server/auth";
import React from "react";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await loginIsRequiredServer();
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
          {children}
        </AuthContext>
      </div>
    </div>
  );
}
