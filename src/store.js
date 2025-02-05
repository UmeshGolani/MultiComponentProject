import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import uiReducer from "./features/uiSlice";


const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiReducer,
  },
});

export default store;
