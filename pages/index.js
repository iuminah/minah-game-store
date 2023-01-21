import FeatureSlide from "@/components/feature-slide/FeatureSlide";
import Menu from "@/components/navbar/Menu";
import {getFeatureSlides} from "@/libs/api";
import {useEffect} from "react";

export default function Home({featureSlides}) {
  const slide = featureSlides;

  useEffect(() => {
    console.log("token", localStorage.getItem("token"));
    console.log("username", localStorage.getItem("username"));
  }, []);

  return (
    <>
      <Menu />
      <FeatureSlide slide={slide} />
      <div>PRODUCT</div>
    </>
  );
}

export const getStaticProps = async () => {
  const featureSlides = (await getFeatureSlides()) || {};

  return {
    props: {
      featureSlides,
    },
    revalidate: true,
  };
};
