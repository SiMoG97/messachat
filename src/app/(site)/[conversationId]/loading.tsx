import React from "react";
import LoadingSpinner from "@/components/ui/Loading";

export default function Loading() {
  return (
    <div className=" fixed flex  items-center justify-center border-myBorder bg-grey-300 transition md:static md:w-[60%] md:translate-x-0 md:border-l-[1px]  md:transition-none lg:w-[70%]">
      <LoadingSpinner />
    </div>
  );
}
