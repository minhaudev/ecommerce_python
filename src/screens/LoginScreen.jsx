import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as serviceUser from "../services/serviceUser";
import { toast, Zoom } from "react-toastify";
import { setUser } from "../store/slices/userSlice";
import Loading from "../components/Loading";
const LoginScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  // const dataUser = useSelector((state) => state.users.users);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await serviceUser.loginUser(email, password);

      if (res) {
        dispatch(setUser(res));
        navigate("/");
        toast.success(" Login Successful!", {
          transition: Zoom,
        });
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.detail, {
        transition: Zoom,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <FormContainer>
          <h1>Sign In</h1>

          <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?
              <Link to={`/register`}>Register</Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </div>
  );
};

export default LoginScreen;
