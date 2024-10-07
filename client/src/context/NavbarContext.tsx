"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface NavbarContextType {
  isActive: boolean;
  toggle: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

interface NavbarProviderProps {
  children: ReactNode;
}

export function NavbarProvider({ children }: NavbarProviderProps) {
  const [isActive, setIsActive] = useState<boolean>(true);

  const toggle = () => setIsActive((prev) => !prev);

  return (
    <NavbarContext.Provider value={{ isActive, toggle }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}