"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { WelcomeComp } from "./WelcomeComp";
import { ChatComp } from "./ChatComp";
import { useConversation } from "@/Hooks";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function ChatSide() {
  const { isOpen } = useConversation();

  const session = useSession();
  console.log(session);
  useCloseChatWithEscapeBtnKeyboard();

  return (
    <div
      className={cn(
        " fixed h-full w-full border-myBorder transition md:static md:w-[60%] md:translate-x-0 md:border-l-[1px]  md:transition-none lg:w-[70%]",
        {
          "translate-x-full": !isOpen,
        },
      )}
    >
      {!isOpen ? <WelcomeComp /> : <ChatComp />}
      <br />
      <button
        className="block md:hidden"
        //  onClick={closeChat}
      >
        show Contacts
      </button>
    </div>
  );
}

const useCloseChatWithEscapeBtnKeyboard = () => {
  const router = useRouter();
  useEffect(() => {
    const escaplePressHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", escaplePressHandler);
    return () => window.removeEventListener("keydown", escaplePressHandler);
  }, [router]);
};
