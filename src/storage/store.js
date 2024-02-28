import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux/loginSlice";

export const store = configureStore({
  reducer: {
    counter: loginReducer,
  },
});
