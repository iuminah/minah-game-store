import NewGameSlide from "@/components/feature-slide/NewGameSlide";
import {getNewGameSlide} from "@/libs/api";

export default function Home({newGameSlides}) {
  return (
    <>
      <div>
        <NewGameSlide newGameSlides={newGameSlides} />
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
