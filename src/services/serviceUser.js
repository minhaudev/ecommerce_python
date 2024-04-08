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
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  try {
    const res = await axios.post(
      `${URL_BACKEND}users/register/`,
      {
        name: name,
        email: email,
        password: password,
      }
      // config
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
