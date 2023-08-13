import { useMetaMask } from "@/context/useMetamask";
import { useModal } from "@/hooks/modal";
import { formatAddress, testContract } from "@/utils/web3";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import React from "react";

/* eslint-disable @next/next/no-img-element */
const Table = ({ title, items }: any) => {
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
        />
      ))}
    </div>
  );
};

const TableItem = ({ address, timeAgo, eth, isRegistered }: any) => {
  const [contractBalance, setBalance] = React.useState(eth || 0);
  const { Modal, show, hide, isShow } = useModal();
  const { wallet } = useMetaMask();
  const handleTestMe = async () => {
    try {
      const tx = await testContract(address, { wallet });
      const gasUsed = (tx.gasLimit * tx.gasPrice) as any;

      setBalance((bal: string) => {
        const number = BigInt(Number(bal) * 1000000000000000000);
        const result = ethers.formatEther(number + gasUsed);
        return result.substring(0, 7);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal isShow={isShow} withoutX>
        <div className="flex border border-white flex-col gap-10 px-10 pt-16 pb-10 rounded-xl min-h-[50vh] bg-overlay relative max-w-[600px] bg-gradient-to-b from-overlay to-[#6545f344] from-50% to-90%">
          <button
            type="button"
            className="bg-gray-4 rounded-md text-white hover:text-gray-500 focus:outline-none absolute top-4 right-4"
            onClick={() => {
              hide();
            }}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-7 w-7 font-bold" aria-hidden="true" />
          </button>
          <h2 className="text-4xl text-center font-bold text-white px-16">
            Contract Detail
          </h2>
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col items-center w-full gap-4 shrink-0">
              <div className="w-full gap-4 shrink-0 overflow-hidden">
                <h2 className="text-white font-bold text-xl text-center">
                  Address
                </h2>
                <p className="text-lg text-primary text-ellipsis text-center">
                  {address}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2 shrink-0">
              <div className="w-full gap-4">
                <h2 className="text-white font-bold text-xl text-center">
                  ETH Earned
                </h2>
                <p className="text-lg text-primary text-center">
                  {contractBalance}
                </p>
              </div>
            </div>
            <h2 className="text-white font-bold text-xl text-center">
              Gas Fee Test
            </h2>
            <div
              onClick={handleTestMe}
              className="flex items-center justify-center bg-primary rounded-xl font-bold gap-2 whitespace-nowrap text-[12px] text-white py-2 px-8 cursor-pointer"
            >
              Test me!
              <img src="/img/icons/contract.svg" className="w-4" alt="" />
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="flex py-12 px-8 gap-6 items-center justify-between w-full border-b-[0.2px]  border-secondary cursor-pointer"
        onClick={() => show()}
      >
        <div className="flex gap-6">
          <div className="w-16 py-4 px-5 bg-primary-disabled rounded-2xl sm:flex hidden items-center justify-center">
            <img src="/img/icons/contract.svg" className="w-5" alt="" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-md text-primary">{formatAddress(address)} </h3>
            <h3 className="text-md text-secondary">{timeAgo} </h3>
          </div>
        </div>
        <div className="rounded-xl border border-white text-center text-white text-[12px] font-[600] py-2 sm:px-8 px-4">
          {contractBalance} ETH
        </div>
      </div>
    </>
  );
};

export default Table;
