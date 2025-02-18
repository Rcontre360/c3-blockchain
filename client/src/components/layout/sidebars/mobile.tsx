"use client";
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LinkIcon } from "@heroicons/react/24/outline";

interface LayoutDashboardProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: any;
  initialFocus?: any;
  navItems?: any;
}
export const SidebarMobile: React.FC<LayoutDashboardProps> = ({
  navItems,
  sidebarOpen = false,
  setSidebarOpen = {},
  initialFocus = null,
}) => {
  // const { user } = useMoralis();

  return (
    <>
      {/* Sidebar mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed h-[calc(100vh-70px)] top-[70px] w-60 flex z-40 md:hidden bg-overlay"
          open={sidebarOpen}
          onClose={() => {
            setSidebarOpen(false);
          }}
          initialFocus={initialFocus}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed top-[70px] inset-0 z-0 blur-xl w-screen h-[calc(100vh-70px)]" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="bg-overlay relative flex-1 flex flex-col w-screen">
              <div className="flex-1 h-0 pt-6 pb-4 overflow-y-auto">
                <nav className="flex-1 px-7">
                  {navItems.map((item: any, index: number) => {
                    return (
                      <Fragment key={"nav-mobile-" + index}>
                        <Link href={item.link} key={"nav-desktop-" + index}>
                          <p
                            className={clsx(
                              "group flex items-center px-3 pb-3 hover:opacity-90 text-base rounded-md  relative text-primary font-[500]",
                            )}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {item.name}
                          </p>
                        </Link>
                        <div className="divider mx-3 mt-4"></div>
                      </Fragment>
                    );
                  })}
                  <Link
                    href="/app"
                    className="lg:flex hidden items-center justify-center bg-primary rounded-xl font-bold gap-1 whitespace-nowrap text-sm text-white py-2 px-10"
                  >
                    C3 App <LinkIcon className="h-4" />
                  </Link>
                </nav>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
