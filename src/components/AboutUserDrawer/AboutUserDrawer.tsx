import { useCloseWithEscape } from "@/Hooks";
import React from "react";
import { Header } from "../ui/Header";
import { Arrow, TrashIcon } from "../SVGs";
import { CircleImage } from "../ui/CircleImage";
import { type Conversation, type User } from "@prisma/client";

type AboutUserDrawerPropsT = {
  closeHandler: () => void;
  deleteChatHandler: () => void;
  user: User;
  conversation: Conversation & { users: User[] };
  // isDialogOpen?:boolean;
};

export function AboutUserDrawer({
  closeHandler,
  deleteChatHandler,
  user,
  conversation,
}: AboutUserDrawerPropsT) {
  useCloseWithEscape(closeHandler);
  return (
    <div className=" h-full  bg-grey-500">
      <div className="flex items-center bg-grey-300">
        <button className=" py-4 pl-4 " onClick={closeHandler}>
          <span className="text-white-100 hover:text-white-200">
            <Arrow />
          </span>
        </button>
        <Header
          name={conversation.isGroup ? "Group info" : "Contact info"}
          className=" flex-1"
          isGroup={conversation.isGroup}
        />
      </div>
      <div className="flex justify-center bg-primary-200 p-8 text-white-100">
        <div className="flex flex-col items-center text-center">
          <CircleImage
            src={!conversation.isGroup ? user.image : null}
            size={"xl"}
            className="my-2"
            isGroup={conversation.isGroup}
          />
          <div className="text-lg">
            {conversation.isGroup ? conversation.name : user.name}
          </div>
          <div className="text-2md text-white-70">
            {conversation.isGroup
              ? `${conversation.users.length} members`
              : user.email}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-grey-700 p-6 px-8">
        <div className="text-md text-grey-100">
          {conversation.isGroup ? "Group members" : "About"}
        </div>
        {!conversation.isGroup && (
          <div className="text-3md text-white-100">{user.bio ?? "No bio"}</div>
        )}
        {conversation.isGroup && (
          <div className="flex w-full flex-wrap gap-4 text-3md text-white-100">
            {conversation.users.map((u) => (
              <div key={u.id} className="flex items-center gap-2 ">
                <CircleImage size={"xsm"} src={u.image} />
                <div className="text-[13.5px] text-white-100">{u.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <button
          className="mt-2 flex w-full cursor-pointer gap-3 bg-grey-700 p-6 px-8 text-3md text-danger hover:bg-grey-300 active:bg-grey-200"
          onClick={deleteChatHandler}
        >
          <TrashIcon />
          <span>Delete {conversation.isGroup ? "group" : "chat"}</span>
        </button>
      </div>
    </div>
  );
}
