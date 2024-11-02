"use client";
import { useForm } from "react-hook-form";
import background from "../../assets/backgroundSession.jpg";
import api from "@/services/api.service";
import { useRouter } from "next/navigation";
import { API_URL } from "../globals";
import { useLoading } from "@/context/LoadingContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

type IUser = {
  username: string;
  email: string;
  password: string;
};

export default function Page() {
  const { handleSubmit, register, reset } = useForm<IUser>();
  const router = useRouter();
  const loading = useLoading();

  useEffect(() => {
    if (sessionStorage.getItem("TOKEN")) {
      router.push("/workarea");
    }
  }, []);

  async function handleSignUp(user: IUser) {
    try {
      loading.toggle();
      const url = `${API_URL}/signup`;
      await api.post(url, user);

      router.push("/signin");
    } catch (err: any) {
      toast.error(err.response.data.message);
      return reset();
    } finally {
      loading.toggle();
    }
  }

  return (
    <>
      <header>
        <meta name="theme-color" content="#030B19" />
      </header>
      <div
        className="box w-full h-screen flex items-center justify-center flex-col font-body text-slate-200 overflow-y-auto"
      >
        <div className="max-sm:px-6 max-sm:max-w-xl max-sm:py-6 max-sm:w-5/6 w-3/5 h-fit max-w-md border border-blue-500 bg-slate-900 rounded-3xl py-9 px-12">
          <form
            className="grid gap-5 items-center"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <div>
              <h1 className="text-4xl">Sign up</h1>
              <p className="font-light text-slate-400">
                Create an account with your e-mail
              </p>
            </div>
            <input
              type="text"
              className="bg-slate-950 border-2 focus:border-blue-700 border-blue-500 rounded-md h-10 outline-none indent-3"
              placeholder="Username"
              autoComplete="off"
              {...register("username", { required: true })}
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase();
              }}
            />
            <input
              type="email"
              className="bg-slate-950 border-2 focus:border-blue-700 border-blue-500 rounded-md h-10 outline-none indent-3 ease-in duration-200"
              placeholder="E-mail"
              autoComplete="off"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              className="bg-slate-950 border-2 focus:border-blue-700 border-blue-500 rounded-md h-10 outline-none indent-3 ease-in duration-200"
              placeholder="Password"
              autoComplete="off"
              {...register("password", { required: true })}
            />
            <button
              className="bg-blue-800 rounded-md h-10 hover:bg-blue-900 ease-in duration-200"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
        <a href="/signin" className="font-extralight mt-5 hover:opacity-70">
          Do you have an account?{" "}
          <span className="text-blue-500 font-normal">Sign in</span>
        </a>
      </div>
    </>
  );
}
