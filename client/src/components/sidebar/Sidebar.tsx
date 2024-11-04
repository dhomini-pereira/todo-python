"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Icon from "../icon/Icon";

interface ISidebarProps {
  MenuIsActive: boolean;
  handle: Function;
}

interface IMenuItem {
  href: string;
  icon: JSX.Element;
}

export default function Sidebar({
  MenuIsActive = true,
  handle,
}: ISidebarProps) {
  const pathName = usePathname();
  const router = useRouter();

  const signOut = () => {
    sessionStorage.clear();
    router.push("/signin");
  };

  const menuItems: IMenuItem[] = [
    {
      href: "/workarea",
      icon: <Icon className="w-10 h-10 p-2" iconName="groups" />,
    },
    {
      href: "/profile",
      icon: <Icon className="w-10 h-10 p-2" iconName="profile" />,
    },
  ];

  let firstItem = menuItems.findIndex((item) => item.href === pathName);
  menuItems.unshift(menuItems[firstItem]);
  menuItems.splice(firstItem + 1, 1);

  return (
    <div>
      <Icon
        iconName="menu"
        onClick={() => handle()}
        className="size-6 cursor-pointer hover:text-zinc-400 ease-in-out duration-200 sm:block hidden"
      />
      {MenuIsActive && (
        <div className="sm:relative static">
          <div
            className="sm:h-[calc(100vh-3rem)] sm:w-16 w-screen sm:absolute fixed bottom-0 left-0 sm:-left-4 sm:top-3 flex sm:flex-col gap-3 items-center justify-center sm:pt-10 pt-5 pb-5 sm:[&_a:first-child]:mb-6 [&_a:first-child]:bg-zinc-800 [&_a:hover]:bg-zinc-800 [&_a:hover]:cursor-pointer [&_a:hover]:ease-in-out [&_a:hover]:duration-500"
            style={{ backgroundColor: "#0A070E" }}
          >
            {menuItems.map((item, index) => (
              <a key={index} href={item.href} className="rounded-full" id={item.href.replace("/", "")}>
                {item.icon}
              </a>
            ))}

            <Icon
              iconName="exit"
              onClick={() => signOut()}
              className="exitIcon w-10 h-10 p-2 hover:bg-red-600 duration-500 rounded-full cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
