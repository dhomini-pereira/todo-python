import { API_URL } from "@/app/globals";
import { useLoading } from "@/context/LoadingContext";
import api from "@/services/api.service";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "react-toastify";

type ITask = {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  status: "PENDING" | "PROGRESSING" | "DONE";
  timeEstimate: string;
  updatedAt: string;
  userId: number;
};

type IProps = {
  closeModal: () => void;
  task: ITask | null;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
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
      id: task?.id,
      title: task?.title,
      description: task?.description,
      status: task?.status,
      timeEstimate: task?.timeEstimate,
      userId: task?.userId,
    },
  });

  const { isDirty } = useFormState({ control });
  const loading = useLoading();

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

      setTasks((prev: any) => {
        return [...prev, taskInfo.data];
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
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3"
            {...register("title", { required: true })}
          />
          <label htmlFor="description" className="text-white">
            Description
          </label>
          <textarea
            id="description"
            className="bg-zinc-900 border-2 border-blue-800 rounded-md h-20 outline-none focus:border-blue-950 indent-3"
            {...register("description", { required: true })}
          />
          <label htmlFor="timeEstimate" className="text-white">
            Time Estimate
          </label>
          <input
            type="text"
            id="timeEstimate"
            className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3"
            {...register("timeEstimate", { required: true })}
          />
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
