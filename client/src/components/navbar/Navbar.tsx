"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useNavbar } from "@/context/NavbarContext";
import api from "@/services/api.service";
import { API_URL } from "@/app/globals";
import Icon from "../icon/Icon";
import { useLoading } from "@/context/LoadingContext";

type IUser = {
  createdAt: string;
  email: string;
  id: number;
  image_url: string | null;
  username: string;
};

export default function Navbar() {
  const { isActive, toggle } = useNavbar();
  const [user, setUser] = useState<IUser>();
  const loading = useLoading();

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

  return (
    <div className="bg-[#0A070E] w-screen text-slate-200 h-12 text-lg flex items-center justify-between pl-4 pr-10">
      <div className="w-fit flex items-center sm:gap-10">
        <Sidebar MenuIsActive={isActive} handle={toggle} />
        <h1>ToDo App</h1>
      </div>

      <div className="w-fit flex items-center gap-3 text-base">
        {user?.image_url ? (
          <img
            src={user?.image_url}
            alt={user?.username}
            className="h-9 w-9 object-cover rounded-full"
          />
        ) : (
          <Icon iconName="profile" className="h-9" />
        )}
        <h2>{user?.username || "Unknown"}</h2>
      </div>
    </div>
  );
}
