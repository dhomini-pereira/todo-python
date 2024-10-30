import { API_URL } from "@/app/globals";
import { useLoading } from "@/context/LoadingContext";
import api from "@/services/api.service";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "react-toastify";
import "./EditTask.css";

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

type IProps = {
  closeModal: () => void;
  task?: ITask;
  setTasks: React.Dispatch<React.SetStateAction<IPromiseHttpResponse>>;
  workareaId: string | string[];
};

export default function EditTask({
  closeModal,
  task,
  setTasks,
  workareaId,
}: IProps) {
  const { handleSubmit, reset, register, control } = useForm<ITask>({
    defaultValues: {
      ...task,
    },
  });

  const [users, setUsers] = useState<any>();

  const { isDirty } = useFormState({ control });
  const loading = useLoading();

  useEffect(() => {
    (async () => {
      try {
        loading.toggle();
        const usersList = await api.get(
          `${API_URL}/workarea/${workareaId}/member`
        );
        setUsers(usersList.data.users);
      } catch (err: any) {
        if (err.response?.data) {
          toast.error(err.response.data.error);
        }
      } finally {
        loading.toggle();
      }
    })();
  }, []);

  const handleEditTask = async (data: ITask) => {
    try {
      loading.toggle();
      const taskInfo = await toast.promise(
        api.put(`${API_URL}/workarea/${workareaId}/task/${task?.id}`, data),
        {
          error: "Error editing task",
          pending: "Editing task...",
          success: "Task edited successfully 👌",
        }
      );

      setTasks((prev) => {
        for (let i of Object.keys(prev)) {
          const index = prev[i as keyof IPromiseHttpResponse].findIndex(
            (t: ITask) => t.id === taskInfo.data.id
          );
          if (index !== -1) {
            prev[i as keyof IPromiseHttpResponse][index] = taskInfo.data;
          }
        }
        return prev;
      });
    } catch (err: any) {
    } finally {
      loading.toggle();
      closeModal();
      reset();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(handleEditTask)}
        className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]"
      >
        <h2 className="text-xl mb-4 text-slate-200">Edit Task</h2>
        <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
          <div className="flex flex-col">
            <label htmlFor="title" className="indent-2 text-slate-300">
              Title
            </label>
            <input
              type="text"
              className="p-2 rounded-md bg-slate-700 text-slate-200"
              id="title"
              {...register("title", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="timeEstimate" className="indent-2 text-slate-300">
              Expiration
            </label>
            <input
              type="date"
              className="p-2 rounded-md bg-slate-700 text-slate-200"
              id="timeEstimate"
              {...register("timeEstimate")}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="userId" className="indent-2 text-slate-300">
              Assigned
            </label>
            <select
              id="userId"
              className="p-2 rounded-md bg-slate-700 text-slate-200"
              {...register("userId")}
            >
              <option value="select" disabled></option>
              {users?.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex flex-col">
            <label htmlFor="description" className="indent-2 text-slate-300">
              Description
            </label>
            <textarea
              className="p-2 rounded-md bg-slate-700 text-slate-200"
              id="description"
              {...register("description")}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
              !isDirty ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isDirty}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
