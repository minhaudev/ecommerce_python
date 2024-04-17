import React, { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as serviceProduct from "../services/serviceProduct";
import { useParams, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { toast, Zoom } from "react-toastify";
import Loading from "../components/Loading";
import { updateProduct } from "../store/slices/productSlice";

function ProductEditScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState(false);
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.users.userInfo);
  const productUpdate = useSelector((state) => state.products.productUpdate);
  const token = user.token;
  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await serviceProduct.updateProductAdmin(
      id,
      token,
      name,
      price,
      image,
      brand,
      countInStock,
      category,
      description
    );

    if (res) {
      dispatch(updateProduct(res));
      navigate("/admin/productlist");
      toast.success(" update user Successful!", {
        transition: Zoom,
      });
    }
  };
  useEffect(() => {
    if (productUpdate?._id == id) {
      setName(productUpdate.name);
      setPrice(productUpdate.price);
      setImage(productUpdate.image);
      setBrand(productUpdate.brand);
      setCategory(productUpdate.category);
      setCountInStock(productUpdate.countInStock);
      setDescription(productUpdate.description);
    }
    console.log(productUpdate.image);
  }, [productUpdate]);
  useEffect(() => {
    getProduct(id);
  }, [id]);
  const getProduct = async (id) => {
    const res = await serviceProduct.getProductDetails(id);
    dispatch(updateProduct(res));
  };

  const uploadFileHandler = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Kiểm tra xem có tệp được chọn hay không
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("product_id", id);
      // setUploading(true);
      console.log(formData, "form data");
      console.log(file);
      try {
        const { data } = await axios.post(
          `http://127.0.0.1:8000/api/products/img/upload/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImage(data);
        toast.success("Image uploaded successfully!", {
          transition: Zoom,
        });
      } catch (error) {
        toast.error("Error uploading image!", {
          transition: Zoom,
        });
      }
    } else {
      // Thông báo cho người dùng biết rằng họ chưa chọn tệp
      toast.error("Please select a file to upload!", {
        transition: Zoom,
      });
    }
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

          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
            />
            {/* <Form.File
              id="image-file"
              label="Choose File"
              custom={true.toString()}
              onChange={uploadFileHandler}
            ></Form.File> */}
          </Form.Group>

          {/* <Form.Group controlId="image" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            />
          </Form.Group> */}

          <Form.Group controlId="brand" className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="brand"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="countInStock" className="mb-3">
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="countInStock"
              placeholder="Enter CountInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="category"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditScreen;
