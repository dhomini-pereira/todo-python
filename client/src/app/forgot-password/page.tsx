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
    <div className="box w-full h-screen flex justify-center items-center">
      <div className=" relative max-sm:px-6 max-sm:max-w-xl max-sm:py-6 max-sm:w-5/6 w-3/5 h-fit max-w-md border border-blue-500 bg-slate-900 rounded-3xl py-9 px-12">
        <div className="p-2 bg-sky-500 w-fit h-fit rounded-full text-white absolute -left-2 -top-2 cursor-pointer hover:bg-sky-600">
          <a href="/signin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <h1 className="text-slate-200 text-3xl">Forgot Your Password?</h1>
        <p className="text-sm text-slate-400 font-light mb-6">
          Please enter your email below to fix it.
        </p>
        <form
          onSubmit={handleSubmit(handle)}
          className="flex items-center justify-center gap-5"
        >
          <input
            type="email"
            placeholder="E-mail"
            className="bg-slate-950 border-2 focus:border-blue-700 border-blue-500 rounded-md h-10 outline-none indent-3 w-[90%] text-white"
            {...register("email", { required: true })}
          />

          <button
            type="submit"
            className=" bg-sky-500 p-2 rounded-full text-white cursor-pointer hover:bg-sky-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-6"
            >
              <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
