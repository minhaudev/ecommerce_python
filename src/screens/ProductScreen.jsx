import React, { useEffect, useState } from "react";
// import products from "../products";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import * as serviceProduct from "../services/serviceProduct";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsProduct } from "../store/slices/productSlice";
import { cartAddItem } from "../store/slices/cartSlice";
import Loading from "../components/Loading";
function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pDetails, setPDetails] = useState({});
  const product = useSelector((state) => state.products.productDetails);

  const fetchProductDetails = async (productId) => {
    try {
      setIsLoading(true);
      const res = await serviceProduct.getProductDetails(productId);
      setPDetails(res);
      dispatch(setDetailsProduct(res));
      setIsLoading(false);
      return res;
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);
  const addToCartHandler = () => {
    dispatch(cartAddItem({ id, qty, pDetails }));
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loading />
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={`http://127.0.0.1:8000/${product?.image}`}
              // alt={product.image}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  text={`${product?.numReviews} reviews`}
                  value={product?.rating}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    disabled={product?.countInStock === 0}
                    className="btn-block size-auto w-100"
                    type="button"
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
