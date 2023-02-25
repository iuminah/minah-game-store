import ProductCard from "@/components/card/ProductCard";
import NewGameSlide from "@/components/feature-slide/NewGameSlide";
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
      ...(await serverSideTranslations(locale ?? "en", ["common"], null, [
        "en",
        "vi-VN",
      ])),
      newGameSlides,
    },
    revalidate: false,
  };
};
