import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as serviceUser from "../services/serviceUser";
import { getUserList } from "../store/slices/userSlice";
import { LinkContainer } from "react-router-bootstrap";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";
import Message from "../components/Message";
function userListScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.userInfo);
  const tokenUser = user.token;
  const userList = useSelector((state) => state.users.userList);

  useEffect(() => {
    getUsers(tokenUser);
  }, [user]);
  const getUsers = async (token) => {
    setIsLoading(true);
    const res = await serviceUser.getUsers(token);
    setIsLoading(false);
    dispatch(getUserList(res));
  };
  const handlerRemoveUser = async (id) => {
    try {
      setIsLoading(true);
      await serviceUser.deleteUser(id, tokenUser);
      setIsLoading(false);
      const updatedUserList = userList.filter((user) => user._id !== id);
      dispatch(getUserList(updatedUserList));

      toast.success(` Delete Successful!`, {
        transition: Zoom,
      });
    } catch (error) {
      toast.error(`User is not defined!`, {
        transition: Zoom,
      });
    }
  };
  return (
    <>
      <h2>List User</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm " variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => {
                      handlerRemoveUser(user._id);
                    }}
                    className="btn-sm mx-2"
                    variant="danger"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default userListScreen;
