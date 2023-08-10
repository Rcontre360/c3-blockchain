/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Table from "./table";

const AppComponent = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center lg:gap-12 xl:px-28 md:px-16 sm:px-8 px-4 relative pt-20 pb-20 overflow-hidden">
      <h1 className="text-center text-white font-bold lg:text-6xl text-4xl">
        Contract Gas Fee Tracker
      </h1>
      <div className="flex w-full items-end justify-center">
        <Link
          href="/app"
          className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-sm text-white py-2 px-10"
        >
          Deploy a Sample Contract in C3{" "}
          <img src="/img/icons/contract.svg" className="w-4" alt="" />
        </Link>
      </div>
      <div className="flex gap-10 w-full">
        <Table />
        <Table />
      </div>
    </div>
  );
};

export default AppComponent;
