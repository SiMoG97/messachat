import React from "react";
import { cn } from "@/lib/utils";
import { type ContactCardPropT, ContactCard } from "./ContactCard";
import { Header } from "../ui/Header";
import { type MenuItemT } from "../ui/Dropdown";

type ContactCardPropsT = {
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
  contacts?: ContactCardPropT[] | null;
};
export function ContactsAside({
  setShowContacts,
  contacts,
}: ContactCardPropsT) {
  return (
    <div
      className={cn(
        " fixed h-full w-full bg-grey-600   md:static md:w-[40%] md:translate-x-0 lg:w-[30%]",
      )}
    >
      <Header menuItems={menuItems} />
      {contacts?.map((user) => (
        <ContactCard
          key={user.username}
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
const menuItems: MenuItemT[] = [
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
    label: "Log out",
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
];
// export default ContactCard;
