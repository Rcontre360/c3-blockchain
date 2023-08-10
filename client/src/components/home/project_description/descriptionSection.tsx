import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
export const DescriptionSection = ({
  title,
  description,
  image,
  imageLeft,
  buttons,
}: any) => {
  return (
    <div
      className={clsx(
        { ["xl:flex-row "]: imageLeft },
        { ["xl:flex-row-reverse"]: !imageLeft },
        "flex flex-col xl:gap-20 gap-8 items-center justify-between py-20 3xl:px-40 relative",
      )}
    >
      <div
        className={clsx(
          { "pr-20": imageLeft },
          { "pl-20": !imageLeft },
          "shrink-0 xl:!w-[600px]",
        )}
      >
        <img src={image} className="xl:!w-[450px] w-full relative" alt="" />
        <img
          src="/img/blur.png"
          className={clsx(
            { "xl:left-0": imageLeft },
            { "xl:right-0": !imageLeft },
            "absolute w-1/2 top-0 bottom-0 my-auto",
          )}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col items-start gap-12 relative">
        <h2 className="text-[60px] font-[500] text-white">{title}</h2>
        <p
          className="text-[20px] text-secondary"
          style={{ lineHeight: "40px" }}
        >
          {description}
        </p>
        {buttons?.length && (
          <div className="flex gap-10">
            {buttons?.map((button: any) => button)}
          </div>
        )}
      </div>
    </div>
  );
};
