import React from "react";
import Image from "next/image";
import Link from "next/link";
import FaceBookIcon from "../../assets/icons/facebook.svg";
import YouTubeIcon from "../../assets/icons/youtube.svg";
import PinterestIcon from "../../assets/icons/pinterest.svg";
import MinahLogo from "../../assets/icons/MinahLogo.png";
import Heart from "../../assets/icons/heart.svg";
import {Container} from "@mui/material";
import {useTranslation} from "react-i18next";

function Footer() {
  const {t} = useTranslation();
  return (
    <div className="bg-background-secondary mt-6">
      <Container className=" py-10" maxWidth="xl">
        <div className="container mx-auto grid grid-col-1 lg:grid-cols-3 space-y-10 lg:space-y-0">
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-2 col-span-1">
            <Link href="" className="hover-effect">
              {t("store")}
            </Link>
            <Link href="" className="hover-effect">
              {t("discover")}
            </Link>
            <Link href="" className="hover-effect">
              {t("news")}
            </Link>
          </div>
          <div className="lg:hidden border-b border-text-primary mx-6" />
          <div className="flex flex-col col-span-1 items-center space-y-6 lg:space-y-2">
            <Link href="" className="hover-effect">
              {t("terms and service")}
            </Link>
            <Link href="" className="hover-effect">
              {t("privacy policy")}
            </Link>
            <Link href="" className="hover-effect">
              {t("contact us")}
            </Link>
            <Link href="" className="hover-effect">
              {t("FAQ")}
            </Link>
          </div>
          <div className="flex space-x-2 col-span-1 justify-center lg:justify-end">
            <div className="social-icon">
              <FaceBookIcon className="fill-white w-2.5" />
            </div>
            <div className="social-icon">
              <YouTubeIcon className="fill-white w-5" />
            </div>
            <div className="social-icon">
              <PinterestIcon className="fill-white w-3" />
            </div>
          </div>
        </div>
      </Container>
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
          by <span className="ml-1">Minah</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
