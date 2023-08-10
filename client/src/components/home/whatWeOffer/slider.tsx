/* eslint-disable @next/next/no-img-element */
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Zoom } from "swiper/modules";
import Link from "next/link";
import { OfferItem } from ".";

const SliderOffers = () => {
  return (
    <Swiper
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      zoom={true}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' + className + ' !bg-white !text-white">' + "</span>"
          );
        },
      }}
      autoplay={{ delay: 4000 }}
      speed={2500}
      initialSlide={0}
      modules={[Autoplay, Zoom, Pagination]}
      loop
      className="mySwiper xl:!hidden sm:w-[400px] w-full"
      spaceBetween={10}
    >
      <div className="flex items-center justify-center gap-2">
        {[
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
        ].map(({ description, icon }: any) => {
          return (
            <SwiperSlide
              key={`${description}-slider-item`}
              className="xl:block hidden !w-full px-2"
            >
              <OfferItem icon={icon} description={description} />
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
};

export default SliderOffers;
