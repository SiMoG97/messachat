"use client";

import React from "react";
import { ContactCard } from "./ContactCard";
import { type User } from "next-auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Arrow } from "../SVGs";

type ContactsSlider = {
  contacts: User[];
  isOpen: boolean;
  closeHandler: () => void;
};

export function ContactsSlider({
  contacts,
  closeHandler,
  isOpen,
}: ContactsSlider) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full  bg-grey-600 duration-150",
        {
          "-left-full": !isOpen,
          "left-0": isOpen,
        },
      )}
    >
      <div className="flex bg-grey-300">
        <div className="mt-[50px] flex items-center gap-3 px-2 py-3 text-5md font-medium text-white-100">
          <Button variant={"rounded"} onClick={closeHandler}>
            <span>
              <Arrow />
            </span>
          </Button>
          <div>Contacts</div>
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
    </div>
  );
}
