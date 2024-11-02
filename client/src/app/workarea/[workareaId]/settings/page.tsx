"use client";

import { API_URL } from "@/app/globals";
import Icon from "@/components/icon/Icon";
import Modal from "@/components/modal/Modal";
import Navbar from "@/components/navbar/Navbar";
import { useLoading } from "@/context/LoadingContext";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DeleteWorkarea from "./components/DeleteWorkarea";
import { IUser } from "@/interfaces/user.interface";
import { IWorkarea } from "@/interfaces/workarea.interface";

type IUpdateWorkarea = {
  name: string;
};

type IAddUser = {
  username: string;
};

export default function Settings() {
  const { workareaId } = useParams();
  const { isActive } = useNavbar();
  const loading = useLoading();
  const { register, handleSubmit } = useForm<IUpdateWorkarea>();
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    reset: resetUserForm,
  } = useForm<IAddUser>();
  const [workarea, setWorkarea] = useState<IWorkarea>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      try {
        loading.toggle();
        const [workareaRequest, membersRequest, userRequest] =
          await Promise.all([
            api.get(`${API_URL}/workarea/${workareaId}`),
            api.get(`${API_URL}/workarea/${workareaId}/member?member=true`),
            api.get(`${API_URL}/user`),
          ]);
        setWorkarea(workareaRequest.data);
        setUsers(membersRequest.data.users);
        setUser(userRequest.data);
      } catch (err: any) {
        toast.error(err.response?.data?.error);
      } finally {
        loading.toggle();
      }
    })();
  }, []);

  const handleUpdateWorkarea = (data: IUpdateWorkarea) => {
    toast
      .promise(api.put(`${API_URL}/workarea/${workareaId}`, data), {
        pending: "Updating workarea...",
        success: "Updated workarea successfully!",
      })
      .then((request) => {
        setWorkarea((prev) => {
          if (prev) {
            return {
              ...prev,
              name: request.data.name,
            };
          }
        });
      })
      .catch((reason) => toast.error(reason.response.data.error));
  };

  const handleAddUser = (data: IAddUser) => {
    toast
      .promise(
        api.post(`${API_URL}/workarea/${workareaId}/member/${data.username}`),
        {
          pending: "Add user...",
          success: "User added successfully!",
        }
      )
      .then((request) => {
        setIsModalOpen(false);
        resetUserForm();
        setUsers((prev) => (prev ? [...prev, request.data] : [request.data]));
      })
      .catch((reason) => toast.error(reason.response.data.error));
  };

  const handleRemoveUser = (username: string) => {
    toast
      .promise(
        api.delete(`${API_URL}/workarea/${workareaId}/member/${username}`),
        {
          pending: "Removing user...",
          success: "User removed successfully!",
        }
      )
      .then(() => {
        setUsers(users.filter((user) => user.username !== username));
      })
      .catch((reason) => toast.error(reason.response.data.error));
  };

  return (
    <div className="h-full">
      <Navbar user={user} />
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:ml-0 max-sm:w-fit max-sm:max-w-[100vw] max-sm:h-[calc(100vh-88px)] overflow-hidden ${
          isActive ? "w-[calc(100vw-64px)]" : "w-[100vw]"
        }`}
      >
        <div className="bg-slate-900 h-[100%] sm:rounded-tl-[150px] flex flex-col items-center justify-start p-8">
          <div className="w-[90%]">
            <h1 className="text-5xl text-slate-200">Workarea Settings</h1>
            <p className="text-slate-500">
              Configure your workarea settings to your liking. Customize your
              workarea to fit your needs.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 max-sm:flex-col w-[100%] max-sm:h-[54vh] max-sm:pr-2 overflow-y-auto max-sm:flex justify-center items-center h-full">
            <div className="flex flex-col gap-6 justify-center h-fit w-[100%] max-w-[700px]">
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(handleUpdateWorkarea)}
              >
                <div className="flex  w-full gap-4">
                  <input
                    type="text"
                    placeholder={workarea?.name}
                    {...register("name", { required: true })}
                    className="w-[80%] bg-slate-800 border-2 focus:bg-slate-950 border-blue-800 rounded-md h-10 outline-none focus:border-blue-700 indent-3 ease-in duration-200 text-white"
                  />
                  <button className="submit bg-blue-500 hover:bg-blue-600 w-[10%] flex items-center justify-center rounded-md transition-all duration-200">
                    <Icon iconName="check" className="w-6 text-white" />
                  </button>
                  <DeleteWorkarea workareaId={workareaId} />
                </div>
              </form>
              <div className="w-full overflow-hidden">
                <div>
                  <Modal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    trigger={
                      <div className="bg-slate-700 hover:bg-slate-950 h-14 flex items-center justify-center transition-all duration-200 cursor-pointer">
                        <Icon
                          iconName="plus"
                          className="cursor-pointer h-8 text-slate-200 size-16"
                        />
                      </div>
                    }
                  >
                    <div className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]">
                      <h2 className="text-xl text-slate-200 mb-4">Add user</h2>
                      <form
                        className="flex flex-col gap-4 relative"
                        onSubmit={handleSubmitUser(handleAddUser)}
                      >
                        <input
                          type="text"
                          {...registerUser("username", {
                            required: true,
                          })}
                          placeholder="Username"
                          className="p-2 rounded-md bg-slate-700 text-slate-200"
                        />
                        <Icon
                          className="absolute top-2 right-2 h-6 text-slate-200"
                          iconName="atsign"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </Modal>
                </div>
                <table className="min-w-full bg-slate-800 text-slate-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left max-md:hidden">ID</th>
                      <th className="py-3 px-6 text-left  max-md:hidden">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-6 text-left max-md:hidden">
                        Image
                      </th>
                      <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700">
                        <td className="py-3 px-6 max-md:hidden">{user.id}</td>
                        <td className="py-3 px-6 max-md:hidden">
                          {user.email}
                        </td>
                        <td className="py-3 px-6 max-md:flex max-md:items-center max-md:gap-5">
                          {user.image_url ? (
                            <img
                              src={user.image_url}
                              alt={user.username}
                              className="w-10 h-10 rounded-full hidden max-md:block"
                            />
                          ) : (
                            <Icon iconName="profile" className="h-9" />
                          )}
                          {user.username}
                        </td>
                        <td className="py-3 px-6 max-md:hidden">
                          {user.image_url ? (
                            <img
                              src={user.image_url}
                              alt={user.username}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="py-3 px-6">
                          <Icon
                            iconName="minus"
                            className="h-6 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 hover:rounded-full transition-all duration-200"
                            onClick={() => handleRemoveUser(user.username)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
