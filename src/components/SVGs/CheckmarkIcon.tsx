import { cn } from "@/lib/utils";
import { type SVGProps } from "react";

export function CheckmarkIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} {...props} className={cn(className)}>
      <title>checkmark</title>
      <path
        fill="currentColor"
        d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"
      ></path>
    </svg>
  );
}
