"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "../ui/Header";
import { ContactsSlider } from "./ContactsSlider";
import { type User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { GroupIcon, NewConversation } from "../SVGs";
import { type ConversationType } from "@/types";
import ConversationCard from "./ConversationCard";
import { type MenuItemT } from "../ui/Dropdown";
import SettingsAside from "./SettingsAside";
import { NewGroupAside } from "./NewGroupAsiide";

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
  const [asideShow, setAsideShow] = useState<
    "contacts" | "conversations" | "settings" | "newGroup"
  >("conversations");
  const contactNavItems = useMemo(
    () =>
      [
        {
          label: "New group",
          clickHandler: () => setAsideShow("newGroup"),
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
          clickHandler: () => setAsideShow("settings"),
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
      <div className="relative h-full">
        {asideShow === "conversations" && (
          <>
            <Header
              dropdownItems={contactNavItems}
              image={session.data?.user.image}
              profileClick={() => setAsideShow("settings")}
            >
              <>
                <Button
                  variant={"rounded"}
                  onClick={() => setAsideShow("newGroup")}
                >
                  <span className="text-grey-100">
                    <GroupIcon />
                  </span>
                </Button>
                <Button
                  variant={"rounded"}
                  onClick={() => setAsideShow("contacts")}
                >
                  <span className="text-grey-100">
                    <NewConversation />
                  </span>
                </Button>
              </>
            </Header>
            {conversations.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          </>
        )}
        {asideShow === "contacts" && (
          <ContactsSlider
            contacts={contacts}
            isOpen={contactsSliderOpen}
            closeHandler={() => setAsideShow("conversations")}
          />
        )}

        {asideShow === "settings" && (
          <SettingsAside closeHandler={() => setAsideShow("conversations")} />
        )}

        {asideShow === "newGroup" && (
          <NewGroupAside
            closeHandler={() => setAsideShow("conversations")}
            contacts={contacts}
          />
        )}
      </div>
    </div>
  );
}
