import React, { useState } from "react";
import { GoCircle } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { TaskItems } from "./TaskItems";
import { TaskItemsProps } from "@/types";

interface TaskCardProps {
  task: TaskItemsProps;
  onDelete: () => void;
  onComplete: (name: string) => void;
}

export function TaskCard({ task, onDelete, onComplete }: TaskCardProps) {
  const [showItems, setShowItems] = useState(false);
  const [done, setDone] = useState(false);
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState<TaskItemsProps[]>([]);

  function handleAddedSubTask(newSubTaskName: string) {
    if (subTask === "") {
      return console.log("campo vazio, por favor digite a tarefa");
    }
    const newSubTask = {
      id: new Date().toString(),
      name: newSubTaskName,
      done: false,
    };
    setSubTasks([...subTasks, newSubTask]);
    setSubTask("");
  }

  function handleShowItems() {
    setShowItems(!showItems);
  }

  function HandleCompletingSubTasks(id: string) {
    const taskIndex = subTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      const updatedSubTasks = [...subTasks];
      updatedSubTasks[taskIndex].done = !updatedSubTasks[taskIndex].done;
      setSubTasks(updatedSubTasks);
    }
  }
  return (
    <div
      className={`flex flex-col w-full items-center  p-5 border-b-[1px] border-neutral-300 border-solid`}
    >
      <div className={`flex w-full items-center justify-between`}>
        <div className={` flex items-center`}>
          <button onClick={() => onComplete(task.name)}>
            {!task.done && <GoCircle color="#000" />}
            {task.done && <GoCheckCircle color="#000" />}
          </button>
          <p
            className={` ${
              !task.done ? "text-slate-700 " : "text-slate-400 line-through "
            } text-sm font-normal ml-3 justify-between`}
          >
            {task.name}
          </p>
        </div>

        <div>
          <button className={``} onClick={onDelete}>
            <FaRegTrashAlt color="#000" />
          </button>
          <button className={``} onClick={handleShowItems}>
            {showItems && <GoTriangleUp color="#000" />}
            {!showItems && <GoTriangleDown color="#000" />}
          </button>
        </div>
      </div>

      {showItems && (
        <>
          <div className={`w-full flex  items-center pl-9 mt-2`}>
            <input
              placeholder="Create your subtask"
              type="text"
              className={`bg-slate-100`}
              value={subTask}
              onChange={(event) => setSubTask(event.target.value)}
            />
            <button
              onClick={() => handleAddedSubTask(subTask)}
              className={` w-6 h-6 bg-teal-400 flex items-center justify-center ml-1 hover:bg-sky-200 rounded`}
            >
              <VscAdd color="#fff" />
            </button>
          </div>

          <div className={`w-full mt-2`}>
            {subTasks.map((subTask) => (
              <TaskItems
                key={subTask.id}
                item={subTask.name}
                onComplete={() => HandleCompletingSubTasks(subTask.id)}
                done={subTask.done}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
