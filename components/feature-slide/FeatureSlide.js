import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import PropTypes from "prop-types";

import {Pagination, Navigation} from "swiper";
import {Button, Chip, Typography} from "@material-tailwind/react";
import {DOMAIN} from "@/libs/api";

function FeatureSlide(props) {
  const {slide} = props;
  console.log("slide :", slide);

  return (
    <div className="flex justify-center">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className="h-[600px] bg-gray-600 text-white "
        >
          {slide?.map((item, key) => (
            <SwiperSlide
              key={key}
              className="flex flex-col justify-center items-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-8 h-full">
                <picture className="col-span-1 lg:col-span-6">
                  <img
                    src={`${DOMAIN}${item.attributes.cover.data.attributes.url}`}
                    className="object-fill h-full"
                  />
                </picture>
                <div className="col-span-1 lg:col-span-2 flex flex-col px-6 justify-center space-y-4">
                  <h1 className="lg:text-3xl">{item.attributes.name}</h1>
                  <Typography className="text-justify">
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

FeatureSlide.propTypes = {};

export default FeatureSlide;
