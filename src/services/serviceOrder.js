import axios from "axios";
const URL_BACKEND = "http://127.0.0.1:8000/api/";
export const createOder = async (
  orderItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  token
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.post(
      `${URL_BACKEND}orders/add/`,
      {
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      },
      config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDetailsOrder = async (id, token) => {
  console.log(id, token);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(`${URL_BACKEND}orders/${id}/`, config);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateOrderPay = async (id, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.put(`${URL_BACKEND}orders/${id}/pay/`, {}, config);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateOrderDelivered = async (id, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.put(
      `${URL_BACKEND}orders/${id}/delivered/`,
      {},
      config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
