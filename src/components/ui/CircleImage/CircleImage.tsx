import Image from "next/image";
import React, { type ComponentProps } from "react";
import pp_placeholder from "@/../public/pp_placeholder.webp";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const circleImageVariants = cva(
  "relative size-11 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "size-[40px]",
        md: "size-[49px]",
        lg: "size-[55px]",
        xl: "size-[200px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type CircleImagePropsT = {
  src?: string | null;
  alt?: string;
} & ComponentProps<"div"> &
  VariantProps<typeof circleImageVariants>;
export function CircleImage({
  src,
  alt = "",
  size,
  className,
  children,
  ...props
}: CircleImagePropsT) {
  return (
    <div className={cn(circleImageVariants({ size, className }))} {...props}>
      <Image
        src={src ?? pp_placeholder}
        alt={alt}
        className="object-cover"
        objectFit="cover"
        layout="fill"
      />
      {children && children}
    </div>
  );
}
