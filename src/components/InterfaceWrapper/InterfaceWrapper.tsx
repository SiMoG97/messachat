import React, { useState } from "react";
// import { ChatSide } from "@app/components/ChatSide";
import { ChatSide } from "@/components/ChatSide";
import { ContactSlider } from "@/components/ContactsSide/ContactsSlider";

export function InterfaceWrapper() {
  const [showContacts, setShowContacts] = useState(true);

  return (
    <div className="h-svh w-full bg-black px-0 py-0 2xl:px-5 2xl:py-3">
      <div className=" mx-auto flex h-full w-full max-w-[1700px]  overflow-hidden bg-blue-400 md:flex-row">
        <ContactSlider
          showContacts={showContacts}
          setShowContacts={setShowContacts}
        />
        <ChatSide
          showContacts={showContacts}
          setShowContacts={setShowContacts}
        />
      </div>
    </div>
  );
}
