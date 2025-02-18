/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Table from "../table";
import { useMetaMask } from "@/context/useMetamask";
import React from "react";
import MyContractsTable from "./myContractsTable";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const ContractsComponent = () => {
  const {
    wallet,
    connectMetaMask,
    deployContract,
    getRegisteredAddresses,
    registeredAddresses,
  } = useMetaMask();
  const [addresses, setAddresses] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  React.useEffect(() => {
    getRegisteredAddresses();
  }, []);

  React.useEffect(() => {
    if (registeredAddresses?.length > 0) {
      const newArray: any = [];
      addresses.forEach((address: any) =>
        newArray.push({
          ...address,
          isRegistered: registeredAddresses
            .map((a) => a.toLowerCase())
            .includes(address.address.toLowerCase()),
        }),
      );
      setAddresses(newArray);
    }
  }, [registeredAddresses]);

  console.log({ wallet });
  return (
    <div className="min-h-screen w-full flex flex-col items-center lg:gap-12 gap-4 xl:px-28 md:px-16 sm:px-8 px-4 relative pt-20 pb-20 overflow-hidden bg-gradient-to-b from-overlay from-10% via-overlay via-40% to-[#6545f344]">
      <ChevronLeftIcon
        className="absolute top-10 left-7 w-8 text-white"
        onClick={() => {
          router.back();
        }}
      />
      <h1 className="text-center text-white font-bold lg:text-5xl text-3xl">
        Contract Manager
      </h1>
      <div className="flex w-full items-end justify-center">
        {wallet ? (
          <div
            onClick={async () => {
              try {
                const address = await deployContract("ERC20");
                // const address = "0x564654d65a464a6546a846464a486a468a46a84";
                if (address != null) {
                  setAddresses((prev: any) => {
                    const newArray: any = [];
                    prev.forEach((contract: any) => newArray.push(contract));
                    newArray.push({
                      address,
                      timeAgo: "Few seconds",
                      eth: "0",
                    });
                    return newArray;
                  });
                }
              } catch (e) {
                console.log(e);
              }
            }}
            className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-3 px-10 cursor-pointer"
          >
            Deploy a Sample Contract in C3{" "}
            <img src="/img/icons/contract.svg" className="w-4" alt="" />
          </div>
        ) : (
          <div
            onClick={() => connectMetaMask()}
            className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-3 px-10 cursor-pointer"
          >
            Connect Wallet{" "}
            <img src="/img/icons/contract.svg" className="w-4" alt="" />
          </div>
        )}
      </div>
      <div className="flex xl:flex-row flex-col xl:gap-10 gap-2 xl:w-2/3 w-full">
        <MyContractsTable title={"My Contracts"} items={addresses} />
      </div>
    </div>
  );
};

export default ContractsComponent;
