import React, {useCallback, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation, Autoplay} from "swiper";
import {
  getFormattedImage,
  getImageUrl,
  lastPrice,
  rgbDataURL,
  shimmerBlur,
} from "@/libs/ultis";
import {Button, IconButton, Skeleton} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useTranslation} from "react-i18next";

function NewGameSlide({newGameSlides}) {
  const {t} = useTranslation();
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
          const {cover, title, brief, prices, discount, link} = item.attributes;
          console.log("cover :", cover);

          return (
            <SwiperSlide key={key} className="py-3.5 -my-8">
              <div className="h-full grid grid-row-4 md:grid-rows-none md:grid-cols-6 lg:grid-cols-12">
                <div className="relative row-span-3 md:row-auto md:col-span-4 lg:col-span-9 lg:py-0 active:opacity-80">
                  <Link href={link}>
                    <Image
                      src={getImageUrl(cover)}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      draggable="false"
                      placeholder="blur"
                      blurDataURL={shimmerBlur(1000, 1000)}
                    />
                  </Link>
                </div>
                <div className="row-span-1 md:row-auto md:col-span-2 lg:col-span-3 flex flex-col px-6 justify-center space-y-2 lg:space-y-4 bg-background-secondary py-0">
                  <Link href={link}>
                    <h1 className="text-headline5 lg:text-headline4 font-bold">
                      {title}
                    </h1>
                  </Link>
                  <p className="line-clamp-3 lg:line-clamp-4">{brief}</p>
                  <div className="flex items-center justify-between space-x-4">
                    {discount ? (
                      <div className="bg-green-600 p-1 px-2.5 text-button2 font-bold border-none rounded-md text-white">{`- ${discount}%`}</div>
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
                        <p className="text-headline6 font-medium">
                          {lastPrice(prices, discount)}
                        </p>
                      </div>
                    ) : (
                      <p className="italic text-headline6 font-medium">
                        Free to play
                      </p>
                    )}
                  </div>
                  <Link href={link} className="w-full">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{width: "100%"}}
                    >
                      {t("learn more")}
                    </Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className="hidden md:block absolute top-4 right-4 z-10">
          <IconButton className="prev">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton className="next">
            <ChevronRightIcon />
          </IconButton>
        </div>
      </Swiper>
    </div>
  );
}

export default NewGameSlide;
