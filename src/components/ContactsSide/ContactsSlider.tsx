"use client";

import React, { useCallback } from "react";
import { ContactCard } from "./ContactCard";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Arrow } from "../SVGs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type User, type Conversation } from "@prisma/client";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();
  const hadnleClick = useCallback(
    (id: string) => {
      // setIsLoading(true);

      axios
        .post<Conversation>("/api/conversations", {
          userId: id,
          isGroup: false,
        })
        .then(({ data }) => {
          console.log(data);
          // router.push(`?conversationId=${data.id}`);
          router.push(`/${data.id}`);
        })
        .catch((e) => {
          toast({
            variant: "destructive",
            title: "Something went wrong",
          });
          console.log(e);
        })
        .finally(() => {
          // setIsLoading(false);
        });
    },
    [router],
  );
  return (
    <div className={cn(" h-full w-full bg-grey-600 ")}>
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
