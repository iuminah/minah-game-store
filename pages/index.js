import FeatureSlide from "@/components/feature-slide/FeatureSlide";
import Menu from "@/components/navbar/Menu";
import {getFeatureSlide} from "@/libs/api";

export default function Home({productList}) {
  const listFeature = productList?.attributes?.FeatureCover;

  return (
    <>
      <Menu />
      <FeatureSlide listFeature={listFeature} />
    </>
  );
}

export const getStaticProps = async () => {
  const productList = (await getFeatureSlide()) || {};

  return {
    props: {
      productList,
    },
    revalidate: true,
  };
};
