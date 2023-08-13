/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Table from "./table";
import { useMetaMask } from "@/context/useMetamask";
import React from "react";
import DeployedContracts from "../../utils/mockData.json";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const AppComponent = () => {
  const { wallet } = useMetaMask();
  const router = useRouter();

  const [sortedContracts, setSortedContracts] = React.useState([]);

  React.useEffect(() => {
    const newArray: any = [];
    DeployedContracts.contracts.forEach((contract) => {
      newArray.push(contract);
    });
    setSortedContracts(
      newArray.sort((a: any, b: any) => {
        return parseFloat(b.eth) - parseFloat(a.eth);
      }),
    );
  }, [DeployedContracts.contracts]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center lg:gap-12 gap-4 xl:px-28 md:px-16 sm:px-8 px-4 relative pt-20 pb-20 overflow-hidden">
      <ChevronLeftIcon
        className="absolute top-10 left-7 w-8 text-white"
        onClick={() => {
          router.back();
        }}
      />
      <h1 className="text-center text-white font-bold lg:text-6xl text-4xl">
        Contract Gas Fee Tracker
      </h1>
      <div className="flex w-full items-end justify-center">
        <Link
          href={"/app/contracts"}
          className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-3 px-10 cursor-pointer"
        >
          Deploy a Sample Contract in C3{" "}
          <img src="/img/icons/contract.svg" className="w-4" alt="" />
        </Link>
      </div>
      <div className="flex xl:flex-row flex-col xl:gap-10 gap-8 w-full">
        <Table title={"Most earned fees"} items={sortedContracts} />
        <Table title={"All contracts"} items={DeployedContracts?.contracts} />
      </div>
    </div>
  );
};

export default AppComponent;
