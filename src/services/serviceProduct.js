import axios from "axios";
const URL_BACKEND = "http://127.0.0.1:8000/api/";
export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${URL_BACKEND}products/`);
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
