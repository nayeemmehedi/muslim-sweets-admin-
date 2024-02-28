import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: "",
    status: "",
    passwordMatch: false,
  },
};

export const loginSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loginAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAuth } = loginSlice.actions;

export default loginSlice.reducer;
