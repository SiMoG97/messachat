import { cn } from "@/lib/utils";
import React from "react";

type ChatSidePropsT = {
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ChatSide({ showContacts, setShowContacts }: ChatSidePropsT) {
  return (
    <div
      className={cn(
        "bg-grey-400 border-myBorder fixed h-full w-full border-l-[1px] transition md:static md:w-[60%] md:translate-x-0  md:transition-none lg:w-[70%]",
        {
          "translate-x-full": showContacts,
        },
      )}
    >
      chat
      <br />
      <button className="block md:hidden" onClick={() => setShowContacts(true)}>
        show Contacts
      </button>
    </div>
  );
}
