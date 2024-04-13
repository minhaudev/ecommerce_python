import { createSlice } from "@reduxjs/toolkit";
const initialStateUser = {
  userInfo: [],
  userDetails: {},
  // signUp: {},
};
export const userSlice = createSlice({
  name: "users",
  initialState: initialStateUser,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = [];
      state.userDetails = {};
      localStorage.removeItem("users");
    },
    getDetailsUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUser, logout, getDetailsUser } = userSlice.actions;
export default userSlice.reducer;
