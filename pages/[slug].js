import React from "react";
import PropTypes from "prop-types";
import {getProductBySlug, getProducts} from "@/libs/api";
import {fixContent} from "@/libs/ultis";

function Page({product}) {
  const {name, description} = product;

  const fixedContent = fixContent(description);
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div
          className="col-span-1 lg:col-span-3 post-content"
          dangerouslySetInnerHTML={{__html: fixedContent}}
        />
      </div>
    </div>
  );
}

Page.propTypes = {};

export async function getStaticProps({params}) {
  const product = await getProductBySlug(params.slug);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const productSlug = await getProducts();

  return {
    paths: productSlug.map((product) => `/${product.attributes.slug}`),
    fallback: "blocking",
  };
}
export default Page;
