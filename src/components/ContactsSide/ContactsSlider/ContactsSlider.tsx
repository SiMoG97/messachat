import React from "react";
import { cn } from "@/lib/utils";

type ContactCardPropsT = {
  showContacts: boolean;
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>;
};
export function ContactSlider({
  showContacts,
  setShowContacts,
}: ContactCardPropsT) {
  return (
    <div
      className={cn(
        " bg-grey-600 absolute h-full  w-full transition md:static md:w-[40%] md:translate-x-0 lg:w-[30%]",
        showContacts ? "translate-x-0" : "-translate-x-full",
      )}
    >
      contact
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
