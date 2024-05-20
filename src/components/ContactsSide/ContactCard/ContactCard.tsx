import { CircleImage } from "@/components/ui/CircleImage/CircleImage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export type ContactCardPropT = {
  username: string;
  date: string;
  lastMessage: string;
  ppUrl?: string;
  selected?: boolean;
  notificationNumber: number;
};
export function ContactCard({
  username,
  date,
  ppUrl,
  selected = false,
  lastMessage,
  notificationNumber = 0,
}: ContactCardPropT) {
  return (
    <div
      className={cn(
        "bg-grey-600 flex h-[72px] w-full cursor-pointer items-center gap-4 px-4 ",
        {
          "bg-grey-200": selected,
          "hover:bg-grey-300": !selected,
        },
      )}
    >
      <CircleImage src={ppUrl} alt={`${username}'s profile picture`} />
      {/* max-w calcs 100% width - the gap size - the profile pic size */}
      <div className="border-myBorder flex h-full max-w-[calc(100%-2.75rem-1rem)] flex-1 flex-col justify-center border-b-[1px]">
        <div className="flex justify-between">
          <div
            className={cn("text-3md text-white-100", {
              "font-medium": notificationNumber > 0,
            })}
          >
            {username}
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
              "text-3sm text-grey-100 truncate",
              notificationNumber > 0 && "text-white-200 font-medium",
            )}
          >
            {lastMessage}
          </div>
          <div className="flex shrink-0  justify-end">
            {notificationNumber > 0 && (
              <div className="bg-primary text-grey-600 text-2sm flex size-5  items-center justify-center rounded-full">
                {notificationNumber}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
