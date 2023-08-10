/* eslint-disable @next/next/no-img-element */
const BuiltForCreators = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0">
        <div className="relative">
          <img src="/img/details/detail1.png" className="w-60" alt="" />
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="relative flex items-center justify-end h-96">
          <img src="/img/details/detail2.png" className="w-52" alt="" />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-12 lg:py-60 py-32 xl:px-28 md:px-16 sm:px-8 px-4 relative overflow-hidden">
        <h2 className="xl:text-[60px] md:text-[40px] text-[35px] font-[500] text-white text-center">
          Built for creators Growth
        </h2>
        <p className="xl:text-[24px] text-[16px] text-secondary font-[500] w-2/3 text-center">
          C3 Mainnet focuses on the creators economy, specifically those who
          build products that make the C3 ecosystem better
        </p>
        <a
          href="https://discord.gg/6CnywHdv7z"
          target="_blank"
          className="flex items-center justify-center gap-2 font-[500] py-3 px-10 bg-primary rounded-xl text-white"
        >
          Join us on Discord{" "}
          <img src="/img/icons/discord.svg" className="w-6" alt="" />
        </a>
      </div>
    </div>
  );
};

export default BuiltForCreators;
