import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import Image from "next/image";
import {getImageUrl, shimmerBlur} from "@/libs/ultis";

function CategoriesSlide({categoriesSlide}) {
  return (
    <div className="space-y-4">
      <p className="text-headline6">Thể loại phổ biến</p>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          420: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          719: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1320: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation]}
      >
        {categoriesSlide?.map((item, key) => {
          const {title, products} = item?.attributes;
          const cover1 = products?.data[0]?.attributes?.verticalCover?.data[0];
          const cover2 = products?.data[1]?.attributes?.verticalCover?.data[0];
          const cover3 = products?.data[2]?.attributes?.verticalCover?.data[0];
          return (
            <SwiperSlide
              key={key}
              className="bg-background-secondary pt-10 pb-4 cursor-pointer hover:bg-background-tertiary select-none overflow-hidden rounded-lg"
            >
              <div className="space-y-10 flex flex-col items-center justify-center">
                <div className="relative w-full h-[100px]">
                  <div className="relative left-1/2 -translate-x-1/2 -top-5 w-10/12 h-[160px] ">
                    <div className="relative w-[100px] h-[140px] left-1/2 -translate-x-1/2 z-10">
                      <Image
                        src={getImageUrl(cover1)}
                        alt={title}
                        fill
                        className="object-cover absolute z-10 "
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        draggable="false"
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-[80px] h-[110px] opacity-80">
                        <Image
                          src={getImageUrl(cover2)}
                          alt={title}
                          fill
                          className="object-cover "
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                          draggable="false"
                        />
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-[80px] h-[110px] opacity-80">
                        <Image
                          src={getImageUrl(cover3)}
                          alt={title}
                          fill
                          className="object-cover "
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-body1 uppercase">{title}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CategoriesSlide;
