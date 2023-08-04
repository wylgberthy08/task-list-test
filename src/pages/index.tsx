import Image from "next/image";
import { Inter } from "next/font/google";
import { TaskCard } from "@/components/TaskCard";
import { VscAdd } from "react-icons/vsc";
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

  function handleTaskAdd(newTaskName: string) {
    if (task === "") {
      return console.log("campo vazio, por favor digite a tarefa");
    }
    const newTask = {
      id: new Date().toString(),
      name: newTaskName,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  }

  function handleTaskRemove(id: string) {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  }

  function HandleCompletingSubTasks(id: string) {
    // Procura a tarefa com o nome fornecido dentro do array de subTasks
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      // Cria uma cópia do array para não modificar o estado original diretamente
      const updatedTasks = [...tasks];
      // Altera o estado de conclusão da tarefa para o oposto
      updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
      // Atualiza o estado com a tarefa modificada
      setTasks(updatedTasks);
    }
  }

  return (
    <div className={`w-screen h-screen   bg-slate-200 pb-3 `}>
      <header
        className={`w-screen h-80 bg-gradient-to-r from-yellow-200 via-green-200 to-green-300 flex items-center justify-center  `}
      >
        <div className={`max-w-xl flex-1 w-[540]`}>
          <h1
            className={`text-4xl text-teal-400 tracking-widest w-full mb-12 flex justify-evenly`}
          >
            T O D O <BsFillClipboardCheckFill />
          </h1>
          <div className={`flex`}>
            <input
              type="text"
              className={`w-full h-16 text-black rounded p-5 border-transparent`}
              placeholder="Create a new todo…"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
            <button
              onClick={() => handleTaskAdd(task)}
              className={`w-16 h-16 bg-teal-400 flex items-center justify-center ml-1 transition duration-300 delay-150 hover:delay-300 rounded `}
            >
              <VscAdd color="#fff" size={30} />
            </button>
          </div>
        </div>
      </header>
      <main className={"flex items-center justify-center"}>
        <div
          className={`max-w-xl flex-1 w-[540] bg-white min-h-[440px] rounded-md`}
        >
          <header className={`p-3`}>
            <button>
              <BsSortUpAlt />
            </button>
          </header>
          <BsFillFileExcelFill />
          {tasks.map((task) => (
            <TaskCard
              onComplete={() => HandleCompletingSubTasks(task.id)}
              onDelete={() => handleTaskRemove(task.name)}
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
