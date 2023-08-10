import SliderOffers from "./slider";

/* eslint-disable @next/next/no-img-element */
const WhatWeOffer = () => {
  const elements = [
    {
      description:
        "Being built atop the Ethereum framework, we inherit its robust security protocols, so  transaction contracts are secured  by the time-tested Ethereum network",
      icon: "/img/icons/ether.svg",
    },
    {
      description:
        "Our layer 2 architecture ensures that users can  executed transactions at a  higher throughput and reduced latency, allowing for seamless  and efficient interactions",
      icon: "/img/icons/block.png",
    },
    {
      description:
        "Our platform provides to our user earn fees from the very  transactions executed within their smart contracts, turning their  solutions into potential revenue streams",
      icon: "/img/icons/money.svg",
    },
  ];

  return (
    <div
      id="what_we_offer"
      className="w-full flex flex-col pb-60 justify-center items-center gap-24 xl:px-28 md:px-16 sm:px-8 px-4 relative overflow-hidden bg-gradient-to-b from-overlay from-10% via-overlay via-40% to-[#6545f344]"
    >
      <div className="absolute top-0 left-0">
        <div className="relative h-80">
          <img src="/img/details/detail3.png" className="w-60" alt="" />
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="relative flex items-center justify-end h-80">
          <img src="/img/details/detail4.png" className="w-60" alt="" />
        </div>
      </div>
      <h2 className="xl:text-[60px] md:text-[40px] text-[35px] font-[500] text-white text-center">
        What C3 offers to you
      </h2>
      <div className="xl:flex hidden justify-between 3xl:w-2/3 2xl:w-3/4 xl:w-4/5 w-full gap-10">
        {elements.map(({ description, icon }: any) => {
          return (
            <OfferItem
              key={`${description}-offer`}
              icon={icon}
              description={description}
            />
          );
        })}
      </div>
      <SliderOffers />
    </div>
  );
};

export const OfferItem = ({ description, icon }: any) => {
  return (
    <aside className="bg-primary-opacity rounded-xl flex flex-col items-center justify-center gap-20 py-20 px-12 xl:w-[300px]">
      <img src={icon} className="h-[100px]  brightness-[2000]" alt={icon} />
      <p className="text-md text-secondary text-center">{description}</p>
    </aside>
  );
};

export default WhatWeOffer;
