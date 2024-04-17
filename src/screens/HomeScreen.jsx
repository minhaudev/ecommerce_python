import React from "react";
import { Row, Col } from "react-bootstrap";
import * as serviceProduct from "../services/serviceProduct";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../store/slices/productSlice";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let keyword = location.search;
  const dataProduct = useSelector((state) => state.products.products);
  useEffect(() => {
    fetchProducts(keyword);
  }, [keyword]);
  async function fetchProducts(keyword) {
    setIsLoading(true);
    const res = await serviceProduct.getAllProduct(keyword);
    setIsLoading(false);
    dispatch(setProduct(res));
  }
  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1>latest Products</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <Row>
          {dataProduct?.map((product) => {
            return (
              <Col
                key={product?._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="width:100%"
              >
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
