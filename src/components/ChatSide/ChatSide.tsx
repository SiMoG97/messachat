import { cn } from "@/lib/utils";
import React from "react";
import { WelcomeComp } from "./WelcomeComp";
import { ChatComp } from "./ChatComp";

type ChatSidePropsT = {
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ChatSide({ showContacts, setShowContacts }: ChatSidePropsT) {
  const closeChat = () => {
    setShowContacts(true);
  };
  return (
    <div
      className={cn(
        " fixed h-full w-full border-myBorder transition md:static md:w-[60%] md:translate-x-0 md:border-l-[1px]  md:transition-none lg:w-[70%]",
        {
          "translate-x-full": showContacts,
        },
      )}
    >
      {showContacts ? <WelcomeComp /> : <ChatComp closeChat={closeChat} />}
      <br />
      <button className="block md:hidden" onClick={() => setShowContacts(true)}>
        show Contacts
      </button>
    </div>
  );
}
