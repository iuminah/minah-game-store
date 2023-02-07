import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import {Pagination, Navigation, Autoplay, EffectCards} from "swiper";
import {Button, Typography} from "@material-tailwind/react";
import Image from "next/image";
import {getImageUrl, shimmerBlur} from "@/libs/ultis";
import ChevronRight from "../../assets/icons/chevron_right_black.svg";
import ChevronLeft from "../../assets/icons/chevron_left_black.svg";
import Link from "next/link";

function NewGameSlide({newGameSlides}) {
  const lastPrice = (price, discount) => {
    const result = price - price * (discount / 100);
    return `${result.toLocaleString()}₫`;
  };
  return (
    <div className="feature-slide">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
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
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {newGameSlides?.map((item, key) => (
          <SwiperSlide key={key} className="py-3.5 -my-3.5">
            <div className="h-full grid grid-cols-1 lg:grid-cols-11 rounded-xl lg:rounded-none overflow-hidden">
              <div className="relative lg:col-span-8 py-20 lg:py-0">
                <Image
                  src={getImageUrl(item.attributes.cover)}
                  alt={item.attributes.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  draggable="false"
                  placeholder="blur"
                  blurDataURL={shimmerBlur()}
                />
              </div>
              <div className="lg:col-span-3 flex flex-col px-6 justify-center space-y-2 lg:space-y-4 bg-gray">
                <h1 className="text-xl lg:text-3xl">{item.attributes.name}</h1>
                <p className="line-clamp-3 lg:line-clamp-5">
                  {item.attributes.brief}
                </p>
                <div className="flex items-center justify-between space-x-4">
                  {item.attributes.discount ? (
                    <div className="text-white px-2 py-1.5 text-sm bg-green-500 rounded-md">{`- ${item.attributes.discount}%`}</div>
                  ) : (
                    <p></p>
                  )}
                  {item.attributes.prices ? (
                    <div className="text-right">
                      {item.attributes.discount ? (
                        <Typography className="text-md line-through text-gray-300 italic font-thin">
                          {item.attributes.prices.toLocaleString()}₫
                        </Typography>
                      ) : null}
                      <p className="text-lg">
                        {lastPrice(
                          item.attributes.prices,
                          item.attributes.discount,
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="italic">Free to play</p>
                  )}
                </div>
                <Link href={item.attributes.slug}>
                  <Button className="w-full">{item.attributes.button}</Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="hidden lg:block absolute top-4 right-6 space-x-2 z-10">
          <Button className="prev p-1">
            <ChevronLeft className="fill-white" />
          </Button>
          <Button className="next p-1">
            <ChevronRight className="fill-white" />
          </Button>
        </div>
      </Swiper>
    </div>
  );
}

export default NewGameSlide;
