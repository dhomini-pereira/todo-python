"use client";
import { useForm } from "react-hook-form";
import background from "../../assets/backgroundSession.jpg";

type IUser = {
  username: string;
  email: string;
  password: string;
};

export default function Page() {
  const { handleSubmit, register } = useForm<IUser>();

  function handleSignUp(e: IUser) {
    console.log(e);
  }

  return (
    <>
      <header>
        <meta name="theme-color" content="#030B19" />
      </header>
      <div
        className="bg-cover bg-center h-screen w-full flex items-center justify-center flex-col font-body text-slate-200"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <div className="max-sm:px-6 max-sm:max-w-xl max-sm:py-6 max-sm:w-5/6 w-3/5 h-fit max-w-md bg-zinc-900 rounded-3xl py-9 px-12">
          {/* SignUp Container */}
          <form
            className="grid gap-5 items-center"
            onSubmit={handleSubmit(handleSignUp)}
          >
            {/* SignUp Content */}
            <div>
              <h1 className="text-4xl">Sign up</h1>
              <p className="font-light text-slate-400">
                Create an account with your e-mail
              </p>
            </div>
            <input
              type="text"
              className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3"
              placeholder="Username"
              {...register("username", { required: true })}
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase();
              }}
            />
            <input
              type="email"
              className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3 ease-in duration-200"
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            <input
              type="password"
              className="bg-zinc-900 border-2 border-blue-800 rounded-md h-10 outline-none focus:border-blue-950 indent-3 ease-in duration-200"
              placeholder="Password"
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
