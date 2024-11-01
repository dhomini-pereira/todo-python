import { API_URL } from "@/app/globals";
import Icon from "@/components/icon/Icon";
import Modal from "@/components/modal/Modal";
import api from "@/services/api.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type IProps = {
  workareaId: string | string[];
};

export default function DeleteWorkarea({ workareaId }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    toast
      .promise(api.delete(`${API_URL}/workarea/${workareaId}`), {
        pending: "Deleting workarea...",
        success: "Workarea deleted successfully!",
      })
      .then(() => {
        router.push("/workarea");
      })
      .catch((reason) => toast.error(reason.response.data.error));
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      trigger={
        <button className="submit border-[1px] border-red-500 hover:bg-red-500 w-[10%] flex items-center justify-center rounded-md transition-all duration-200 hover:text-white text-red-500">
          <Icon iconName="trash" className="w-6 " />
        </button>
      }
    >
      <form className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]">
        <h2 className="text-xl text-slate-200 mb-4">
          Are you sure you want to delete this workarea?
        </h2>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
}
