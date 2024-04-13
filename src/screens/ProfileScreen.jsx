import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import * as serviceUser from "../services/serviceUser";
import * as serviceOrder from "../services/serviceOrder";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";
function ProfileScreen() {
  const [dataOrder, setDataOder] = useState([]);
  console.log(dataOrder);
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

  const orders = async (token) => {
    const res = await serviceOrder.getMyOrders(token);
    setDataOder(res);
  };
  useEffect(() => {
    orders(userInfo.token);
  }, []);
  return (
    <Row>
      <Col md={3}>
        <h2>USER PROFILE</h2>

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
      </Col>
      <Col md={9}>
        <h2>MY ORDERS</h2>
        <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {dataOrder?.map((order) => (
              <tr>
                <td>{moment(order.createdAt).format("YYYY-MM-DD")}</td>

                <td>{order.paymentMethod}</td>

                <td>{order.totalPrice}</td>
                <td>
                  {order.issPaid ? (
                    moment(order.paidAt).format("YYYY-MM-DD")
                  ) : (
                    <div style={{ color: "red" }}>unpaid</div>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    moment(order.paidAt).format("YYYY-MM-DD")
                  ) : (
                    <div style={{ color: "green" }}>picking up goods</div>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
