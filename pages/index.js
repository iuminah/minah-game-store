import FeatureSlide from "@/components/feature-slide/FeatureSlide";
import Menu from "@/components/navbar/Menu";
import {getProduct} from "@/libs/api";
import {Typography} from "@material-tailwind/react";
import Image from "next/image";

export default function Home({productList}) {
  const list = productList?.attributes?.FeatureCover || null;

  return (
    <div>
      <Menu />
      <FeatureSlide list={list} />
    </div>
  );
}

export const getStaticProps = async () => {
  const productList = (await getProduct()) || {};

  return {
    props: {
      productList,
    },
    revalidate: true,
  };
};
