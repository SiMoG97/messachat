import {
  DblCheckIcon,
  TailOutLeftticon,
  TailOutRighticon,
  TimeIcon,
} from "@/components/SVGs";
import { cn } from "@/lib/utils";
import React from "react";

type MessagePropsT = {
  direction: "left" | "right";
  message: string;
  time: string;
  status: "seen" | "delivered" | "notDelivered";
};

export function Message({ direction, message, time, status }: MessagePropsT) {
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
          {message}
        </span>
        <div className="mb-[-3px] mt-[2px] flex justify-end">
          <div className="flex items-center gap-1">
            <span className="text-sm text-white-70">{time}</span>
            <div
              className={cn("text-white-70", {
                "text-[#53bdeb]": status === "seen",
              })}
            >
              {status === "seen" && <DblCheckIcon />}
              {status === "delivered" && <DblCheckIcon />}
              {status === "notDelivered" && <TimeIcon />}
            </div>
          </div>
        </div>
        <span
          className={cn("tail-icon-span absolute top-0 hidden text-[red]", {
            "text-primary-200 right-[-8px]": direction === "right",
            "left-[-8px] text-grey-300": direction === "left",
          })}
        >
          {direction === "right" ? <TailOutRighticon /> : <TailOutLeftticon />}
        </span>
      </div>
    </div>
  );
}
