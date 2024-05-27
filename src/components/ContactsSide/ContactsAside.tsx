"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ContactCard } from "./ContactCard";
import { Header } from "../ui/Header";
import { getUsers } from "@/actions/getUsers";
import { getCurrentUserConversations } from "@/actions/getCurrentUserConversations";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { ContactsSlider } from "./ContactsSlider";
import { type User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { NewConversation } from "../SVGs";
import { type ConversationType } from "@/types";
import ConversationCard from "./ConversationCard";

type ContactsAsidePropsT = {
  contacts: User[];
  initConversations: ConversationType[];
};

export function ContactsAside({
  contacts,
  initConversations,
}: ContactsAsidePropsT) {
  const [conversations, setConversations] = useState(initConversations);
  // const contacts = await getUsers();
  // const conversations = await getCurrentUserConversations();
  // const currUser = await getCurrentUser();
  const session = useSession();

  const [contactsSliderOpen, setContactsSliderOpen] = useState(false);
  return (
    <div
      className={cn(
        " fixed h-full w-full bg-grey-600  md:static md:w-[40%] md:translate-x-0 lg:w-[30%]",
      )}
    >
      <div className="h-full] relative">
        <Header selectDropdown="currUser" image={session.data?.user.image}>
          <Button
            variant={"rounded"}
            onClick={() => setContactsSliderOpen(true)}
          >
            <span className="text-grey-100">
              <NewConversation />
            </span>
          </Button>
        </Header>
        {conversations.map((conversation) => (
          <ConversationCard key={conversation.id} conversation={conversation} />
        ))}
        <ContactsSlider
          contacts={contacts}
          isOpen={contactsSliderOpen}
          closeHandler={() => setContactsSliderOpen(false)}
        />
        {/* <div className="absolute inset-0  bg-grey-600">
          <div className="flex bg-grey-300">
            <div className="mt-[30px] p-5 text-5md font-medium text-white-100">
              <button className="bg-[blue]">close it</button>
              Contacts
            </div>
          </div>
          {contacts?.map((user) => (
            <ContactCard
              key={user.id}
              id={user.id}
              date={""}
              lastMessage={""}
              image={user.image}
              name={user.name ?? ""}
              notificationNumber={0}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
// export default ContactCard;
