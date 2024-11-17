"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import type { Variants } from "framer-motion";

const slideInVariants = {
  initial: (direction: number) => ({
    x: `${direction * 100}%`,
  }),
  show: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const anim = (variants: Variants, custom: number) => {
  return {
    initial: "initial",
    whileInView: "show",
    exit: "initial",
    variants,
    custom,
    // viewport: { once: true, margin: "0px 0px -200px 0px" },
  };
};

export function SlideInAnimWrapper({
  children,
  className,
  direction = "ltr",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "rtl" | "ltr";
}) {
  return (
    <motion.div
      className={cn("motion", className)}
      {...anim(slideInVariants, direction === "rtl" ? 1 : -1)}
    >
      {children}
    </motion.div>
  );
}
