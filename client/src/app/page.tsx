"use client";
import Image from 'next/image';
import qrcode from "../assets/todo_qrcode.png";

export default function Page() {
  return (
    <div className="box w-full h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-white text text-center max-md:w-96 p-5">
          Work in a modern and innovative way
        </h1>
        <p className="max-md:w-96 text-slate-400 text-xl font-extralight text-center max-w-[700px] ml-auto mr-auto">
          Connect your work and achieve your goals in a more agile and efficient
          way, providing efficient gains for your business.
        </p>
        <div className="flex gap-3 w-fit  ml-auto mr-auto mt-12">
          <a
            href="/signin"
            className="bg-sky-600 pb-4 pt-4 pl-8 pr-8 text-xl text-white rounded-full hover:bg-sky-800 cursor-pointer transition-all duration-200"
          >
            Sign in
          </a>
          <a
            href="signup"
            className="border-sky-600 border pb-4 pt-4 pl-8 pr-8 text-xl text-white rounded-full hover:bg-sky-700 cursor-pointer hover:border-sky-800 transition-all duration-200"
          >
            Sign up
          </a>
        </div>
        <Image src={qrcode} alt="teste" className='absolute w-[200px] bottom-16 right-16 max-md:hidden'/>
      </div>
    </div>
  );
}
