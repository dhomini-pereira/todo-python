"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  toggle: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggle = () => setIsLoading((prev) => !prev);

  return (
    <LoadingContext.Provider value={{ isLoading, toggle }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
