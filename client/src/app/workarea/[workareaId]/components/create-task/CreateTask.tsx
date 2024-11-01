import Modal from "@/components/modal/Modal";
import React, { useState } from "react";
import { API_URL } from "@/app/globals";
import api from "@/services/api.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Icon from "@/components/icon/Icon";
import { ITask } from "@/interfaces/task.interface";

type IPromiseHttpResponse = {
  pending: ITask[];
  progressing: ITask[];
  done: ITask[];
};

type ITaskHttp = {
  title: string;
  description?: string;
  timeEstimate?: Date;
  userId?: number;
};

type IProps = {
  workareaId: string | string[];
  setTasks: React.Dispatch<React.SetStateAction<IPromiseHttpResponse>>;
  users: any[];
};

export default function CreateTask({ workareaId, setTasks, users }: IProps) {
  const { handleSubmit, register, reset } = useForm<ITaskHttp>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleTask(task: ITaskHttp) {
    for (let i of Object.keys(task)) {
      if (
        !task[i as keyof ITaskHttp] ||
        task[i as keyof ITaskHttp] === "" ||
        task[i as keyof ITaskHttp] === "select"
      )
        delete task[i as keyof ITaskHttp];
    }

    const url = `${API_URL}/workarea/${workareaId}/task`;

    toast
      .promise(api.post(url, task), {
        pending: "Creating task...",
        success: "Task was created successfully 👌",
      })
      .then((request) => {
        setTasks((prevState) => ({
          pending: [request.data, ...prevState.pending],
          progressing: prevState.progressing,
          done: prevState.done,
        }));

        setIsModalOpen(false);
        reset();
      })
      .catch((reason) => toast.error(reason.response.data.error));
  }

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      trigger={
        <div className="text-slate-200 fixed bottom-5 right-3 z-50">
          <Icon
            iconName="plus"
            className="h-[64px] hover:text-slate-300 cursor-pointer text-slate-200"
          />
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(handleTask)}
        className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]"
      >
        <h2 className="text-xl mb-4 text-slate-200">Create Task</h2>
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
              defaultValue="select"
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
        <div className="col-span-2 flex justify-end gap-4 mt-5">
          <button
            type="button"
            className="pl-6 pr-6 pt-2 pb-2 rounded-md text-red-600 border-[1px] border-red-600 hover:bg-red-700 hover:text-white ease-in-out duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-700 pl-6 pr-6 pt-2 pb-2 rounded-md text-white hover:bg-green-800 ease-in-out duration-200"
          >
            Confirm
          </button>
        </div>
        <button
          type="button"
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
          onClick={() => setIsModalOpen(false)}
        >
          X
        </button>
      </form>
    </Modal>
  );
}
