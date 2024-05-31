import {
  DblCheckIcon,
  TailOutLeftticon,
  TailOutRighticon,
} from "@/components/SVGs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type MessagePropsT = {
  direction: "left" | "right";
  message: string | null;
  image: string | null;
  time: string;
  status: "seen" | "delivered";
};

export function Message({
  direction,
  message,
  time,
  status,
  image,
}: MessagePropsT) {
  return (
    <div
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
