"use client";
import { API_URL } from "@/app/globals";
import Navbar from "@/components/navbar/Navbar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

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

type IPromiseHttpResponse = {
  pending: ITask[];
  progressing: ITask[];
  done: ITask[];
};

export default function WorkAreaInfo() {
  const { workareaId } = useParams();
  const query = useSearchParams();
  const page = query.get("page") || 1;
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<IPromiseHttpResponse>({
    pending: [],
    progressing: [],
    done: [],
  });
  const { isActive } = useNavbar();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    (async () => {
      try {
        const url = `${API_URL}/workarea/${workareaId}/task?page=${page}`;
        const [pendingTasks, progressingTasks, doneTasks, workarea] =
          await Promise.all([
            api.get(url + "&status=PENDING").catch((err) => {
              if (err.response?.status === 404) {
                return { data: { tasks: [] } };
              }
              throw err;
            }),
            api.get(url + "&status=PROGRESSING").catch((err) => {
              if (err.response?.status === 404) {
                return { data: { tasks: [] } };
              }
              throw err;
            }),
            api.get(url + "&status=DONE").catch((err) => {
              if (err.response?.status === 404) {
                return { data: { tasks: [] } };
              }
              throw err;
            }),
            api.get(`${API_URL}/workarea/${workareaId}`),
          ]);

        setTitle(workarea.data.name);
        // setTitle("Titulo Aqui");

        const httpResponse: IPromiseHttpResponse = {
          pending: pendingTasks.data.tasks,
          progressing: progressingTasks.data.tasks,
          done: doneTasks.data.tasks,
        };

        setTasks(httpResponse);
      } catch (err: any) {
        console.log(err);
        alert(err.response?.data?.error || "Erro desconhecido");
      }
    })();
  }, [hydrated, workareaId, page]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks: IPromiseHttpResponse = { ...tasks };

    const sourceList =
      updatedTasks[source.droppableId as keyof IPromiseHttpResponse];
    const destinationList =
      updatedTasks[destination.droppableId as keyof IPromiseHttpResponse];

    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);

    if (source.droppableId !== destination.droppableId) {
      movedTask.status = destination.droppableId.toUpperCase() as TaskStatus;
    }

    setTasks(updatedTasks);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const url = `${API_URL}/workarea/${workareaId}/task/${movedTask.id}`;

      await api.put(url, {
        status:
          TaskStatus[
            destination.droppableId.toUpperCase() as keyof typeof TaskStatus
          ],
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="h-full">
      <Navbar />
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:w-full max-sm:h-[calc(100vh-88px)] overflow-hidden ${
          isActive ? "w-[calc(100vw-64px)]" : "w-full"
        }`}
      >
        <div className="bg-slate-900 h-full sm:rounded-tl-[150px] flex items-end justify-center">
          <div className="h-[90%] block w-[90%]">
            <h1 className="text-4xl text-slate-200 pb-1">{title}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className=" w-full h-[90%] mt-2 flex items-end gap-[2%]">
                {["pending", "progressing", "done"].map((status) => (
                  <Droppable droppableId={status} key={status}>
                    {(provided) => (
                      <div
                        className={`bg-slate-800 w-[40%] h-full mt-2 flex flex-col gap-3 rounded-lg border-x-8 border-slate-700`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="bg-slate-800 pt-3 pb-3 pl-3">
                          <h1 className="text-slate-200 text-xl flex items-center gap-2">
                            <span
                              className={`${
                                status === "pending"
                                  ? "text-green-500"
                                  : status === "progressing"
                                  ? "text-yellow-500"
                                  : "text-sky-500"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-2"
                              >
                                <path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3h-9.5Z" />
                              </svg>
                            </span>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </h1>
                        </div>
                        <div className="flex flex-col gap-2 overflow-y-auto">
                          {tasks[status as keyof IPromiseHttpResponse].map(
                            (task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className={`border-l-8 ${
                                      status === "pending"
                                        ? "border-green-500"
                                        : status === "progressing"
                                        ? "border-yellow-500"
                                        : "border-sky-500"
                                    } bg-slate-600 opacity-90 w-[95%] h-[84px] flex items-center justify-center text-xl rounded-lg ml-auto mr-auto`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <h1 className="text-slate-100 text-[18px] p-4 leading-5">
                                      {task.title}
                                    </h1>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
