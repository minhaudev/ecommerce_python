import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import * as serviceUser from "../services/serviceUser";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";

function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.users.userDetails);
  const userInfo = useSelector((state) => state.users.userInfo);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        setIsLoading(true);
        const res = await serviceUser.getDetailsUser("profile", userInfo.token);
        dispatch(getDetailsUser(res));
        setName(res.name);
        setEmail(res.email);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (!userInfo) {
      navigate("/login");
    } else if (!user || !user.name) {
      getDataUser();
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

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
    console.log(name, email, password, confirmPassword);
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const res = await serviceUser.updateUser(
          name,
          email,
          password,
          userInfo.token
        );
        setIsLoading(false);
        toast.success("Profile updated successfully!");
        setMessage("");
        dispatch(getDetailsUser(res));
        // navigate("/");
      } catch (error) {
        setIsLoading(false);
        setMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>USER PROFILE</h2>
        <FormContainer>
          {message && <Message variant="danger">{message}</Message>}
          {isLoading && <Loading />}
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
              <Form.Label>Email Address</Form.Label>
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
              Update
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col md={6}>
        <h2>MY ORDERS</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
