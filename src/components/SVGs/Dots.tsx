import React, { type SVGProps } from "react";
import { cn } from "@/lib/utils";

export function DotsIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} {...props} className={cn(className)}>
      <title>{"menu"}</title>
      <path
        // fill="currentColor"
        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
      />
    </svg>
  );
}
