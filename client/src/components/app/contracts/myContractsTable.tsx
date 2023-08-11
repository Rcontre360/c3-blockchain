import { useMetaMask } from "@/context/useMetamask";
import { formatAddress, registerContract } from "@/utils/web3";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

/* eslint-disable @next/next/no-img-element */
const MyContractsTable = ({ title, items }: any) => {
  React.useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-white font-bold text-xl rounded-2xl bg-primary-opacity py-6 px-10 w-full">
        {title}
      </h2>
      {items.map(({ address, timeAgo, eth, isRegistered }: any) => (
        <TableItem
          key={address}
          address={address}
          timeAgo={timeAgo}
          eth={eth}
          isRegistered={isRegistered}
        />
      ))}
    </div>
  );
};

const TableItem = ({ address, timeAgo, eth, isRegistered }: any) => {
  const { getRegisteredAddresses } = useMetaMask();

  return (
    <div className="flex py-12 px-8 gap-6 items-center justify-between w-full border-b-[0.2px]  border-secondary">
      <div className="flex gap-6">
        <div className="w-16 py-4 px-5 bg-primary-disabled rounded-2xl flex items-center justify-center">
          <img src="/img/icons/contract.svg" className="w-5" alt="" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-md text-primary">{formatAddress(address)} </h3>
          <h3 className="text-md text-secondary">{timeAgo} ago</h3>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="rounded-xl border border-white text-white text-[12px] font-[600] py-2 px-8">
          {eth} ETH
        </div>
        {!isRegistered ? (
          <div
            onClick={async () => {
              const success = await registerContract(address);
              if (success) {
                getRegisteredAddresses();
              }
            }}
            className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-[12px] text-white py-2 px-8 cursor-pointer"
          >
            Register{" "}
            <img src="/img/icons/contract.svg" className="w-4" alt="" />
          </div>
        ) : (
          <div className="rounded-xl border border-white text-white text-[12px] font-[600] py-2 px-4 flex gap-2 items-center justify-center">
            Registered <CheckCircleIcon className="w-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContractsTable;
