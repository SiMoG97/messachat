import React from "react";
import { cn } from "@/lib/utils";
import { ContactCard, ContactCardPropT } from "../ContactCard";
import { ContactsHeader } from "../ContactsHeader";

type ContactCardPropsT = {
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
  contacts?: ContactCardPropT[] | null;
};
export function ContactSlider({
  showContacts,
  setShowContacts,
  contacts,
}: ContactCardPropsT) {
  return (
    <div
      className={cn(
        " bg-grey-600 fixed h-full w-full   md:static md:w-[40%] md:translate-x-0 lg:w-[30%]",
      )}
    >
      <ContactsHeader />
      {contacts?.map((user) => (
        <ContactCard
          date={user.date}
          lastMessage={user.lastMessage}
          username={user.username}
          notificationNumber={user.notificationNumber}
        />
      ))}
      <br />
      <button
        className="block md:hidden"
        onClick={() => setShowContacts(false)}
      >
        show Chat
      </button>
    </div>
  );
}

// export default ContactCard;
