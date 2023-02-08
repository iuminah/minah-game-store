import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import {getImageUrl, lastPrice, shimmerBlur} from "@/libs/ultis";
import Link from "next/link";

function ProductCard({cover, name, prices, discount, slug}) {
  return (
    <div className="bg-gray rounded-xl overflow-hidden cursor-pointer">
      <Link href={slug}>
        <div className="relative w-full h-[160px]">
          <Image
            src={getImageUrl(cover)}
            alt={name}
            fill
            className="object-cover hover:opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            draggable="false"
            placeholder="blur"
            blurDataURL={shimmerBlur()}
          />
        </div>
        <div className="px-3.5 py-2 space-y-2">
          <p>{name}</p>
          <div className="flex items-center justify-between space-x-4">
            {discount ? (
              <div className="text-white px-1.5 py-0.5 text-sm bg-green-500 rounded-md">{`- ${discount}%`}</div>
            ) : (
              <p></p>
            )}

            {prices ? (
              <div className="text-right flex items-center space-x-2">
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
        </div>
      </Link>
    </div>
  );
}

ProductCard.propTypes = {};

export default ProductCard;
