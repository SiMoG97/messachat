import { useCloseWithEscape } from "@/Hooks";
import React from "react";
import { Header } from "../ui/Header";
import { Arrow, TrashIcon } from "../SVGs";
import { CircleImage } from "../ui/CircleImage";
import { type User } from "@prisma/client";

type AboutUserDrawerPropsT = {
  closeHandler: () => void;
  deleteChatHandler: () => void;
  user: User;
};

export function AboutUserDrawer({
  closeHandler,
  deleteChatHandler,
  user,
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
        <Header name={"Contact info"} className=" flex-1" />
      </div>
      <div className="flex justify-center bg-primary-200 p-8 text-white-100">
        <div className="text-center">
          <CircleImage src={user.image} size={"xl"} className="my-2" />
          <div className="text-lg">{user.name}</div>
          <div className="text-2md text-white-70">{user.email}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-grey-700 p-6 px-8">
        <div className="text-md text-grey-100">About</div>
        <div className="text-3md text-white-100">Think more, do less</div>
      </div>
      <div>
        <button
          className="text-danger mt-2 flex w-full cursor-pointer gap-3 bg-grey-700 p-6 px-8 text-3md hover:bg-grey-300 active:bg-grey-200"
          onClick={deleteChatHandler}
        >
          <TrashIcon />
          <span>Delete chat</span>
        </button>
      </div>
    </div>
  );
}
