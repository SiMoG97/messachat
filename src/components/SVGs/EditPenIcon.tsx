import React, { type SVGProps } from "react";
import { cn } from "@/lib/utils";

export function EditPenIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} {...props} className={cn(className)}>
      <title>pencil</title>
      <path
        fill="currentColor"
        d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
      ></path>
    </svg>
  );
}
