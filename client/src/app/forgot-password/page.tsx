"use client";

import api from "@/services/api.service";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { API_URL } from "../globals";

type IUser = {
  email: string;
};

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<IUser>();

  const handle = async (data: IUser) => {
    await toast
      .promise(api.post(API_URL + "/forgot-password", data), {
        success: "Verify your E-Mail!",
        pending: "Sending E-Mail",
      })
      .catch((err) => toast.error(err.response.data.error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handle)}>
        <input
          type="email"
          placeholder="E-mail"
          className="p-2 rounded-md bg-slate-700 text-slate-200"
          {...register("email", { required: true })}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
