import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="align-items-center">
      <Row className="align-items-center">
        <Col sm={8} className="mr-sm-1 ml-sm-2">
          <Form.Control
            value={keyword}
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col sm={4}>
          <Button type="submit" variant="outline-success" className="p-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
