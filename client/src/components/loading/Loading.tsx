"use client";

import { useLoading } from "@/context/LoadingContext";
import Image from "next/image";
import React from "react";
import gif from "@/assets/block.gif";

function Loading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <Image
        src={gif}
        width={100}
        height={100}
        alt="Loading"
        className="w-16 h-16"
        priority={true}
      />
    </div>
  );
}

export default Loading;
