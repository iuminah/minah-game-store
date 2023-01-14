import Menu from "@/components/navbar/Menu";
import {getProduct} from "@/libs/api";
import {Typography} from "@material-tailwind/react";
import Image from "next/image";

export default function Home({productList}) {
  console.log("productList :", productList.attributes.FeatureCover);
  const list = productList?.attributes?.FeatureCover || null;
  return (
    <div>
      <Menu />
      <div className="containerd">
        <div>
          {list ? (
            list.map((item, key) => (
              <div
                key={key}
                className="flex flex-col justify-center items-center"
              >
                <Typography>{item.name}</Typography>
                <Image
                  src={`https://minah-game-cms-uppyx.appengine.bfcplatform.vn${item.image.data.attributes.url}`}
                  width="300"
                  height="500"
                  alt={item.name}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const productList = (await getProduct()) || {};

  return {
    props: {
      productList,
    },
  };
};
