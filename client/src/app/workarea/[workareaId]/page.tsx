"use client";
import { API_URL } from "@/app/globals";
import Navbar from "@/components/navbar/Navbar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import "./WorkareaId.css";
import CreateTask from "./components/create-task/CreateTask";
import DeleteTask from "./components/delete-task/DeleteTask";
import Icon from "@/components/icon/Icon";
import { useLoading } from "@/context/LoadingContext";
import EditTask from "./components/edit-task/EditTask";
import { toast } from "react-toastify";
import { ITask, TaskStatus } from "@/interfaces/task.interface";
import { IUser } from "@/interfaces/user.interface";

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
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [selectedEditTask, setSelectedEditTask] = useState<ITask>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<IUser>();
  const loading = useLoading();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    (async () => {
      try {
        loading.toggle();
        const url = `${API_URL}/workarea/${workareaId}/task?page=${page}`;
        const [
          pendingTasks,
          progressingTasks,
          doneTasks,
          workarea,
          usersList,
          user,
        ] = await Promise.all([
          api.get(url + "&status=PENDING"),
          api.get(url + "&status=PROGRESSING"),
          api.get(url + "&status=DONE"),
          api.get(`${API_URL}/workarea/${workareaId}`),
          api.get(`${API_URL}/workarea/${workareaId}/member`),
          api.get(`${API_URL}/user`),
        ]);
        setTitle(workarea.data.name);
        setUsers(usersList.data.users);
        setUser(user.data);

        const httpResponse: IPromiseHttpResponse = {
          pending: pendingTasks.data.tasks,
          progressing: progressingTasks.data.tasks,
          done: doneTasks.data.tasks,
        };

        setTasks(httpResponse);
      } catch (err: any) {
        toast.error(err.response?.data?.error);
      } finally {
        loading.toggle();
      }
    })();
  }, [hydrated, workareaId, page]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
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
      const url = `${API_URL}/workarea/${workareaId}/task/${movedTask.id}`;
      await api.put(url, {
        status:
          TaskStatus[
            destination.droppableId.toUpperCase() as keyof typeof TaskStatus
          ],
      });
    } catch (err: any) {
      toast.error(err.response?.data?.error);
    }
  };

  const openDeleteModal = (task: ITask) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const openEditModal = (task: ITask) => {
    setSelectedEditTask(task);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedTask(null);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="h-full">
      <Navbar user={user} />
      <CreateTask setTasks={setTasks} workareaId={workareaId} users={users} />
      {showDeleteModal && (
        <DeleteTask
          setTasks={setTasks}
          workareaId={workareaId}
          taskId={selectedTask?.id}
          closeModal={closeModal}
        />
      )}
      {showEditModal && (
        <EditTask
          setTasks={setTasks}
          workareaId={workareaId}
          task={selectedEditTask}
          closeModal={closeEditModal}
          users={users}
        />
      )}
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:w-[100vw] max-sm:h-[calc(100vh-88px)] overflow-hidden ${
          isActive ? "w-[calc(100vw-64px)]" : "w-full"
        }`}
      >
        <div className="bg-slate-900 h-full sm:rounded-tl-[150px] flex items-end justify-center overflow-auto">
          <div className="h-[90%] block w-[90%]">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl text-slate-200 pb-1">{title}</h1>
              <Icon
                iconName="settings"
                className="w-11 h-11 p-2 text-white cursor-pointer rounded-full hover:bg-slate-700 ease-in-out duration-500"
                onClick={() => router.push(`/workarea/${workareaId}/settings`)}
              />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="w-full h-[90%] max-sm:h-[60vh] mt-2 flex items-end gap-[2%] min-w-[1000px]">
                {Object.keys(tasks).map((status) => (
                  <Droppable droppableId={status} key={status} mode="virtual">
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
                                  ? "text-yellow-500"
                                  : status === "progressing"
                                  ? "text-orange-500"
                                  : "text-green-500"
                              }`}
                            >
                              <Icon iconName="square" className="h-2" />
                            </span>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </h1>
                        </div>
                        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                          {tasks[status as keyof IPromiseHttpResponse].map(
                            (task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className={`cardStyle border-l-8 ${
                                      status === "pending"
                                        ? "border-yellow-500"
                                        : status === "progressing"
                                        ? "border-orange-500"
                                        : "border-green-500"
                                    } bg-slate-600 opacity-90 w-[95%] h-[84px] flex items-center justify-center text-xl rounded-lg ml-auto mr-auto min-h-[80px] relative`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <h1
                                      onClick={() => openEditModal(task)}
                                      className="text-slate-200 cursor-pointer hover:underline"
                                    >
                                      {task.title}
                                    </h1>
                                    {task?.timeEstimate ? (
                                      new Date(task.timeEstimate).getTime() <
                                        new Date().getTime() &&
                                      task.status !== "DONE" ? (
                                        <>
                                          <Icon
                                            iconName="warning"
                                            className={`warning size-6 absolute left-2 ${
                                              status === "pending"
                                                ? "text-yellow-500"
                                                : status === "progressing"
                                                ? "text-orange-500"
                                                : "text-green-500"
                                            }`}
                                          />
                                          <span className="timeLimit absolute left-10 text-sm hidden p-1 rounded-lg bg-red-600 text-white">
                                            Task expired
                                          </span>
                                        </>
                                      ) : null
                                    ) : null}
                                    <Icon
                                      iconName="trash"
                                      onClick={() => openDeleteModal(task)}
                                      className="trash size-5 absolute right-2 top-2 text-red-500 opacity-0 transition-all"
                                    />
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
