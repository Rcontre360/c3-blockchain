import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
export const DescriptionSection = ({
  id,
  title,
  description,
  image,
  imageLeft,
  buttons,
}: any) => {
  return (
    <div
      id={id}
      className={clsx(
        { ["xl:flex-row "]: imageLeft },
        { ["xl:flex-row-reverse"]: !imageLeft },
        "flex flex-col xl:gap-20 gap-8 items-center xl:justify-between justify-center py-20 3xl:px-40 relative",
      )}
    >
      <div
        className={clsx(
          { "xl:pr-20": imageLeft },
          { "xl:pl-20": !imageLeft },
          "shrink-0 xl:!w-[600px] flex items-center justify-center xl:static relative",
        )}
      >
        <img
          src={image}
          className="xl:!w-[450px] sm:w-2/3 w-full relative"
          alt=""
        />
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
      <div className="w-full flex flex-col xl:items-start items-center gap-12 relative">
        <h2 className="text-[60px] md:text-[40px]font-[500] text-white xl:text-left text-center">
          {title}
        </h2>
        <p
          className="text-[20px] text-secondary xl:text-left text-center"
          style={{ lineHeight: "40px" }}
        >
          {description}
        </p>
        {buttons?.length && (
          <div className="flex gap-10 xl:justify-start justify-center">
            {buttons?.map((button: any) => button)}
          </div>
        )}
      </div>
    </div>
  );
};
