import { cn } from "@/lib/utils";
import { type SVGProps } from "react";

export function Arrow({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      // viewBox="0 0 12 11"
      height={24}
      width={24}
      className={cn(className)}
      fill="none"
      x="0px"
      y="0px"
      {...props}
    >
      <title>back</title>
      <path
        fill="currentColor"
        d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
      ></path>
    </svg>
  );
}
