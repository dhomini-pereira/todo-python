import React, { useState } from "react";
import "./Task.css";



export default function TaskCreate({ trigger, users, handleSubmit, register }: any) {

  return (
    <div className="bg-green-500 absolute">
      <div
        className="text-slate-200 fixed bottom-3 right-1"
        onClick={() => handleSubmit.setModalShow(true)}
      >
        {trigger}
      </div>

      {handleSubmit.modalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <form onSubmit={handleSubmit.handle} className="bg-slate-800 p-5 rounded-md shadow-md relative w-1/3 min-w-[500px] max-sm:min-w-[90%]">
            <h2 className="text-xl mb-4 text-slate-200">Create Task</h2>
            <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
              <div className="flex flex-col">
                <label htmlFor="title" className="indent-2 text-slate-300">
                  Title
                </label>
                <input
                  type="text"
                  className="ease-in-out duration-250 focus:border-slate-400 outline-none h-full rounded-sm p-1 text-white bg-slate-900 placeholder:text-slate-600 indent-2 border-[1px] border-slate-600"
                  placeholder=""
                  id="title"
                  {...register("title")}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="timeEstimate"
                  className="indent-2 text-slate-300"
                >
                  Expiration
                </label>
                <input
                  type="date"
                  className="ease-in-out duration-250 focus:border-slate-400 outline-none rounded-sm indent-1 p-1 bg-slate-900 text-slate-200 border-[1px] border-slate-600"
                  id="timeEstimate"
                  {...register("timeEstimate")}
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="userId" className="indent-2 text-slate-300">
                  Assigned
                </label>
                <select
                  id="userId"
                  className="ease-in-out duration-250 focus:border-slate-400 outline-none bg-slate-900 p-1 border-[1px] border-slate-600 text-white rounded-sm"
                  {...register("userId")}
                >
                  <option value="" defaultChecked disabled></option>
                  {users.map((u: any) => (
                    <option value={u.id}>{u.username}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 flex flex-col">
                <label
                  htmlFor="description"
                  className="indent-2  text-slate-300"
                >
                  Description
                </label>
                <textarea
                  className="indent-2 text-white ease-in-out duration-250 focus:border-slate-400 outline-none resize-none h-28 rounded-sm border-[1px] border-slate-600 bg-slate-900"
                  id="description"
                  {...register("description")}
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-5">
              <button
                className="pl-6 pr-6 pt-2 pb-2 rounded-md text-red-600 border-[1px] border-red-600 hover:bg-red-700 hover:text-white ease-in-out duration-200"
                onClick={() => handleSubmit.setModalShow(false)}
              >
                Cancel
              </button>
              <button type="submit" className="bg-green-700 pl-6 pr-6 pt-2 pb-2 rounded-md text-white hover:bg-green-800 ease-in-out duration-200">
                Confirm
              </button>
            </div>
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
              onClick={() => handleSubmit.setModalShow(false)}
            >
              X
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
