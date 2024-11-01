"use client";
import Navbar from "@/components/navbar/Navbar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { API_URL } from "../globals";
import { useLoading } from "@/context/LoadingContext";
import CreateWorkarea from "./components/CreateWorkarea";
import { toast } from "react-toastify";
import { IUser } from "@/interfaces/user.interface";
import { IWorkarea } from "@/interfaces/workarea.interface";

type IResponseWorkarea = {
  workareas: IWorkarea[];
};

export default function WorkArea() {
  const { isActive } = useNavbar();
  const [workareas, setWorkareas] = useState<IWorkarea[]>([]);
  const loading = useLoading();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      try {
        loading.toggle();
        const [{ data }, userR] = await Promise.all([
          api.get(`${API_URL}/workarea`),
          api.get(`${API_URL}/user`),
        ]);
        setUser(userR.data);
        setWorkareas(
          (data as IResponseWorkarea).workareas.sort((a, b) => {
            if (a.type === "PERSONAL") return -1;
            if (b.type === "PERSONAL") return 1;
            return 0;
          })
        );
      } catch (e: any) {
        toast.error(e.response.data.error);
      } finally {
        loading.toggle();
      }
    })();
  }, []);

  return (
    <div className="h-full">
      <Navbar user={user} />
      <div
        className={`bg-[#0A070E] ml-auto h-[calc(100vh-48px)] max-sm:w-full max-sm:h-[calc(100vh-88px)] overflow-hidden ${
          isActive ? "w-[calc(100vw-64px)]" : "w-full"
        }`}
      >
        <div className="bg-slate-900 h-[100%] sm:rounded-tl-[150px] flex items-end justify-center">
          <div className="h-[90%] block w-[90%]">
            <h1 className="text-5xl text-slate-200">Work Areas</h1>
            <p className="text-slate-500">
              Manage all your activities in a single screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 max-sm:flex-col w-[100%] max-sm:h-[54vh] overflow-y-auto max-sm:flex">
              <CreateWorkarea />
              {workareas?.map((workarea, index) => (
                <a
                  href={`/workarea/${workarea.id}`}
                  className="w-[18%] max-md:w-full md:max-w-[300px]"
                  key={workarea.id}
                >
                  <div
                    key={workarea.id}
                    className={`w-[100%] h-[175px] text-center rounded-xl bg-sky-700 hover:bg-sky-800 duration-500 ease-in-out flex items-center justify-center flex-col gap  cursor-pointer max-md:w-full max-md:h-[100px] md:max-w-[300px]`}
                  >
                    <h2 className="text-3xl text-slate-200 max-lg:text-xl">
                      {workarea.name}
                    </h2>
                    <span className="text-slate-400 max-lg:text-sm">
                      {new Date(workarea.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <p className="text-sm text-slate-400">{workarea.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
