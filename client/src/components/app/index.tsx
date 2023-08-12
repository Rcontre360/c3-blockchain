/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Table from "./table";
import {useMetaMask} from "@/context/useMetamask";
import React from "react";

const AppComponent = () => {
  const {wallet, connectMetaMask, deployContract} = useMetaMask();
  const [address, setAddress] = React.useState("");
  console.log(wallet, "wallet");

  return (
    <div className="min-h-screen w-full flex flex-col items-center lg:gap-12 gap-4 xl:px-28 md:px-16 sm:px-8 px-4 relative pt-20 pb-20 overflow-hidden">
      <h1 className="text-center text-white font-bold lg:text-6xl text-4xl">
        Contract Gas Fee Tracker
      </h1>
      <div className="flex w-full items-end justify-center">
        <Link
          href={"/app/contracts"}
          className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-2 px-10 cursor-pointer"
        >
          Deploy a Sample Contract in C3{" "}
          <img src="/img/icons/contract.svg" className="w-4" alt="" />
        </Link>
      </div>
      <div className="flex xl:flex-row flex-col xl:gap-10 gap-2 w-full">
        <Table
          title={"Most earned fees"}
          items={[
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
          ]}
        />
        <Table
          title={"Most earned fees"}
          items={[
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
            {
              address: "0x345465a4d64a646446a844600000212",
              timeAgo: "17 secs",
              eth: "0.1456",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AppComponent;
