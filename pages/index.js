import FeatureSlide from "@/components/feature-slide/FeatureSlide";
import Menu from "@/components/navbar/Menu";
import {getFeatureSlides} from "@/libs/api";
import {selectAccount} from "@/redux/accountSlice";
import {Typography} from "@material-tailwind/react";
import {useSelector} from "react-redux";

export default function Home({featureSlides}) {
  const slide = featureSlides;

  const userName = useSelector(selectAccount);
  return (
    <>
      <Menu />
      <FeatureSlide slide={slide} />
      {userName ? <Typography>{userName}</Typography> : null}
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
