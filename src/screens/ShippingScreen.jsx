import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
function ShippingScreen() {
  const shipping = useSelector((state) => state.cart.shipping);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shipping?.address);
  const [city, setCity] = useState(shipping?.city);
  const [postalCode, setPostalCode] = useState(shipping?.postalCode);
  const [country, setCountry] = useState(shipping?.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h2>SHIPPING</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Confirm Password"
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="city" className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="postalCode" className="mb-3">
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter PostalCode"
              value={postalCode ? postalCode : ""}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="country" className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            CONTINUE
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ShippingScreen;
