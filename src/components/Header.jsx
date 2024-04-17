import React from "react";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.userInfo);
  const user = useSelector((state) => state.users.userDetails);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItem", cartItems);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <header
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
      >
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>IMShop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox style={{ width: "30px" }} />
              <Nav className="me-auto">
                <LinkContainer style={{ position: "relative" }} to="/cart/">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>
                    <div
                      style={{
                        position: "absolute",
                        top: -3,
                        right: "-5px",
                        background: "red",
                        width: "20px",
                        textAlign: "center",
                        color: "white",
                        borderRadius: "50px",
                      }}
                    >
                      {cartItems.length}
                    </div>
                  </Nav.Link>
                </LinkContainer>

                {userInfo.length === 0 ? (
                  <LinkContainer to="/login">
                    <Nav.Link href="#login">
                      <i className="fas fa-user"></i>Login
                    </Nav.Link>
                  </LinkContainer>
                ) : (
                  <NavDropdown
                    title={
                      Object.keys(user).length !== 0 ? user.name : userInfo.name
                    }
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenue">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div style={{ height: "100px" }} />
    </>
  );
}

export default Header;
