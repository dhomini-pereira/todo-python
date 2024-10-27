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

type IUpdateWorkarea = {
  name: string;
};

type IAddUser = {
  username: string;
};

type IWorkarea = {
  id: number;
  name: string;
  type: "PROFESSIONAL" | "PERSONAL";
  createdAt: string;
  updatedAt: string;
};

type IUser = {
  id: number;
  email: string;
  username: string;
  image_url: null | string;
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

  useEffect(() => {
    (async () => {
      try {
        loading.toggle();
        const [workareaRequest, membersRequest] = await Promise.all([
          api.get(`${API_URL}/workarea/${workareaId}`),
          api.get(`${API_URL}/workarea/${workareaId}/member?member=true`),
        ]);
        setWorkarea(workareaRequest.data);
        setUsers(membersRequest.data.users);
      } catch (err: any) {
        alert(err.response?.data?.error);
      } finally {
        loading.toggle();
      }
    })();
  }, []);

  const handleUpdateWorkarea = async (data: IUpdateWorkarea) => {
    console.log(data);
  };

  const handleAddUser = async (data: IAddUser) => {
    try {
      loading.toggle();
      const request = await toast.promise(
        api.post(`${API_URL}/workarea/${workareaId}/member/${data.username}`),
        {
          pending: "Adicionando usuário...",
          success: "Usuário adicionado com sucesso!",
          error: "Erro ao adicionar usuário",
        }
      );
      setIsModalOpen(false);
      resetUserForm();
      setUsers((prev) => (prev ? [...prev, request.data] : [request.data]));
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erro ao adicionar usuário");
    } finally {
      loading.toggle();
    }
  };

  const handleRemoveUser = async (username: string) => {
    try {
      loading.toggle();
      await toast.promise(
        api.delete(`${API_URL}/workarea/${workareaId}/member/${username}`),
        {
          pending: "Removendo usuário...",
          success: "Usuário removido com sucesso!",
          error: "Erro ao remover usuário",
        }
      );
      setUsers(users.filter((user) => user.username !== username));
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Erro ao remover usuário");
    } finally {
      loading.toggle();
    }
  };

  return (
    <div className="h-full">
      <Navbar />
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:w-full max-sm:h-[calc(100vh-88px)] overflow-hidden ${
          isActive ? "w-[calc(100vw-64px)]" : "w-full"
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
          <div className="mt-8 flex flex-wrap gap-2 max-sm:flex-col w-[100%] max-sm:h-[54vh] max-sm:pr-2 overflow-y-auto max-sm:flex">
            <div>
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(handleUpdateWorkarea)}
              >
                <input
                  type="text"
                  placeholder={workarea?.name}
                  {...register("name", { required: true })}
                />
                <input type="text" defaultValue={workarea?.type} disabled />
                <button type="submit">Save</button>
              </form>
              <div className="mt-8">
                <Modal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  trigger={
                    <Icon
                      iconName="plus"
                      className="cursor-pointer h-8 text-slate-200"
                    />
                  }
                >
                  <div className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]">
                    <h2 className="text-xl text-slate-200 mb-4">
                      Adicionar Usuário
                    </h2>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmitUser(handleAddUser)}
                    >
                      <input
                        type="text"
                        {...registerUser("username", {
                          required: "Username é obrigatório",
                        })}
                        placeholder="Digite o username do usuário"
                        className="p-2 rounded-md bg-slate-700 text-slate-200"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Adicionar
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>
              <div className="mt-8 w-full overflow-x-auto">
                <table className="min-w-full bg-slate-800 text-slate-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Username</th>
                      <th className="py-3 px-6 text-left">Image</th>
                      <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700">
                        <td className="py-3 px-6">{user.id}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">{user.username}</td>
                        <td className="py-3 px-6">
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
                            iconName="delete"
                            className="h-6 cursor-pointer text-red-500"
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
