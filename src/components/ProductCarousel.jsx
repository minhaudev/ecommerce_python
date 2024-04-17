import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loading from "./Loading";
import Massage from "./Message";
import * as serviceProduct from "../services/serviceProduct";
import { getProductRating } from "../store/slices/productSlice";
function ProductCarousel() {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.products.productRated);
  console.log("productTopRated", productTopRated);
  useEffect(() => {
    getProductRated();
  }, [dispatch]);
  const getProductRated = async () => {
    const res = await serviceProduct.getProductRated();
    console.log("res", res);
    dispatch(getProductRating(res));
  };
  return (
    <>
      <Carousel pause="hover" className="bg-dark">
        {productTopRated?.map((product) => (
          <Carousel.Item key={product._id} style={{ position: "relative" }}>
            <Link to={`/product/${product._id}`}>
              <h4 className="carousel-h4">
                {product.name} (${product.price})
              </h4>
              <Image
                src={`http://127.0.0.1:8000/${product.image}`}
                alt={product.name}
                fluid
              />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default ProductCarousel;
