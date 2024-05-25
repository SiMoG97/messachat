import Image from "next/image";
import React from "react";

export function WelcomeComp() {
  return (
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
  );
}
