import { API_URL } from "@/app/globals";
import Icon from "@/components/icon/Icon";
import Modal from "@/components/modal/Modal";
import { useLoading } from "@/context/LoadingContext";
import api from "@/services/api.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type CreateWorkarea = {
  name: string;
  type: "PERSONAL" | "PROFESSIONAL";
};

export default function CreateWorkarea() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm<CreateWorkarea>();
  const router = useRouter();
  const loading = useLoading();

  const handle = async (data: CreateWorkarea) => {
    try {
      loading.toggle();
      const workarea = await toast.promise(
        api.post(`${API_URL}/workarea`, data),
        {
          pending: "Creating workarea...",
          success: "Workarea created successfully 👌",
          error: "Error creating workarea 🤯",
        }
      );

      router.push(`/workarea/${workarea.data.id}`);
    } catch (err: any) {
    } finally {
      loading.toggle();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      trigger={
        <a className="w-[18%] max-md:w-full md:max-w-[300px]">
          <div
            className={`opacity-70 hover:opacity-100 w-[100%] h-[175px] text-center rounded-xl bg-sky-800 hover:bg-sky-700 duration-500 ease-in-out flex items-center justify-center flex-col gap  cursor-pointer max-md:w-full max-md:h-[100px] md:max-w-[300px]`}
          >
            <Icon iconName="plus" className="text-white w-20" />
          </div>
        </a>
      }
    >
      <form
        onSubmit={handleSubmit(handle)}
        className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]"
      >
        <h2 className="text-xl text-slate-200 mb-4">Create Workarea</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Workarea Name"
            className="bg-slate-600 text-white p-2 rounded-md"
            {...register("name", { required: true })}
          />
          <select
            className="bg-slate-600 text-white p-2 rounded-md"
            {...register("type", { required: true })}
          >
            <option value="PERSONAL">PERSONAL</option>
            <option value="PROFESSIONAL">PROFESSIONAL</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-700"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
