import { createSlice } from "@reduxjs/toolkit";
const initialStateUser = {
  userInfo: [],
  userDetails: {},
  userList: [],
  userUpdate: {},
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
    getUserList: (state, action) => {
      state.userList = action.payload;
    },
    getUserUpdate: (state, action) => {
      state.userUpdate = action.payload;
    },
  },
});

export const { setUser, logout, getDetailsUser, getUserList, getUserUpdate } =
  userSlice.actions;
export default userSlice.reducer;
