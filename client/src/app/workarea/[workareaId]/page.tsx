"use client";
import Navbar from "@/components/navbar/Navbar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

enum TaskStatus {
  PENDING = "PENDING",
  PROGRESSING = "PROGRESSING",
  DONE = "DONE",
}

type ITask = {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  status: TaskStatus;
  timeEstimate: string;
  updatedAt: string;
  userId: number;
};

type IHttpResponse = {
  tasks: ITask[];
  total: number;
};

export default function WorkAreaInfo() {
  const { workareaId } = useParams();
  const query = useSearchParams();
  const page = query.get("page") || 1;
  const title = query.get("title");
  const [tasks, setTasks] = useState<ITask[]>();
  const { isActive } = useNavbar();

  useEffect(() => {
    (async () => {
      try {
        const url = `${API_URL}/workarea/${workareaId}/task?page=${page}`;
        const response = await api.get(url);

        const result: IHttpResponse = response.data;

        setTasks(
          result.tasks.map((task) => {
            return {
              ...task,
              createdAt: formatDate(task.createdAt),
              updatedAt: formatDate(task.updatedAt),
              timeEstimate: formatDate(task.timeEstimate),
            };
          })
        );
      } catch (err: any) {
        alert(err.response.data.error);
      }
    })();
  }, [workareaId, page]);

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      year: "2-digit",
      month: "long",
      day: "2-digit",
    });

  return (
    <div className="h-full">
      <Navbar />
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:w-full max-sm:h-[calc(100vh-88px)] overflow-hidden ${
          isActive ? "w-[calc(100vw-64px)]" : "w-full"
        }`}
      >
        <div className="bg-slate-900 h-[100%] sm:rounded-tl-[150px] flex items-end justify-center">
          <div className="h-[90%] block w-[90%]">
            <h1 className="text-5xl text-slate-200">{title}</h1>
            <div className="bg-red-500 w-[100%] h-[90%] mt-2 flex items-end gap-[10%]">

              <div className="bg-green-500 w-[30%] h-[100%] mt-2 flex flex-col gap-3">
                <div className="bg-slate-600 pt-3 pb-3 pl-3">
                  <h1 className="text-slate-200 text-xl">Pending</h1>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto">
                  {tasks?.map((task) => (
                    <div className="bg-sky-500 w-[95%] h-[84px] flex items-center justify-center text-xl rounded-lg ml-auto mr-auto">
                      <h1>{task.title}</h1>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-500 w-[30%] h-[100%] mt-2 flex flex-col">
                <div className="bg-slate-600 pt-3 pb-3 pl-3">
                  <h1 className="text-slate-200 text-xl">Doing</h1>
                </div>
                <div></div>
              </div>

              <div className="bg-sky-500 w-[30%] h-[100%] mt-2 flex flex-col">
                <div className="bg-slate-600 pt-3 pb-3 pl-3">
                  <h1 className="text-slate-200 text-xl">Finished</h1>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {
//   tasks?.map((task) => (
//     <p>
//       {task.title} - {task.description} - {task.status} - {task.timeEstimate}
//     </p>
//   ));
// }

// <div className="h-full bg-slate-900">
//   <Navbar />

// </div>
