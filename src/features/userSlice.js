import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "",
  address: "",
  email: "",
  phone: "",
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      debugger;
      console.log("action.payload", action.payload);
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.userId = action.payload.userId;
    },
    resetUserData: (state) => {
      state.name = "";
      state.address = "";
      state.email = "";
      state.phone = "";
      state.userId = "";
    },
  },
});

export const { setUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
