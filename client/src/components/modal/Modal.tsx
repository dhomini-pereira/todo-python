import EventEmitter from "events";
import React, { useState } from "react";

type IProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({
  children,
  trigger,
  isOpen,
  setIsOpen,
}: IProps) {
  return (
    <>
      {React.cloneElement(trigger as React.ReactElement, {
        onClick: () => setIsOpen(!isOpen),
      })}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          {children}
        </div>
      )}
    </>
  );
}
