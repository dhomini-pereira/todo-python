"use client";

import Navbar from "@/components/navbar/Navbar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { API_URL } from "../globals";
import { useLoading } from "@/context/LoadingContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type IUser = {
  createdAt: string;
  email: string;
  id: number;
  image_url: string | null;
  username: string;
};

type IUserUpdate = {
  image_url?: FileList | string;
  email?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
};

export default function Profile() {
  const { isActive } = useNavbar();
  const loading = useLoading();
  const [user, setUser] = useState<IUser>();
  const { register, handleSubmit } = useForm<IUserUpdate>();

  useEffect(() => {
    (async () => {
      try {
        loading.toggle();
        const response = await api.get(`${API_URL}/user`);
        const data: IUser = response.data;
        setUser(data);
      } catch (e: any) {
        alert(e.response.data.error);
      } finally {
        loading.toggle();
      }
    })();
  }, []);

  const handle = async (data: IUserUpdate) => {
    console.log(data);

    try {
      loading.toggle();
      const url = `${API_URL}/user`;

      if (data.password && data.password !== data.confirm_password) {
        throw new Error("Passwords do not match");
      }

      delete data.confirm_password;

      if (data.image_url?.length) {
        const file = data.image_url as FileList;
        const reader = new FileReader();

        const base64 = await new Promise<string | ArrayBuffer | null>(
          (resolve, reject) => {
            reader.readAsDataURL(file[0]);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          }
        );

        data.image_url = base64 as string;
      }

      const updateData: Partial<IUserUpdate> = {};
      if (data.username) updateData.username = data.username;
      if (data.email) updateData.email = data.email;
      if (data.password) updateData.password = data.password;
      if (data.image_url && typeof data.image_url === "string") {
        updateData.image_url = data.image_url;
      }

      if (Object.keys(updateData).length === 0) {
        throw new Error("No data to update");
      }

      const request = await toast.promise(api.put(url, updateData), {
        pending: "Updating...",
        success: "Updated!",
        error: "Error updating",
      });

      setUser({
        ...user,
        ...request.data,
      });
    } catch (e: any) {
      console.log(e);
      alert(e.response?.data?.error || "Error updating user");
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
            <h1 className="text-5xl text-slate-200">
              Welcome, {user?.username}
            </h1>
            <p className="text-slate-500">
              On here you can see and edit informations of your profile.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 max-sm:flex-col w-[100%] max-sm:h-[54vh] max-sm:pr-2 overflow-y-auto max-sm:flex">
            <form onSubmit={handleSubmit(handle)} className="flex flex-col">
              <input type="file" {...register("image_url")} />
              <input
                type="text"
                placeholder="Username"
                autoComplete="off"
                defaultValue={user?.username}
                {...register("username")}
              />
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                defaultValue={user?.email}
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                {...register("password")}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                {...register("confirm_password")}
              />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
