"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ContactCard } from "./ContactCard";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Arrow, CheckmarkIcon, XIcon } from "../SVGs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type User, type Conversation } from "@prisma/client";
import { CircleImage } from "../ui/CircleImage";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

type NewGroupAsidePropsT = {
  // contacts: User[];
  // isOpen: boolean;
  closeHandler: () => void;
  contacts: User[];
};

const GroupSchema = z.object({
  name: z.string().min(1).max(25),
  members: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .min(1),
});

type GroupType = z.infer<typeof GroupSchema>;
export function NewGroupAside({
  contacts,
  closeHandler,
  // isOpen,
}: NewGroupAsidePropsT) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [members, setMembers] = useState<User[]>([]);
  // const session = useSession

  const { handleSubmit, register, setValue, formState } = useForm<GroupType>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  useEffect(() => {
    setValue(
      "members",
      members.map((m) => ({ id: m.id })),
      { shouldValidate: true },
    );
  }, [members, setValue]);

  const onSubmit = (data: GroupType) => {
    setIsLoading(true);
    axios
      .post<Conversation>("/api/conversations", {
        isGroup: true,
        ...data,
      })
      .then(({ data }) => {
        router.push(`/${data.id}`);
        router.refresh();
        closeHandler();
      })
      .catch((e) => {
        console.log(e);
        toast({ title: "Something went wrong!" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={cn(" flex h-full w-full flex-col bg-grey-500")}>
      {/* Header */}
      <div className="flex  bg-grey-300">
        <div className="mt-[50px] flex items-center gap-3 px-2 py-3 text-5md font-medium text-white-100">
          <Button variant={"rounded"} onClick={closeHandler}>
            <span>
              <Arrow />
            </span>
          </Button>
          <div>Create new Group</div>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="disabled group mx-6 flex items-center gap-2 text-white-100 shadow-input shadow-grey-100/85 focus-within:shadow-primary">
          <input
            {...register("name")}
            placeholder="Group name"
            className="h-[34px] flex-1 border-none bg-[#00000000] pl-[1px]  outline-none disabled:cursor-not-allowed "
            disabled={isLoading}
          />
        </div>

        <div className="flex  justify-center  py-6">
          {formState.isValid && (
            <button
              className="flex size-12 items-center justify-center rounded-full bg-primary text-white-100"
              type="submit"
            >
              <CheckmarkIcon />
            </button>
          )}
        </div>
      </form>
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
