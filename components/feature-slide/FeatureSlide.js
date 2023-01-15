import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import PropTypes from "prop-types";

import {Pagination, Navigation} from "swiper";
import {Typography} from "@material-tailwind/react";
import Image from "next/image";

function FeatureSlide(props) {
  const {list} = props;
  console.log("props :", props);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-[500px]"
    >
      {list ? (
        list?.map((item, key) => (
          <SwiperSlide
            key={key}
            className="flex flex-col justify-center items-center"
          >
            <Typography>{item.name}</Typography>
            <Image
              src={`https://minah-game-cms-uppyx.appengine.bfcplatform.vn${item.image.data.attributes.url}`}
              alt={item.name}
              objectFit="cover"
              layout="fill"
            />
          </SwiperSlide>
        ))
      ) : (
        <></>
      )}
    </Swiper>
  );
}

FeatureSlide.propTypes = {};

export default FeatureSlide;
