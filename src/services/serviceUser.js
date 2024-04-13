import axios from "axios";

const URL_BACKEND = "http://127.0.0.1:8000/api/";
export const loginUser = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${URL_BACKEND}users/login/`,
      {
        username: email,
        password: password,
      },
      config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${URL_BACKEND}users/register/`, {
      name: name,
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDetailsUser = async (id, token) => {
  console.log("id", id, token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`${URL_BACKEND}users/${id}/`, config);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateUser = async (name, email, password, token) => {
  console.log(name, email, password, token);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `${URL_BACKEND}users/profile/update/`,
      {
        name: name,
        email: email,
        password: password,
      },
      config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
