import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
function PaymentScreen() {
  const shippingAddress = useSelector((state) => state.cart.shipping);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    dispatch(savePaymentMethod(paymentMethod));
    e.preventDefault();
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <CheckoutSteps step1 step2 step3 />
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod("paypal")}
            ></Form.Check>
          </Col>
          <Col className="mt-2">
            <Form.Check
              type="radio"
              label="Payment in cash"
              id="paypal"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod("cash")}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          CONTINUE
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
