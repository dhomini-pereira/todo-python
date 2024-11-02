"use client";

import Navbar from "@/components/navbar/Navbar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { API_URL } from "../globals";
import { useLoading } from "@/context/LoadingContext";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "@/interfaces/user.interface";

type IUserUpdate = {
  email?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
};

export default function Profile() {
  const { isActive } = useNavbar();
  const loading = useLoading();
  const [user, setUser] = useState<IUser>();
  const { register, handleSubmit, reset, control } = useForm<IUserUpdate>();

  useEffect(() => {
    (async () => {
      try {
        loading.toggle();
        const response = await api.get(`${API_URL}/user`);
        const data: IUser = response.data;
        reset({
          email: data.email,
          username: data.username,
        });
        setUser(data);
      } catch (e: any) {
        toast.error(e.response.data.error);
      } finally {
        loading.toggle();
      }
    })();
  }, []);

  const { isDirty } = useFormState({ control });

  const changePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    const base64 = await new Promise<string | ArrayBuffer | null>(
      (resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
    );

    const url = `${API_URL}/user`;

    const request = await toast.promise(api.put(url, { image_url: base64 }), {
      pending: "Uploading...",
      success: "Uploaded",
      error: "Error upload",
    });

    setUser((prev) => {
      return {
        ...prev,
        ...request.data,
      };
    });
  };

  const handle = async (data: IUserUpdate) => {
    const url = `${API_URL}/user`;

    if (data.password && data.password !== data.confirm_password) {
      throw new Error("Passwords do not match");
    }

    delete data.confirm_password;

    const updateData: Partial<IUserUpdate> = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = data.password;

    if (!Object.keys(updateData).length) {
      return toast.error("Nothing to update");
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
  };

  return (
    <div className="h-full">
      <Navbar user={user} />
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:w-full max-sm:h-[calc(100vh-88px)] overflow-hidden  ${
          isActive ? "w-[calc(100vw-64px)]" : "w-full"
        }`}
      >
        <div className="bg-slate-900 h-[100%] sm:rounded-tl-[150px] flex flex-col items-center justify-start p-8">
          <div className="w-[90%]">
            <h1 className="text-5xl text-slate-200">
              Welcome, {user?.username}!
            </h1>
            <p className="text-slate-500">
              On here you can see and edit informations of your profile.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 max-sm:flex-col w-full max-sm:flex justify-center h-full bg-red-500">
            <div className="text-white flex flex-col max-w-[500px] w-full gap-6 justify-center overflow-auto">
              <div className="bg-slate-800 p-[10px] flex justify-between items-center rounded-[10px] h-fit">
                <div className="flex flex-row items-center">
                  {user?.image_url ? (
                    <img
                      className="h-10 w-10 object-cover rounded-full"
                      src={user.image_url}
                      alt=""
                    />
                  ) : (
                    <img
                      className="h-10 w-10 object-cover rounded-full"
                      src="https://i.pinimg.com/564x/8e/21/fe/8e21fe649773e128dc40d1f112c01b13.jpg"
                      alt=""
                    />
                  )}
                  <p className="font-semibold ml-5">{user?.username}</p>
                </div>
                <div>
                  <label
                    htmlFor="image_url"
                    className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-700 ease-in-out duration-500 cursor-pointer"
                  >
                    Change photo
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="image_url"
                    onChange={changePhoto}
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="placeholder:opacity[1] placeholder:text-[#9ca3af] placeholder:font-semibold placeholder:text-[1.3em]">
                <form
                  className="bg-slate-800 p-[15px] flex flex-col rounded-lg gap-3"
                  onSubmit={handleSubmit(handle)}
                >
                  <div>
                    <h2 className="text-[2em] font-semibold pl-[5px]">
                      Informations
                    </h2>
                    <p className="text-[0.90em] font-thin pl-[5px] mb-5">
                      Change your information here
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Usuário"
                    className="p-2 rounded-md bg-slate-700 text-slate-200"
                    {...register("username")}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded-md bg-slate-700 text-slate-200"
                    {...register("email")}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded-md bg-slate-700 text-slate-200"
                    {...register("password")}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="p-2 rounded-md bg-slate-700 text-slate-200"
                    {...register("confirm_password")}
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-700 ease-in-out duration-500"
                    disabled={!isDirty}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
