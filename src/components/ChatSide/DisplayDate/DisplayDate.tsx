import React from "react";

type DisplayPropsT = {
  date: string;
};

export function DisplayDate({ date }: DisplayPropsT) {
  return (
    <div className="text-2.5sm bg-grey-700 grey rounded-[7.5px] px-3 py-[5px] uppercase text-grey-100">
      {date}
    </div>
  );
}
