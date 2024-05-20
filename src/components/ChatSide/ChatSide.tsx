import React from "react";

type ChatSidePropsT = {
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ChatSide({ setShowContacts }: ChatSidePropsT) {
  return (
    <div className="bg-grey-400 border-myBorder h-full w-full border-l-[1px]  md:w-[60%] lg:w-[70%]">
      chat
      <br />
      <button className="block md:hidden" onClick={() => setShowContacts(true)}>
        show Contacts
      </button>
    </div>
  );
}
