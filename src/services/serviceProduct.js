import axios from "axios";
const URL_BACKEND = "http://127.0.0.1:8000/api/";
export const getAllProduct = async (keyword) => {
  console.log("keyword", keyword);
  try {
    const res = await axios.get(`${URL_BACKEND}products/${keyword}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const getProductDetails = async (id) => {
  try {
    const res = await axios.get(`${URL_BACKEND}products/${id}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const createProduct = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(`${URL_BACKEND}products/create/`, {}, config);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateProductAdmin = async (
  id,
  token,
  name,
  price,
  image,
  brand,
  countInStock,
  category,
  description
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `${URL_BACKEND}products/update/${id}/`,
      {
        name: name,
        price: price,
        image: image,
        brand: brand,
        countInStock: countInStock,
        category: category,
        description: description,
      },
      config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(
      `${URL_BACKEND}products/delete/${id}`,
      config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductRated = async () => {
  try {
    const res = await axios.get(`${URL_BACKEND}products/rating/top/`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadProductImage = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
  };
  try {
    const res = await axios.post(
      `${URL_BACKEND}products/upload/`,
      formData,
      config
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
