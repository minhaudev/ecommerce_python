import React, { Children, useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailsOrder,
  updateOrderDelivered,
} from "../store/slices/orderSlice";
import * as serviceOrder from "../services/serviceOrder";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { PayPalButton } from "react-paypal-button-v2";
import { createOrder } from "../store/slices/orderSlice";
import { removeItemsOrdered } from "../store/slices/cartSlice";
function OrderScreen() {
  //
  const handlerPlaceOrder = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const userInfo = useSelector((state) => state.users.userInfo);
  const orderDetails = useSelector((state) => state.orders.detailsOrder);
  console.log("orderDetails", orderDetails);
  const {
    user = {},
    shippingAddress = {},
    orderItems = [],
    paymentMethod = "",
  } = orderDetails || {};
  const [sdkReady, setSdkReady] = useState(false);

  const handelOrderCash = async () => {
    await serviceOrder.updateOrderDelivered(id, userInfo.token);
    setIsDelivered(true);
  };
  const handelOrderPaypal = async () => {
    await serviceOrder.updateOrderPay(id, userInfo.token);
    setIsPaid(true);
    dispatch(removeItemsOrdered());
  };
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AcW9IDVB7JczKys4n_m0ve5p7k4nO-6gAMrAC7g1mftRyRlJV8gViD7Uyq0z06R9dcfbphO4DysjnHd9";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (userInfo && id) {
      detailsOrder(id, userInfo.token);
    }
  }, [userInfo, id]);

  const detailsOrder = async (id, token) => {
    try {
      const res = await serviceOrder.getDetailsOrder(id, token);

      dispatch(getDetailsOrder(res));
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (!orderItems.issPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch]);
  const itemsPrice = orderItems
    ? orderItems
        .reduce((acc, item) => (acc += item.price * item.qty), 0)
        .toFixed(2)
    : 0;
  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>ORDER: {orderDetails._id}</h2>
            <p>
              <strong>Name:</strong>
              {""}
              {user?.name}
            </p>
            <p>
              <strong>Email:</strong>
              {""}
              {user?.email}
            </p>
            <p>
              <strong>Shipping:</strong>
              {shippingAddress.address}
            </p>
            {orderDetails?.isDelivered || isDelivered ? (
              <Message variant="success">Delivered On</Message>
            ) : (
              <Message variant="warning">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>PAYMENT METHOD</h2>
            <p>
              <strong>Method:</strong> Payment In {paymentMethod}
            </p>
            {orderDetails.issPaid || isPaid ? (
              <Message variant="success">Paid On</Message>
            ) : (
              <Message variant="warning">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {orderItems === 0 ? (
              <Message variant="Info">not product items</Message>
            ) : (
              <ListGroup variant="flush">
                {orderItems?.map((item, index) => (
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
                <Col>${orderDetails.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${orderDetails.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${orderDetails.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {paymentMethod === "paypal" && !orderDetails.issPaid && (
              <ListGroup.Item>
                {!sdkReady ? (
                  <Loading />
                ) : (
                  <div>
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      // onSuccess={successPaymentHandler}
                    />
                    <Button
                      onClick={handelOrderPaypal}
                      className="size-auto w-100"
                    >
                      Payment Credit
                    </Button>
                  </div>
                )}
              </ListGroup.Item>
            )}

            {paymentMethod === "cash" && !orderDetails.isPaid && (
              <ListGroup.Item>
                <Button onClick={handelOrderCash} className="size-auto w-100">
                  Order
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderScreen;
