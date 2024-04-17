import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/slices/orderSlice";
import { removeItemsOrdered } from "../store/slices/cartSlice";
import * as serviceOrder from "../services/serviceOrder";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shipping, cartItems, paymentMethod } = cart;
  const user = useSelector((state) => state.users.userInfo);
  const itemsPrice = cartItems
    .reduce((acc, item) => (acc += item.price * item.qty), 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice < 100 ? 0 : 10).toFixed(2);
  const taxPrice = Number(0.082 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const handlerPlaceOrder = (e) => {
    e.preventDefault();
    const placeOrder = async (
      cartItems,
      shipping,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      token
    ) => {
      try {
        const res = await serviceOrder.createOder(
          cartItems,
          shipping,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          token
        );

        if (res) {
          dispatch(createOrder(res));
          navigate(`/order/${res._id}`);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    placeOrder(
      cartItems,
      shipping,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user.token
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping:</strong>
                {shipping.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems === 0 ? (
                <Message variant="Info">not product items</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems?.map((item, index) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`http://127.0.0.1:8000/${item?.image}`}
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link className="" to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          <p>
                            {item.qty} x {item.price} = {item.qty * item.price}
                          </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <h2>ORDER SUMMARY</h2>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  disabled={cartItems.length === 0}
                  type="button"
                  className="btn-block w-100"
                  onClick={handlerPlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
