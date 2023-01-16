import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import PropTypes from "prop-types";

import {Pagination, Navigation} from "swiper";
import {Typography} from "@material-tailwind/react";
import Image from "next/image";

function FeatureSlide(props) {
  const {listFeature} = props;

  return (
    <div className="flex justify-center mt-8 ">
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
          className="h-[600px]"
        >
          {listFeature?.map((item, key) => (
            <SwiperSlide
              key={key}
              className="flex flex-col justify-center items-center"
            >
              <Typography>{item.name}</Typography>
              <Image
                src={`https://minah-game-cms-uppyx.appengine.bfcplatform.vn${item.image.data.attributes.url}`}
                alt={item.name}
                fill
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

FeatureSlide.propTypes = {};

export default FeatureSlide;
