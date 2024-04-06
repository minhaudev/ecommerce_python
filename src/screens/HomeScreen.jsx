import React from "react";
import { Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { setProduct } from "../store/slices/productSlice";
import axios from "axios";
function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
      setProduct(data);
      console.log("data", data);
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>latest Products</h1>
      <Row>
        {products.map((product) => {
          console.log(product._id);
          return (
            <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default HomeScreen;
