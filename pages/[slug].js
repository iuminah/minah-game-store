import React from "react";
import PropTypes from "prop-types";
import {getProductBySlug, getProducts} from "@/libs/api";
import {fixContent} from "@/libs/ultis";

function Page({product}) {
  const {name, description} = product;

  const fixedContent = fixContent(description);
  return (
    <div className="container mx-auto px-8">
      <div dangerouslySetInnerHTML={{__html: fixedContent}} />
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
