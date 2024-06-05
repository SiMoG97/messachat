import {
  DblCheckIcon,
  TailOutLeftticon,
  TailOutRighticon,
} from "@/components/SVGs";
import { CircleImage } from "@/components/ui/CircleImage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type MessagePropsT = {
  direction: "left" | "right";
  message: string | null;
  image: string | null;
  time: string;
  status: "seen" | "delivered";
  isGroup?: boolean | null;
  username?: string | null;
  userProfilePic?: string | null;
};

export function Message({
  direction,
  message,
  time,
  status,
  image,
  isGroup = null,
  username = null,
  userProfilePic,
}: MessagePropsT) {
  const [showUserDetails, setShowUserDetails] = useState(false);

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevElmText =
      messageRef.current?.previousElementSibling?.querySelector(
        ".user-details",
      )?.textContent;

    setShowUserDetails(prevElmText === username);
  }, [username]);

  return (
    <div
      ref={messageRef}
      className={cn(" mb-3  flex  md:px-16 md:pl-16 md:pr-16", {
        "message-right justify-end pl-12 pr-5 ": direction === "right",
        "message-left justify-start pl-5 pr-12 ": direction === "left",
      })}
    >
      <div
        className={cn(
          "relative min-w-[86px] max-w-screen-sm rounded-[7.5px] pb-[8px] pl-[9px] pr-[7px] pt-[6px]",
          {
            "bg-primary-200": direction === "right",
            "bg-grey-400": direction === "left",
          },
        )}
      >
        {direction === "left" && username && isGroup && (
          <div
            className={cn("user-details", {
              hidden: showUserDetails,
            })}
          >
            <CircleImage
              size={"xsm"}
              className="absolute left-0 top-0 translate-x-[-130%]"
              src={userProfilePic}
            />
            <div className="text-2sm font-semibold text-[#a5b337]">
              {username}
            </div>
          </div>
        )}
        <span className="relative whitespace-pre-wrap break-words text-4sm text-white-100">
          {message && message}
          {image && (
            <Image
              src={image}
              width={300}
              height={300}
              className="object-cover"
              alt="image message"
            />
          )}
        </span>
        <div className="mb-[-3px] mt-[2px] flex justify-end">
          <div className="flex items-center gap-1">
            <span className="text-sm text-white-70">{time}</span>
            {direction === "right" && (
              <div
                className={cn("text-white-70", {
                  "text-[#53bdeb]": status === "seen",
                })}
              >
                {status === "seen" && <DblCheckIcon />}
                {status === "delivered" && <DblCheckIcon />}
              </div>
            )}
          </div>
        </div>
        <span
          className={cn("tail-icon-span absolute top-0 hidden text-[red]", {
            "right-[-8px] text-primary-200": direction === "right",
            "left-[-8px] text-grey-300": direction === "left",
          })}
        >
          {direction === "right" ? <TailOutRighticon /> : <TailOutLeftticon />}
        </span>
      </div>
    </div>
  );
}
