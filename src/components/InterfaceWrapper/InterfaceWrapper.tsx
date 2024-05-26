"use client";
import React, { useState } from "react";
// import { ChatSide } from "@app/components/ChatSide";
import { ChatSide } from "@/components/ChatSide";
import { ContactsAside } from "@/components/ContactsSide";
import { useRemoveWeirdFbUrlString } from "@/Hooks";

export function InterfaceWrapper() {
  const [showContacts, setShowContacts] = useState(false);
  useRemoveWeirdFbUrlString();

  return (
    <div className="h-svh w-full bg-black px-0 py-0 2xl:px-5 2xl:py-3">
      <div className=" bg-blue-400 mx-auto flex h-full w-full  max-w-[1700px] overflow-hidden md:flex-row">
        <ContactsAside setShowContacts={setShowContacts} />
        <ChatSide
          showContacts={showContacts}
          setShowContacts={setShowContacts}
        />
      </div>
    </div>
  );
}
