import ProductCard from "@/components/card/ProductCard";
import NewGameSlide from "@/components/feature-slide/NewGameSlide";
import NewReleases from "@/components/sections/NewReleases";
import {getNewGameSlide} from "@/libs/api";

export default function Home({newGameSlides}) {
  return (
    <>
      <div className="space-y-4">
        <NewGameSlide newGameSlides={newGameSlides} />
        <div className="space-y-6">
          <NewReleases NewReleases={newGameSlides} />
          <NewReleases NewReleases={newGameSlides} />
          <NewReleases NewReleases={newGameSlides} />
          <NewReleases NewReleases={newGameSlides} />
          <h2>Other Content</h2>
        </div>
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
