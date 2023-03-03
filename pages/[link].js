import React from "react";
import {getProductByLink, getProducts} from "@/libs/api";
import {fixContent, getImageUrl} from "@/libs/ultis";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Image from "next/image";
import {Button, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Specifications from "@/components/sections/Specifications";

function Page({product}) {
  console.log("product :", product);
  const {t} = useTranslation();
  const {
    title,
    description,
    logo,
    developer,
    publisher,
    releaseDate,
    platforms,
    windows,
    macos,
  } = product;
  console.log("macos :", macos);
  console.log("windows :", windows);
  const fixedContent = fixContent(description);

  return (
    <div className="block">
      <h1 className="text-headline3 my-10">{title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-10 space-x-0 lg:space-x-14 space-y-4 lg:space-y-0">
        <div
          className="col-span-1 lg:col-span-7 post-content"
          dangerouslySetInnerHTML={{__html: fixedContent}}
        />
        <div className="col-span-1 lg:col-span-3">
          <div className="flex flex-col justify-center items-center sticky top-24 mx-4 space-y-4">
            <div className="relative w-3/5 h-28">
              <Image
                src={getImageUrl(logo)}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                draggable="false"
              />
            </div>
            <div className="w-full space-y-4">
              <Button variant="contained" sx={{width: "100%"}}>
                {t("get")}
              </Button>
              <Button variant="contained" sx={{width: "100%"}}>
                {t("add to cart")}
              </Button>
              <Typography>
                {t("develop")} : {developer}
              </Typography>
              <Typography>
                {t("publisher")} : {publisher}
              </Typography>
              <Typography>
                {t("release date")}: {releaseDate}
              </Typography>
              <Typography>
                {t("platform")} :{" "}
                {platforms.data?.map((platform) => platform.attributes.os)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-10">
        <div className="col-span-1 lg:col-span-7">
          <p className="pb-6 capitalize text-headline5">
            {t("specifications")}
          </p>
          <Specifications windows={windows} macos={macos} />
        </div>
      </div>
    </div>
  );
}

export default Page;

export async function getStaticProps({params, locale}) {
  console.log("params :", params);
  console.log("locale :", locale);
  const product = await getProductByLink(params.link, locale);

  if (!product) {
    return {notFound: true};
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], null, [
        "en-US",
        "vi-VN",
      ])),
      product,
    },
  };
}

export async function getStaticPaths({locales}) {
  let paths = [];

  for (const locale of locales) {
    const productSlug = (await getProducts(locale)) || [];
    paths = paths.concat(
      productSlug?.map((page) => ({
        params: {link: page.attributes.link},
        locale: page.attributes.locale,
      })),
    );
  }
  // console.log("paths :", paths);

  return {
    paths,
    fallback: "blocking",
  };
}
