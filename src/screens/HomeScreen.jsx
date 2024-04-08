import React from "react";
import { Row, Col } from "react-bootstrap";
import * as serviceProduct from "../services/serviceProduct";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../store/slices/productSlice";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
function HomeScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const data = useSelector((state) => state.products.products);
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>latest Products</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <Row>
          {products?.map((product) => {
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
