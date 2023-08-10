import { NavbarItem, navItems } from "../layout";

/* eslint-disable @next/next/no-img-element */
const Footer = () => {
  return (
    <div className="flex flex-row xl:px-40 sm:px-16 px-8 justify-around border-t border-white bg-[#6545f344] py-8">
      <img src="/img/logo.png" alt="" />
      <div className="lg:flex hidden gap-4 shrink-0 items-center justify-around w-[60%]">
        {navItems.map((item) => {
          return (
            <>
              <NavbarItem key={item.name} name={item.name} link={item.link} />
            </>
          );
        })}
      </div>
      <div className="flex gap-10 items-center justify-center">
        <img src="/img/icons/discord.svg" className="w-10" alt="" />
        <img src="/img/icons/github.svg" className="w-10" alt="" />
      </div>
    </div>
  );
};

export default Footer;
