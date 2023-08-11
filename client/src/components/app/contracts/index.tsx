/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Table from "../table";
import { useMetaMask } from "@/context/useMetamask";
import React from "react";
import MyContractsTable from "./myContractsTable";

const ContractsComponent = () => {
  const { wallet, connectMetaMask, deployContract } = useMetaMask();
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center lg:gap-12 gap-4 xl:px-28 md:px-16 sm:px-8 px-4 relative pt-20 pb-20 overflow-hidden bg-gradient from-overlay to-primary from-80% to-90%">
      <h1 className="text-center text-white font-bold lg:text-5xl text-3xl">
        Contract Manager
      </h1>
      <div className="flex w-full items-end justify-center">
        {wallet ? (
          <div
            onClick={async () => {
              //   const address = await deployContract("ERC20");
              const address = "0x564654d65a464a6546a846464a486a468a46a84";
              setAddresses((prev: any) => {
                const newArray: any = [];
                prev.forEach((address: any) => newArray.push(address));
                newArray.push({
                  address,
                  timeAgo: "Few seconds",
                  eth: "0.1546",
                });
                return newArray;
              });
            }}
            className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-4 px-10 cursor-pointer"
          >
            Deploy a Sample Contract in C3{" "}
            <img src="/img/icons/contract.svg" className="w-4" alt="" />
          </div>
        ) : (
          <div
            onClick={() => connectMetaMask()}
            className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-2 px-10 cursor-pointer"
          >
            Connect Wallet{" "}
            <img src="/img/icons/contract.svg" className="w-4" alt="" />
          </div>
        )}
      </div>
      <div className="flex xl:flex-row flex-col xl:gap-10 gap-2 w-1/2">
        <MyContractsTable title={"My Contracts"} items={addresses} />
      </div>
    </div>
  );
};

export default ContractsComponent;
