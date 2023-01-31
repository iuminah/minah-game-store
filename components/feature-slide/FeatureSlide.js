import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import {Pagination, Navigation} from "swiper";
import {Button, Chip, Typography} from "@material-tailwind/react";
import Image from "next/image";
import {getImageUrl, shimmerBlur} from "@/libs/ultis";

function FeatureSlide(props) {
  const {slide} = props;

  return (
    <div className="feature-slide">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="h-full text-white"
        >
          {slide?.map((item, key) => (
            <SwiperSlide key={key} className="py-3.5 -my-3.5">
              <div className="h-full grid grid-cols-1 lg:grid-cols-11">
                <div className="relative lg:col-span-8 py-20 lg:py-0">
                  <Image
                    src={getImageUrl(item)}
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
                  <h1 className="text-xl lg:text-3xl">
                    {item.attributes.name}
                  </h1>
                  <Typography className="text-justifyd line-clamp-3 lg:line-clamp-5">
                    {item.attributes.brief}
                  </Typography>
                  <div className="flex items-center justify-between space-x-4">
                    <Chip
                      color="green"
                      value={`- ${item.attributes.productPrice.discount}%`}
                      className="px-2 text-sx "
                    />
                    <div className="text-right">
                      <Typography className="text-md line-through text-gray-300">
                        {item.attributes.productPrice.price.toLocaleString()}₫
                      </Typography>
                      <Typography className="font-bold text-lg">
                        {(
                          item.attributes.productPrice.price -
                          item.attributes.productPrice.price *
                            (item.attributes.productPrice.discount / 100)
                        ).toLocaleString()}
                        ₫
                      </Typography>
                    </div>
                  </div>
                  <Button>{item.attributes.button}</Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default FeatureSlide;
