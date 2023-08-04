import React from "react";
import { GoCircle } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";

export interface TaskItemsProps {
  item: string;
  done: boolean;
  onComplete: () => void;
}

export function TaskItems({ item, done, onComplete }: TaskItemsProps) {
  return (
    <div className={`flex w-full items-center pl-9 mt-2 `}>
      <button onClick={onComplete}>
        {!done && <GoCircle color="#000" />}
        {done && <GoCheckCircle color="#000" />}
      </button>
      <p
        className={` ${
          !done ? "text-slate-700 " : "text-slate-400 line-through "
        } text-sm font-normal ml-3 justify-between`}
      >
        {item}
      </p>
    </div>
  );
}
