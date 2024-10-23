import EventEmitter from "events";
import React, { useState } from "react";

type IProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  eventEmitter: EventEmitter;
};

export default function Modal({ children, trigger, eventEmitter }: IProps) {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  eventEmitter.on("modal", () => setActiveModal(!activeModal));

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement, {
        onClick: () => eventEmitter.emit("modal"),
      })}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          {children}
        </div>
      )}
    </>
  );
}
