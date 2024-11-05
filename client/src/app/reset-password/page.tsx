"use client";

import api from "@/services/api.service";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../globals";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type IUser = {
  token: string;
  password?: string;
  confirm_password?: string;
};

type IProps = {
  searchParams: Record<string, string>;
};

export default function ResetPassword({ searchParams }: IProps) {
  const { register, handleSubmit, setValue } = useForm<IUser>();
  const router = useRouter();
  const token = searchParams.token;

  useEffect(() => {
    (async () => {
      if (!token) {
        return router.push("/");
      }

      setValue("token", token);
    })();
  }, [token]);

  const handle = (data: IUser) => {
    if (data.password !== data.confirm_password)
      return toast.error("Passwords do not match");

    toast
      .promise(api.post(API_URL + "/reset-password", data), {
        pending: "Resetting password...",
        success: "Password reset successfully!",
      })
      .then((_) => router.push("/signin"))
      .catch((err) => toast.error(err.response.data.error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handle)}>
        <input
          type="password"
          placeholder="New password"
          {...register("password", { required: true, maxLength: 6 })}
        />
        <input
          type="password"
          {...register("confirm_password", { required: true, maxLength: 6 })}
          placeholder="Confirm password"
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
