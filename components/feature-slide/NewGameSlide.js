import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import {Pagination, Navigation, Autoplay} from "swiper";
import Image from "next/image";
import {getImageUrl, lastPrice, shimmerBlur} from "@/libs/ultis";
import ChevronRight from "../../assets/icons/chevron_right_black.svg";
import ChevronLeft from "../../assets/icons/chevron_left_black.svg";
import Link from "next/link";

function NewGameSlide({newGameSlides}) {
  return (
    <div className="feature-slide">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {newGameSlides?.map((item, key) => {
          const {cover, name, brief, prices, discount, slug, button} =
            item.attributes;

          return (
            <SwiperSlide key={key} className="py-3.5 -my-3.5">
              <div className="h-full grid grid-cols-1 lg:grid-cols-11 rounded-xl lg:rounded-none overflow-hidden">
                <div className="relative lg:col-span-8 py-20 lg:py-0 active:opacity-80">
                  <Link href={slug}>
                    <Image
                      src={getImageUrl(cover)}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      draggable="false"
                      placeholder="blur"
                      blurDataURL={shimmerBlur()}
                    />
                  </Link>
                </div>
                <div className="lg:col-span-3 flex flex-col px-6 justify-center space-y-2 lg:space-y-4 bg-[#F5F5F5]">
                  <Link href={slug}>
                    <h1 className="text-headline5 lg:text-headline4 font-bold">
                      {name}
                    </h1>
                  </Link>
                  <p className="line-clamp-3 lg:line-clamp-5">{brief}</p>
                  <div className="flex items-center justify-between space-x-4">
                    {discount ? (
                      <div className="bg-green-600 p-1 px-2.5 text-button2 font-bold border-none text-white">{`- ${discount}%`}</div>
                    ) : (
                      <p></p>
                    )}
                    {prices ? (
                      <div className="text-right">
                        {discount ? (
                          <p className="text-md line-through text-gray-300 italic font-thin">
                            {prices.toLocaleString()}₫
                          </p>
                        ) : null}
                        <p className="text-lg">{lastPrice(prices, discount)}</p>
                      </div>
                    ) : (
                      <p className="italic">Free to play</p>
                    )}
                  </div>
                  {/* <Link href={slug}> */}
                  <button
                    type="primary"
                    size="large"
                    block
                    // className="font-medium"
                  >
                    {button}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className="hidden lg:block absolute top-4 right-6 space-x-2 z-10">
          <button className="prev p-1">
            <ChevronLeft className="fill-text-primary" />
          </button>
          <button className="next p-1">
            <ChevronRight className="fill-text-primary" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default NewGameSlide;
