import FeatureSlide from "@/components/feature-slide/FeatureSlide";
import Menu from "@/components/navbar/Menu";
import {getFeatureSlides} from "@/libs/api";

export default function Home({featureSlides}) {
  const slide = featureSlides;

  return (
    <>
      <Menu />
      <div className="pt-[74px]">
        <FeatureSlide slide={slide} />
      </div>
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
