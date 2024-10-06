"use client";
import Navbar from "@/components/navbar/Navbar";
import api from "@/services/api.service";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

enum TaskStatus {
  PENDING = "PENDING",
  PROGRESSING = "PROGRESSING",
  DONE = "DONE",
}

type ITask = {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  status: TaskStatus;
  timeEstimate: string;
  updatedAt: string;
  userId: number;
};

type IHttpResponse = {
  tasks: ITask[];
  total: number;
};

export default function WorkAreaInfo() {
  const { workareaId } = useParams();
  const query = useSearchParams();
  const page = query.get("page") || 1;
  const [tasks, setTasks] = useState<ITask[]>();

  useEffect(() => {
    (async () => {
      try {
        const url = `${API_URL}/workarea/${workareaId}/task?page=${page}`;
        const response = await api.get(url);

        const result: IHttpResponse = response.data;

        setTasks(
          result.tasks.map((task) => {
            return {
              ...task,
              createdAt: formatDate(task.createdAt),
              updatedAt: formatDate(task.updatedAt),
              timeEstimate: formatDate(task.timeEstimate),
            };
          })
        );
      } catch (err: any) {
        alert(err.response.data.error);
      }
    })();
  }, [workareaId, page]);

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      year: "2-digit",
      month: "long",
      day: "2-digit",
    });

  return (
    <div className="h-full bg-slate-900">
      <Navbar />
      {tasks?.map((task) => (
        <p>
          {task.title} - {task.description} - {task.status} -{" "}
          {task.timeEstimate}
        </p>
      ))}
    </div>
  );
}
