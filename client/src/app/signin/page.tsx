"use client";
import { useForm } from "react-hook-form";
import background from "../../assets/backgroundSession.jpg";
import api from "@/services/api.service";
import { useRouter } from "next/navigation";
import { API_URL } from "../globals";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type IUser = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { handleSubmit, register } = useForm<IUser>();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
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
            <div className="grid gap-1 relative">
              <input
                autoComplete="off"
                type={`${showPassword ? "text" : "password"}`}
                className="bg-slate-950 border-2 border-blue-500 rounded-md h-10 outline-none focus:border-blue-700 indent-3 ease-in duration-200"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prevState) => !prevState);
                }}
                className="bg-sky-700 p-1 rounded-md absolute right-2 top-[6px]"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path
                      fillRule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                      clipRule="evenodd"
                    />
                    <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                  </svg>
                )}
              </button>
              <a
                href="/forgot-password"
                className="hover:opacity-70 font-light"
              >
                Forgot your <span className="text-blue-400">password</span>?
              </a>
            </div>
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
