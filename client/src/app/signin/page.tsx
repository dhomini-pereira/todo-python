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
  email: string;
  password: string;
};

export default function SignIn() {
  const { handleSubmit, register } = useForm<IUser>();
  const router = useRouter();
  const loading = useLoading();

  useEffect(() => {
    if (sessionStorage.getItem("TOKEN")) {
      router.push("/workarea");
    }
  }, []);

  async function handleSignIn(user: IUser) {
    try {
      loading.toggle();
      const url = `${API_URL}/signin`;
      const response = await api.post(url, user);

      sessionStorage.setItem("TOKEN", response.data.token);
      toast.success("Session started successfully!");
      router.push("/workarea");
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      loading.toggle();
    }
  }

  return (
    <>
      <header>
        <meta name="theme-color" content="#030B19" />
      </header>
      <div className="box w-full h-screen  flex items-center justify-center flex-col font-body text-slate-200">
        <div className="max-sm:px-6 max-sm:max-w-xl max-sm:py-6 max-sm:w-5/6 w-3/5 h-fit max-w-md border border-blue-500 bg-slate-900 rounded-3xl py-9 px-12">
          <form
            className="grid gap-5 items-center"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div>
              <h1 className="text-4xl">Sign in</h1>
              <p className="font-light text-slate-400">
                Sign in with an account
              </p>
            </div>
            <input
              type="email"
              className="bg-slate-950 border-2 border-blue-500 rounded-md h-10 outline-none focus:border-blue-700 indent-3 ease-in duration-200"
              autoComplete="off"
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            <input
              autoComplete="off"
              type="password"
              className="bg-slate-950 border-2 border-blue-500 rounded-md h-10 outline-none focus:border-blue-700 indent-3 ease-in duration-200"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <button
              className="bg-blue-500 rounded-md h-10 hover:bg-blue-700 ease-in duration-200"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
        <a href="/signup" className="font-extralight mt-5 hover:opacity-70">
          Don't have an account?
          <span className="text-blue-500 font-normal"> Sign up</span>
        </a>
      </div>
    </>
  );
}
