import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import * as serviceUser from "../services/serviceUser";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";
import Message from "../components/Message";

function RegisterScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const redirect = "/login";

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        setLoading(true);
        await serviceUser.registerUser(name, email, password);
        setLoading(false);
        navigate(redirect);
        toast.success("Registration Successful!", { transition: Zoom });
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
      toast.error(error.detail, { transition: Zoom });
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default RegisterScreen;
