import React from "react";
import PropTypes from "prop-types";
import {getProductBySlug, getProducts} from "@/libs/api";
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

Page.propTypes = {};

export async function getStaticProps({params, locale}) {
  const product = await getProductBySlug(params.slug, locale);
  return {
    props: {
      // ...(await serverSideTranslations(locale, ["common"], null, ["en", "vi"])),
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
        params: {slug: page.attributes.slug},
        locale: page.attributes.locale,
      })),
    );
    console.log("paths :", paths);
  }

  return {
    paths,
    fallback: "blocking",
  };
}
export default Page;
