"use client";
import { CircleImage } from "@/components/ui/CircleImage/CircleImage";
import { cn } from "@/lib/utils";
import React from "react";

export type ContactCardPropT = {
  id: string;
  name: string;
  date: string;
  lastMessage: string;
  image?: string | null;
  selected?: boolean;
  notificationNumber: number;
  handleClick: () => void;
};

export function ContactCard({
  id,
  name,
  date,
  image,
  selected = false,
  lastMessage,
  notificationNumber = 0,
  handleClick,
}: ContactCardPropT) {
  return (
    <div
      className={cn(
        "flex h-[72px] w-full cursor-pointer items-center gap-4 bg-grey-600 px-4 ",
        {
          "bg-grey-200": selected,
          "hover:bg-grey-300": !selected,
        },
      )}
      onClick={handleClick}
    >
      <CircleImage src={image} alt={`${name}'s profile picture`} />
      {/* max-w calcs 100% width - the gap size - the profile pic size */}
      <div className="flex h-full max-w-[calc(100%-2.75rem-1rem)] flex-1 flex-col justify-center border-b-[1px] border-myBorder">
        <div className="flex justify-between">
          <div
            className={cn("text-3md text-white-100", {
              "font-medium": notificationNumber > 0,
            })}
          >
            {name}
          </div>
          <div
            className={cn(
              "text-2sm text-grey-100",
              notificationNumber > 0 && "text-primary",
            )}
          >
            {date}
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div
            className={cn(
              "truncate text-3sm text-grey-100",
              notificationNumber > 0 && "font-medium text-white-200",
            )}
          >
            {lastMessage}
          </div>
          <div className="flex shrink-0  justify-end">
            {notificationNumber > 0 && (
              <div className="flex size-5 items-center justify-center rounded-full  bg-primary text-2sm text-grey-600">
                {notificationNumber}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
