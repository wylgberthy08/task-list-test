import Image from "next/image";
import { Inter } from "next/font/google";
import { TaskCard } from "@/components/TaskCard";
import { VscAdd, VscSortPrecedence } from "react-icons/vsc";
import {
  BsFillClipboardCheckFill,
  BsSortUpAlt,
  BsFillFileExcelFill,
} from "react-icons/bs";
import { useState } from "react";
import { TaskItemsProps } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskItemsProps[]>([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [isError, setIsError] = useState(false);

  function handleTaskAdd(newTaskName: string) {
    if (task === "") {
      setIsError(true);
      return;
    }
    const newTask = {
      id: new Date().toString(),
      name: newTaskName,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
    setIsError(false);
  }

  function handleTaskRemove(id: string) {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  }

  function HandleCompletingSubTasks(id: string) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
      setTasks(updatedTasks);
    }
  }

  function handleOrderTasks() {
    setTasks((prevSubTasks) => {
      const sortedTasks = [...prevSubTasks];

      sortedTasks.sort((taskA, taskB) => {
        if (ascendingOrder) {
          return Number(taskA.done) - Number(taskB.done);
        } else {
          return Number(taskB.done) - Number(taskA.done);
        }
      });

      return sortedTasks;
    });

    setAscendingOrder((prevAscendingOrder) => !prevAscendingOrder);
  }
  return (
    <div className={`w-screen h-screen bg-slate-200 pb-3 `}>
      <header
        className={`w-screen h-80 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900 flex items-center justify-center  `}
      >
        <div className={`max-w-sm flex-1 w-[327] md:w-[540] md:max-w-xl`}>
          <h1
            className={`text-4xl text-gray-50 tracking-widest w-full mb-12 flex justify-evenly`}
          >
            Task List
            <BsFillClipboardCheckFill />
          </h1>
          <div className={`flex`}>
            <div className={`w-full`}>
              <input
                type="text"
                className={`w-full h-10 text-black rounded p-5 border-transparent md:h-16 `}
                placeholder="Create a new todo…"
                value={task}
                onChange={(event) => setTask(event.target.value)}
              />
              {isError && (
                <strong className={`text-red-600`}>
                  campo vazio, por favor digite a tarefa
                </strong>
              )}
            </div>
            <button
              onClick={() => handleTaskAdd(task)}
              className={`w-10 h-10 bg-teal-400 hover:bg-teal-200 flex items-center justify-center ml-1 transition duration-300 delay-150 hover:delay-300 rounded md:w-16 md:h-16`}
            >
              <VscAdd color="#fff" size={30} />
            </button>
          </div>
        </div>
      </header>
      <main
        className={"flex items-center justify-center relative bottom-16 p-4"}
      >
        <div
          className={` flex-1 max-h-80  w-[150] bg-white min-h-[440px] rounded-md md:w-[540] md:max-w-xl`}
        >
          <header className={`p-3`}>
            <button onClick={handleOrderTasks}>
              <VscSortPrecedence color="rgb(45 212 191)" size={40} />
            </button>
            <p></p>
          </header>

          {tasks.map((task) => (
            <TaskCard
              onComplete={() => HandleCompletingSubTasks(task.id)}
              onDelete={() => handleTaskRemove(task.id)}
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
