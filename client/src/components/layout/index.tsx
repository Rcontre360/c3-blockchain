/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Icons } from "@/const/Icons";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { SidebarMobile } from "./sidebars/mobile";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import { Footer } from "../common/footerComponents/footer";

type ButtonsTypes = { logout: boolean; userData: boolean };

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  { name: "Developers", link: "/#devs" },
  { name: "Docs", link: "/#docs" },
  { name: "About us", link: "/#about_us" },
  { name: "Join us on Discord", link: "/#discord" },
];

export const Logo = () => (
  <Link href="/" className="h-8  shrink-0">
    <img className="h-8" src={Icons.logo} alt="logo" />
  </Link>
);

export const NavbarItem = ({ name, link }: any) => {
  return (
    <Link href={link}>
      <div
        className={clsx("gap-2 flex items-center text-white hover:opacity-100")}
      >
        <h3 className={clsx("text-sm font-[600]")}>{name}</h3>
      </div>
    </Link>
  );
};

export default function AppLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const refSidebarMobile = React.useRef(null);
  const router = useRouter();

  return (
    <main className="min-h-screen relative">
      <nav
        className={clsx(
          "fixed top-0",
          "bg-overlay",
          "w-[100%] md:px-10 px-4 py-6 flex items-center justify-between gap-x-4 shadow-md",
        )}
      >
        <Logo />
        <div className="lg:flex hidden gap-4 shrink-0 items-center justify-around w-[60%]">
          {navItems.map((item, index) => {
            return (
              <>
                <NavbarItem key={item.name} name={item.name} link={item.link} />
              </>
            );
          })}
        </div>
        <div className="lg:hidden flex gap-3">
          {!sidebarOpen ? (
            <Bars3Icon
              className="h-6 w-6 text-primary cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                setSidebarOpen((prev) => !prev);
              }}
            />
          ) : (
            <XMarkIcon
              className="h-6 w-6 text-primary cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                setSidebarOpen((prev) => !prev);
              }}
            />
          )}
        </div>
      </nav>

      <SidebarMobile
        initialFocus={refSidebarMobile}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        navItems={navItems}
      />

      <div className={clsx("bg-overlay flex flex-col")}>{children}</div>
      {/* {<Footer />} */}
    </main>
  );
}
