import React from "react";
import {getProductByLink, getProducts} from "@/libs/api";
import {fixContent} from "@/libs/ultis";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

function Page({product}) {
  const {name, description} = product;

  const fixedContent = fixContent(description);
  return (
    <div className="">
      <h1 className="text-2xl pb-4">{name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div
          className="col-span-1 lg:col-span-3 post-content"
          dangerouslySetInnerHTML={{__html: fixedContent}}
        />
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
      ...(await serverSideTranslations(locale ?? "en", ["common"], null, [
        "en",
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
