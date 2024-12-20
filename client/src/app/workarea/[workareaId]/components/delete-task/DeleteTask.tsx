import { API_URL } from "@/app/globals";
import Modal from "@/components/modal/Modal";
import { useLoading } from "@/context/LoadingContext";
import { ITask } from "@/interfaces/task.interface";
import api from "@/services/api.service";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type IPromiseHttpResponse = {
  pending: ITask[];
  progressing: ITask[];
  done: ITask[];
};

type IProps = {
  workareaId: string | string[];
  taskId?: number;
  setTasks: React.Dispatch<React.SetStateAction<IPromiseHttpResponse>>;
  closeModal: () => void;
};

export default function DeleteTask({
  workareaId,
  taskId,
  setTasks,
  closeModal,
}: IProps) {
  const { handleSubmit } = useForm();

  const handleDeleteTask = () => {
    const url = `${API_URL}/workarea/${workareaId}/task/${taskId}`;

    toast
      .promise(api.delete(url), {
        pending: "Deleting task...",
        success: "Task deleted successfully 👌",
      })
      .then((_) => {
        setTasks((prevState) => ({
          ...prevState,
          pending: prevState.pending.filter((task) => task.id !== taskId),
          progressing: prevState.progressing.filter(
            (task) => task.id !== taskId
          ),
          done: prevState.done.filter((task) => task.id !== taskId),
        }));

        closeModal();
      })
      .catch((reason) => toast.error(reason.response.data.error));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(handleDeleteTask)}
        className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]"
      >
        <p className="text-white">Deseja realmente deletar esta tarefa?</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Deletar
          </button>
        </div>
      </form>
    </div>
  );
}
