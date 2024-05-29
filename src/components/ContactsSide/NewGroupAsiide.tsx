"use client";

import React, { useCallback, useState } from "react";
import { ContactCard } from "./ContactCard";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Arrow, XIcon } from "../SVGs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type User, type Conversation } from "@prisma/client";
import { CircleImage } from "../ui/CircleImage";

type NewGroupAsidePropsT = {
  // contacts: User[];
  // isOpen: boolean;
  closeHandler: () => void;
  contacts: User[];
};

export function NewGroupAside({
  contacts,
  closeHandler,
  // isOpen,
}: NewGroupAsidePropsT) {
  const router = useRouter();
  const [step, setStep] = useState<"addMembers" | "groupForm">("addMembers");

  const [members, setMembers] = useState<User[]>([]);

  const arrowLeftClicked = useCallback(() => {
    if (step === "addMembers") {
      closeHandler();
      return;
    }
    setStep("addMembers");
  }, [closeHandler, step]);

  // const hadnleClick = useCallback(
  //   (id: string) => {
  //     // setIsLoading(true);

  //     axios
  //       .post<Conversation>("/api/conversations", {
  //         userId: id,
  //         isGroup: false,
  //         members: [],
  //         name: "someweird name",
  //       })
  //       .then(({ data }) => {
  //         console.log(data);
  //         // router.push(`?conversationId=${data.id}`);
  //         router.push(`/${data.id}`);
  //       })
  //       .catch((e) => console.log(e))
  //       .finally(() => {
  //         // setIsLoading(false);
  //       });
  //   },
  //   [router],
  // );
  return (
    <div className={cn(" flex h-full w-full flex-col bg-grey-500")}>
      {/* Header */}
      <div className="flex  bg-grey-300">
        <div className="mt-[50px] flex items-center gap-3 px-2 py-3 text-5md font-medium text-white-100">
          <Button variant={"rounded"} onClick={arrowLeftClicked}>
            <span>
              <Arrow />
            </span>
          </Button>
          <div>{step === "addMembers" ? "Add group members" : "New group"}</div>
        </div>
      </div>
      {members.length > 0 && (
        <div className="flex max-h-[250px] flex-wrap gap-2 overflow-auto p-4">
          {members.map((user) => (
            <SelectedUserCard
              key={user.id}
              name={user.name ?? ""}
              imgSrc={user.image}
              unselectUser={() =>
                setMembers((prev) => prev.filter((u) => u.id !== user.id))
              }
            />
          ))}
        </div>
      )}
      <div className=" flex-1 overflow-y-auto">
        {contacts
          ?.filter((user) => !members.includes(user))
          .map((user) => (
            <ContactCard
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name ?? ""}
              handleClick={() => setMembers((prev) => [...prev, user])}
            />
          ))}
      </div>

      {/* Buttom */}
      <div className="flex  justify-center  py-6">
        {members.length > 0 && (
          <button className="flex size-12 items-center justify-center rounded-full bg-primary text-white-100">
            <Arrow className="rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
}

function SelectedUserCard({
  name,
  imgSrc,
  unselectUser,
}: {
  name: string;
  imgSrc?: string | null;
  unselectUser: () => void;
}) {
  return (
    <div className="flex items-center gap-2 ">
      <CircleImage size={"xsm"} src={imgSrc} />
      <div className="text-[13.5px] text-white-100">{name}</div>
      <div className="flex items-center">
        <button
          className="rounded-full text-grey-100 hover:bg-white-100"
          onClick={unselectUser}
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}
