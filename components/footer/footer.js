import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import FaceBookIcon from "../../assets/icons/facebook.svg";
import YouTubeIcon from "../../assets/icons/youtube.svg";
import PinterestIcon from "../../assets/icons/pinterest.svg";
import DiscordIcon from "../../assets/icons/discord.svg";
import MinahLogo from "../../assets/icons/MinahLogo.png";
import Heart from "../../assets/icons/heart.svg";

function Footer(props) {
  return (
    <div className="bg-gray">
      <div className=" py-10">
        <div className="container mx-auto grid grid-col-1 lg:grid-cols-3 space-y-10 lg:space-y-0">
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-2 col-span-1">
            <Link href="" className="hover-effect">
              Store
            </Link>
            <Link href="" className="hover-effect">
              Discover
            </Link>
            <Link href="" className="hover-effect">
              News
            </Link>
          </div>
          <div className="lg:hidden border-b border-text-primary mx-6" />
          <div className="flex flex-col col-span-1 items-center space-y-6 lg:space-y-2">
            <Link href="" className="hover-effect">
              Terms and Service
            </Link>
            <Link href="" className="hover-effect">
              Privacy Policy
            </Link>
            <Link href="" className="hover-effect">
              Contact us
            </Link>
            <Link href="" className="hover-effect">
              FAQ
            </Link>
          </div>
          <div className="flex space-x-2 col-span-1 justify-center lg:justify-end">
            <div className="social-icon">
              <FaceBookIcon className="fill-text-primary w-2.5" />
            </div>
            <div className="social-icon">
              <YouTubeIcon className="fill-text-primary w-5" />
            </div>
            <div className="social-icon">
              <PinterestIcon className="fill-text-primary w-3.5" />
            </div>
            {/* <div className="social-icon">
              <DiscordIcon className="fill-text-primary w-5" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="lg:hidden border-b border-text-primary mx-6" />
      <div className="container mx-auto flex flex-col justify-between items-center py-6 space-y-5">
        <Link href="/">
          <div className="relative w-[45px] h-[45px]">
            <Image
              src={MinahLogo}
              alt="MinahLogo"
              fill
              className="object-cover"
              draggable="false"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        </Link>
        <div className="flex items-center italic text-sm">
          Made with
          <Heart className="fill-[#FF597B] ml-1" />
          by <span className="text-secondary ml-1">Minah</span>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
