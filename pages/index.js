import ProductCard from "@/components/card/ProductCard";
import NewGameSlide from "@/components/slides/NewGameSlide";
import NewReleases from "@/components/sections/NewReleases";
import {getNewGameSlide} from "@/libs/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Home({newGameSlides}) {
  return (
    <div>
      <NewGameSlide newGameSlides={newGameSlides} />
      <div></div>
    </div>
  );
}

export const getStaticProps = async ({locale}) => {
  const newGameSlides = (await getNewGameSlide(locale)) || {};

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], null, [
        "en-US",
        "vi-VN",
      ])),
      newGameSlides,
    },
    revalidate: false,
  };
};
