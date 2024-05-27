import React from "react";
import { cn } from "@/lib/utils";
import { ContactCard } from "./ContactCard";
import { Header } from "../ui/Header";
import { getUsers } from "@/actions/getUsers";

export async function ContactsAside() {
  const contacts = await getUsers();
  return (
    <div
      className={cn(
        " fixed h-full w-full bg-grey-600   md:static md:w-[40%] md:translate-x-0 lg:w-[30%]",
      )}
    >
      <Header selectDropdown="currUser" />
      {contacts?.map((user) => (
        <ContactCard
          key={user.id}
          id={user.id}
          date={"19/10/2024"}
          lastMessage={"Where have you been ???"}
          image={user.image}
          name={user.name ?? ""}
          notificationNumber={2}
        />
      ))}
      <br />
      <button
        className="block md:hidden"
        // onClick={() => setShowContacts(false)}
      >
        show Chat
      </button>
    </div>
  );
}
// export default ContactCard;
