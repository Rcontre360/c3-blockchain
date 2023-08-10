/* eslint-disable @next/next/no-img-element */
const Table = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-white font-bold text-xl rounded-2xl bg-primary-opacity py-6 px-10 w-full">
        Most fees earned
      </h2>
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
      <TableItem />
    </div>
  );
};

const TableItem = () => {
  return (
    <div className="flex py-12 px-8 gap-6 items-center justify-between w-full border-b-[0.2px]  border-secondary">
      <div className="flex gap-6">
        <div className="w-16 py-4 px-5 bg-primary-disabled rounded-2xl flex items-center justify-center">
          <img src="/img/icons/contract.svg" className="w-5" alt="" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-md text-primary">0x3ee1265aa5aa...</h3>
          <h3 className="text-md text-secondary">17 secs ago</h3>
        </div>
      </div>
      <div className="rounded-xl border border-white text-white text-[12px] font-[600] py-2 px-8">
        0.1465 ETH
      </div>
    </div>
  );
};

export default Table;
