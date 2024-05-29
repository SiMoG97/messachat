import { cn } from "@/lib/utils";
import { type SVGProps } from "react";

export function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={16}
      width={16}
      className={cn(className)}
      fill="none"
      x="0px"
      y="0px"
      {...props}
    >
      <title>X icon</title>
      <path
        fill="currentColor"
        enable-background="new    "
        d="M12.174,4.661l-0.836-0.835L8,7.165L4.661,3.826L3.826,4.661 L7.165,8l-3.339,3.339l0.835,0.835L8,8.835l3.338,3.339l0.836-0.835L8.835,8L12.174,4.661z"
      ></path>
    </svg>
  );
}
