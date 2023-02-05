import React from "react";
import PropTypes from "prop-types";
import {getFeatureSlides, getproductBySlug} from "@/libs/api";

function Page({product}) {
  const {brief, name} = product.attributes;
  return (
    <div>
      <h1>{name}</h1>
      <p>{brief}</p>
    </div>
  );
}

Page.propTypes = {};

export async function getStaticProps({params}) {
  console.log("params :", params);
  const product = await getproductBySlug(params.slug);
  console.log("product :", product);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const productSlug = await getFeatureSlides();

  return {
    paths: productSlug.map((product) => `/${product.attributes.slug}`),
    fallback: "blocking",
  };
}
export default Page;
