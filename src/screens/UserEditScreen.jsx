import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serviceUser from "../services/serviceUser";
import { useParams, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";
import { getUserUpdate } from "../store/slices/userSlice";
function UserEditScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.users.userInfo);
  const userUpdate = useSelector((state) => state.users.userUpdate);
  const token = user.token;
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await serviceUser.updateUserById(
      id,
      name,
      email,
      isAdmin,
      token
    );
    if (res) {
      navigate("/admin/userlist");
      toast.success(" update user Successful!", {
        transition: Zoom,
      });
    }
  };
  useEffect(() => {
    if (userUpdate._id == id) {
      setName(userUpdate.name);
      setEmail(userUpdate.email);
      setIsAdmin(userUpdate.isAdmin);
    }
  }, [userUpdate]);
  useEffect(() => {
    getUser(id, token);
  }, [token, id]);
  const getUser = async (id, token) => {
    const res = await serviceUser.getUserById(id, token);
    dispatch(getUserUpdate(res));
  };
  return (
    <>
      <FormContainer>
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
          <Form.Group controlId="isAdmin" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default UserEditScreen;
