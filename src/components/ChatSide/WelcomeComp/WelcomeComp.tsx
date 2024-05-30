"use client";
import { useConversation } from "@/Hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export function WelcomeComp() {
  const { isOpen } = useConversation();

  return (
    <div
      className={cn(
        " fixed h-full w-full border-myBorder transition md:static md:w-[60%] md:translate-x-0 md:border-l-[1px]  md:transition-none lg:w-[70%]",
        {
          "translate-x-full": !isOpen,
        },
      )}
    >
      <div className=" h-full  bg-grey-400 p-5">
        <div className="mx-auto flex h-full w-full max-w-[580px] flex-col items-center justify-center gap-5 text-center ">
          <Image
            src="/whatsappLaptop.png"
            width={320}
            height={188}
            alt="Laptop image"
          />
          <div>
            <h1 className="text-2lg font-light text-white-100">
              Start a conversation with a friend!
              {/* <BeatLoader color="#36d7b7" /> */}
            </h1>
          </div>
          <div>
            <p className="text-5sm text-grey-100">
              Tip: to close a chat press ESC in your keyboard or click on the
              dowpdown menu at the top right and select Close chat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
