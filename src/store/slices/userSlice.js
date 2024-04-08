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
      // localStorage.removeItem("persist:root");
      localStorage.removeItem("users");
    },
    // signUp: (state, action) => {
    //   state.userInfo = action.payload;
    // },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
