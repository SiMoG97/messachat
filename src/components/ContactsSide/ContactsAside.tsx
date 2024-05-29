"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "../ui/Header";
import { ContactsSlider } from "./ContactsSlider";
import { type User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { NewConversation } from "../SVGs";
import { type ConversationType } from "@/types";
import ConversationCard from "./ConversationCard";
import { type MenuItemT } from "../ui/Dropdown";

type ContactsAsidePropsT = {
  contacts: User[];
  initConversations: ConversationType[];
};

export function ContactsAside({
  contacts,
  initConversations,
}: ContactsAsidePropsT) {
  const [conversations, setConversations] = useState(initConversations);
  const session = useSession();

  const [contactsSliderOpen, setContactsSliderOpen] = useState(false);
  const contactNavItems = useMemo(
    () =>
      [
        {
          label: "New group",
          clickHandler: () => {
            return;
          },
        },
        {
          label: "New community",
          clickHandler: () => {
            return;
          },
        },
        {
          label: "Starred messages",
          clickHandler: () => {
            return;
          },
        },
        {
          label: "Select chats",
          clickHandler: () => {
            return;
          },
        },
        {
          label: "Settings",
          clickHandler: () => {
            return;
          },
        },
        {
          label: "Log out",
          clickHandler: async () => await signOut(),
        },
      ] as MenuItemT[],
    [],
  );
  return (
    <div
      className={cn(
        " fixed h-full w-full bg-grey-600  md:static md:w-[40%] md:translate-x-0 lg:w-[30%]",
      )}
    >
      <div className="h-full] relative">
        <Header
          dropdownItems={contactNavItems}
          image={session.data?.user.image}
        >
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
      </div>
    </div>
  );
}
