import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";
import Message from "../components/Message";
import * as serviceProduct from "../services/serviceProduct";
import ConfirmToast from "../components/ConfirmToast ";
import { setProduct } from "../store/slices/productSlice";
function ProductListScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const productList = useSelector((state) => state.products.products);
  console.log("productList", productList);
  const user = useSelector((state) => state.users.userInfo);

  const handlerRemoveProduct = async (id) => {
    const handleConfirm = async () => {
      const updatedProductList = productList.filter((item) => item._id !== id);
      dispatch(setProduct(updatedProductList));
      await serviceProduct.deleteProduct(id, user.token);
    };

    toast.dark(
      <ConfirmToast onConfirm={handleConfirm} onClose={toast.dismiss} />,
      {
        position: "top-center",
        transition: Zoom,
      }
    );
  };

  const createProductHandler = async () => {
    const res = await serviceProduct.createProduct(user.token);
    const updatedProductList = [...productList, res];
    dispatch(setProduct(updatedProductList));
    toast.success("Product create successfully!");
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Product List</h2>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loading />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>pric</th>
              <th>category</th>
              <th>brand</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.image}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className="btn-sm " variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => {
                      handlerRemoveProduct(product._id);
                    }}
                    className="btn-sm "
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

export default ProductListScreen;
