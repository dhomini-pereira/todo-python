"use client";
import { useForm } from "react-hook-form";
import background from "../../assets/backgroundSession.jpg";
import api from "@/services/api.service";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type IUser = {
  email: string;
  password: string;
};

export default function Page() {
  const { handleSubmit, register } = useForm<IUser>();
  const router = useRouter();

  async function handleSignIn(user: IUser) {
    try {
      const url = `${API_URL}/signin`;
      const response = await api.post(url, user);

      sessionStorage.setItem("TOKEN", response.data.token);
      router.push("/workarea");
    } catch (err: any) {
      alert(err.response.data.error);
    }
  }

  return (
    <>
      <header>
        <meta name="theme-color" content="#030B19" />
      </header>
      <div
        className="bg-cover bg-center w-full h-screen  flex items-center justify-center flex-col font-body text-slate-200"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <div className="max-sm:px-6 max-sm:max-w-xl max-sm:py-6 max-sm:w-5/6 w-3/5 h-fit max-w-md bg-zinc-900 rounded-3xl py-9 px-12">
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
              className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3 ease-in duration-200"
              autoComplete="off"
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            <input
              autoComplete="off"
              type="password"
              className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3 ease-in duration-200"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <button
              className="bg-blue-800 rounded-md h-10 hover:bg-blue-900 ease-in duration-200"
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
