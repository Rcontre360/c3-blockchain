/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Icons } from "@/const/Icons";
import clsx from "clsx";
import { SidebarMobile } from "./sidebars/mobile";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Footer from "../common/footer";
import { LinkIcon } from "@heroicons/react/20/solid";
// import { Footer } from "../common/footerComponents/footer";

export const navItems = [
  {
    name: "Home",
    link: "/",
  },
  { name: "Developers", link: "/#devs" },
  { name: "Docs", link: "/#docs" },
  { name: "About us", link: "/#about_us" },
];

export const Logo = () => (
  <Link href="/" className="h-8 w-32 shrink-0">
    <img className="h-8" src={Icons.logo} alt="logo" />
  </Link>
);

export const NavbarItem = ({ name, link }: any) => {
  return (
    <Link href={link}>
      <div
        className={clsx("gap-2 flex items-center text-white hover:opacity-100")}
      >
        <h3 className={clsx("text-lg font-[600]")}>{name}</h3>
      </div>
    </Link>
  );
};

export default function AppLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const refSidebarMobile = React.useRef(null);

  return (
    <main className="min-h-screen relative bg-overlay">
      <nav
        className={clsx(
          "sticky top-0",
          "bg-overlay",
          "w-[100%] z-[10] md:px-10 px-4 py-6 flex items-center justify-between gap-x-4 shadow-md",
        )}
      >
        <Logo />
        <div className="lg:flex hidden gap-16 shrink-0 items-center">
          {navItems.map((item, index) => {
            return (
              <>
                <NavbarItem key={item.name} name={item.name} link={item.link} />
              </>
            );
          })}
        </div>
        <Link
          href="/app"
          className="lg:flex hidden items-center justify-center bg-primary rounded-xl font-bold gap-1 whitespace-nowrap text-sm text-white py-2 px-10"
        >
          C3 App <LinkIcon className="h-4" />
        </Link>
        <div className="lg:hidden flex gap-3">
          {!sidebarOpen ? (
            <Bars3Icon
              className="h-10 w-10 text-primary cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                setSidebarOpen((prev) => true);
              }}
            />
          ) : (
            <XMarkIcon
              className="h-10 w-10 text-primary cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                setSidebarOpen((prev) => false);
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
      {<Footer />}
    </main>
  );
}
