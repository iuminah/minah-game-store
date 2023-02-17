import ProductCard from "@/components/card/ProductCard";
import NewGameSlide from "@/components/feature-slide/NewGameSlide";
import NewReleases from "@/components/sections/NewReleases";
import {getNewGameSlide} from "@/libs/api";
import {Button} from "antd";

export default function Home({newGameSlides}) {
  return (
    <>
      <div>
        <NewGameSlide newGameSlides={newGameSlides} />
        {/* <div className="space-y-6">
          <NewReleases NewReleases={newGameSlides} />
        </div> */}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const newGameSlides = (await getNewGameSlide()) || {};

  return {
    props: {
      newGameSlides,
    },
    revalidate: true,
  };
};
