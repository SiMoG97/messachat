"use client";

import React, { useCallback } from "react";
import { ContactCard } from "./ContactCard";
import { type User } from "next-auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Arrow } from "../SVGs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type Conversation } from "@prisma/client";

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
  const router = useRouter();
  const hadnleClick = useCallback(
    (id: string) => {
      // setIsLoading(true);

      axios
        .post<Conversation>("/api/conversations", {
          userId: id,
          isGroup: false,
          members: [],
          name: "someweird name",
        })
        .then(({ data }) => {
          console.log(data);
          router.push(`?conversationId=${data.id}`);
          // router.push("",{

          // })
          // const {id} = data.data
          // router.push(`/conversatons/${data.data.id}`);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          // setIsLoading(false);
        });
    },
    [router],
  );
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
        <div onClick={closeHandler} key={user.id}>
          <ContactCard
            id={user.id}
            date={""}
            lastMessage={""}
            image={user.image}
            name={user.name ?? ""}
            notificationNumber={0}
            handleClick={() => hadnleClick(user.id)}
          />
        </div>
      ))}
    </div>
  );
}
