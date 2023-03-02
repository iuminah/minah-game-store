import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React from "react";
import {getCategoties} from "@/libs/api";
import CategoriesSlide from "@/components/slides/CategoriesSlide";

function DiscoverPage({categoriesSlide}) {
  return (
    <div>
      <CategoriesSlide categoriesSlide={categoriesSlide} />
    </div>
  );
}

export default DiscoverPage;

export const getStaticProps = async ({locale}) => {
  const categoriesSlide = (await getCategoties(locale)) || {};

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], null, [
        "en-US",
        "vi-VN",
      ])),
      categoriesSlide,
    },
  };
};
