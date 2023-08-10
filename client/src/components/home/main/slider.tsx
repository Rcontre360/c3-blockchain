/* eslint-disable @next/next/no-img-element */
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";
import Link from "next/link";

const SliderHome = () => {
  return (
    <Swiper
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      zoom={true}
      slidePrevClass=".swiper-button-prev"
      navigation={{
        enabled: true,
        nextEl: ".swiper-button-next",
        prevEl: "",
      }}
      initialSlide={0}
      modules={[Zoom, Navigation]}
      loop
      className="mySwiper w-3/4"
      spaceBetween={10}
    >
      <div className="flex items-center justify-center gap-2">
        {[
          {
            name: "Why use the C3 blockchain?",
            description:
              "Discover C3 unparalleled features and advantages tailored just for you",
            image: "/img/slider/slider-1.png",
            link: "",
          },
          {
            name: "Get to know the passionate minds behind its innovation and uncover the exceptional  advantages they have crafted for you",
            description: "",
            image: "/img/slider/slider-2.png",
            link: "",
          },
          {
            name: "Dive into our documentation, crafted by the dedicated minds behind its inception, and unlock the full potential of our platform",
            description: "",
            image: "/img/slider/slider-3.png",
            link: "",
          },
        ].map(({ name, description, image, link }: any) => {
          return (
            <SwiperSlide
              key={`${name}-slider-item`}
              className="xl:block hidden !w-full px-2"
            >
              <Link href={link}>
                <div className="flex flex-col relative w-full rounded-3xl border border-white h-96 overflow-hidden">
                  <img src={image} alt={name} className="h-full w-full" />
                  <div className="opacity-[0.1] bg-primary h-full w-full absolute top-0"></div>{" "}
                  <h2 className="absolute bottom-7 lg:px-16 px-8 text-[30px] font-bold text-white">
                    {name}{" "}
                    {description ? (
                      <>
                        <br />
                        {description}
                      </>
                    ) : (
                      ""
                    )}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
};

export default SliderHome;
