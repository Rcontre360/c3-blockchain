const Main = () => {
  return (
    <div
      className="min-h-screen w-full relative flex flex-col justify-center items-center gap-6 xl:px-28 md:px-16 sm:px-8 px-4"
      style={{
        background:
          "url('/img/backgrounds/main.png') 0% 0% auto padding-box border-box ",
      }}
    >
      <h1 className="text-center text-white font-bold text-5xl">
        Create and Capitalize your Contracts
      </h1>
      <p className="text-secondary text-center font-lg font-bold">
        Introducing a blockchain platform where authenticated users can earn
        fees from transactions executed within their smart contracts.{" "}
      </p>
      <div className="flex gap-8 lg:w-2/3 w-full items-center justify-center">
        <AsideItem
          {...{
            title: "Build",
            description: "Access Our Documentation and Begin Your Build",
            link: "https://github.com/",
          }}
        />
        <AsideItem
          {...{
            title: "Docs",
            description: "Access Our Documentation and Begin Your Build",
            link: "https://github.com/",
          }}
        />
      </div>
    </div>
  );
};

const AsideItem = ({ title, description, link }: any) => {
  return (
    <aside className="bg-primary-opacity rounded-xl border border-white py-4 px-6">
      <a
        href={link}
        className="flex flex-col items-center justify-center gap-2"
      >
        <h2 className="text-xl text-white text-center font-bold">{title}</h2>
        <p className="text-md text-secondary text-center font-bold">
          {description}
        </p>
      </a>
    </aside>
  );
};

export default Main;
