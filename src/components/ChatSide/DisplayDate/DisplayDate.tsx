import React from "react";

type DisplayPropsT = {
  date: string;
};

export function DisplayDate({ date }: DisplayPropsT) {
  return (
    <div className="z-1 relative mx-auto mb-3 w-fit rounded-[7.5px] bg-grey-700 px-3 py-[5px] text-2.5sm uppercase text-grey-100">
      {date}
    </div>
  );
}
