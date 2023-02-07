import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  p,
} from "@material-tailwind/react";

function ProductCard(props) {
  return (
    <Card className="w-80">
      <CardHeader color="blue" className="relative h-36">
        <img
          src="/img/blog.jpg"
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <p variant="h5" className="mb-2">
          Cozy 5 Stars Apartment
        </p>
        <p>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main night life in
          Barcelona.
        </p>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <p variant="small">$899/night</p>
        <p variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Barcelona, Spain
        </p>
      </CardFooter>
    </Card>
  );
}

ProductCard.propTypes = {};

export default ProductCard;
