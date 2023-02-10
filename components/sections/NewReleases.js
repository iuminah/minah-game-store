import React from "react";
import PropTypes from "prop-types";
import ProductCard from "../card/ProductCard";
import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import {Button} from "@material-tailwind/react";
import {Navigation} from "swiper";
import ChevronRight from "../../assets/icons/chevron_right_black.svg";
import ChevronLeft from "../../assets/icons/chevron_left_black.svg";

function NewReleases({NewReleases}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="flex items-center justify-between w-[160px] hover:w-[164px] duration-[120ms] ease-in-out cursor-pointer">
          <div>New Releases</div>
          <div className="pt-0.5">
            <ChevronRight className="fill-text-primary" />
          </div>
        </h2>
        <div className="flex items-center space-x-2">
          <Button className="btn-prev p-0.5">
            <ChevronLeft className="fill-white" />
          </Button>
          <Button className="btn-next p-0.5">
            <ChevronRight className="fill-white" />
          </Button>
        </div>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
            clickable: true,
          }}
          modules={[Navigation]}
          loop
          autoplay={{
            autoplay: false,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            719: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1320: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {NewReleases?.map((item, key) => {
            const {cover, name, prices, discount, slug} = item.attributes;
            return (
              <SwiperSlide key={key}>
                <ProductCard
                  cover={cover}
                  name={name}
                  discount={discount}
                  prices={prices}
                  slug={slug}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

NewReleases.propTypes = {};

export default NewReleases;
