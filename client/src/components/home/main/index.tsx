import { LinkIcon } from "@heroicons/react/24/solid";
import { DescriptionSection } from "../project_description/descriptionSection";
import SliderHome from "./slider";
import Link from "next/link";

const Main = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center gap-12 xl:px-28 md:px-16 sm:px-8 px-4 relative pt-48 pb-20 overflow-hidden"
      style={{
        background: "url('/img/backgrounds/main.png')  no-repeat",
      }}
    >
      <h1 className="text-center text-white font-bold text-6xl">
        Create and Capitalize your Contracts
      </h1>
      <p className="text-secondary text-center text-lg font-bold lg:w-1/2 sm:w-2/3 w-full">
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
            title: "Use C3",
            description: "Unlock The Power of Next Generation Programs",
            link: "https://github.com/",
          }}
        />
      </div>
      <SliderHome />
      <div className="py-20"></div>
      <DescriptionSection
        title={"C3 Rollup"}
        description={
          "A blockchain platform Powered by Worldcoin, enabling authenticated  users to earn fees from the transaction executed within their smart contracts. C3 is based in the OP Stack, ensuring high scalability,  security, and efficiency. Furthermore, through our seamless integration with Hyperlane, we facilitate  smooth communication with  Worldcoin smart contracts,  ensuring that users can  capitalize on every opportunity "
        }
        imageLeft
        image="/img/c3rollup.png"
      />
      <DescriptionSection
        title={"C3 Docs"}
        description={
          "A blockchain platform Powered by Worldcoin, enabling authenticated  users to earn fees from the transaction executed within their smart contracts. C3 is based in the OP Stack, ensuring high scalability,  security, and efficiency. Furthermore, through our seamless integration with Hyperlane, we facilitate  smooth communication with  Worldcoin smart contracts,  ensuring that users can  capitalize on every opportunity "
        }
        image="/img/c3docs.png"
        buttons={[
          <a
            href="https://app.gitbook.com/o/zBVBDgxdpx2OqHpx4XRL/s/fO5dcc4fxHhjkAFSVgqW/"
            key={0}
            className="flex items-center justify-center bg-primary rounded-xl font-[500] gap-4 whitespace-nowrap text-white py-4 px-16"
          >
            Open Docs <LinkIcon className="h-4" />
          </a>,
          <a
            href="https://app.gitbook.com/o/zBVBDgxdpx2OqHpx4XRL/s/fO5dcc4fxHhjkAFSVgqW/"
            key={1}
            className="flex items-center justify-center bg-primary rounded-xl font-[500] gap-4 whitespace-nowrap text-white py-4 px-16"
          >
            Learn More <LinkIcon className="h-4" />
          </a>,
        ]}
      />
      <DescriptionSection
        title={"About us"}
        description={
          "A blockchain platform Powered by Worldcoin, enabling authenticated  users to earn fees from the transaction executed within their smart contracts. C3 is based in the OP Stack, ensuring high scalability,  security, and efficiency. Furthermore, through our seamless integration with Hyperlane, we facilitate  smooth communication with  Worldcoin smart contracts,  ensuring that users can  capitalize on every opportunity "
        }
        imageLeft
        image="/img/aboutus.png"
      />
    </div>
  );
};

const AsideItem = ({ title, description, link }: any) => {
  return (
    <aside className="bg-primary-opacity rounded-xl border border-white ">
      <a
        href={link}
        className="flex flex-col items-center justify-center gap-2 py-4 px-6"
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
