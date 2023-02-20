import ProductCard from "@/components/card/ProductCard";
import NewGameSlide from "@/components/feature-slide/NewGameSlide";
import NewReleases from "@/components/sections/NewReleases";
import {getNewGameSlide} from "@/libs/api";
import {Button} from "@mui/material";
// import {Button} from "antd";

export default function Home({newGameSlides}) {
  return (
    <div>
      <Button variant="contained" className="w-full">
        Contained
      </Button>
    </div>
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
