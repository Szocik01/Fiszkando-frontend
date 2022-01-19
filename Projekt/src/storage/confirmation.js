import { createSlice } from "@reduxjs/toolkit";

const confirmation = createSlice({
  name: "confirmation",
  initialState: {
    message: "",
    confirmationHandler: () => {},
    isVisible: false,
    body: {},
  },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    setHandler(state, action) {
      state.confirmationHandler = action.payload;
    },
    setBody(state, action) {
      state.body = action.payload;
    },
    setOn(state) {
      state.isVisible = true;
    },
    setOff(state) {
      state.isVisible = false;
    },
  },
});

export default confirmation;
export const confirmationActions = confirmation.actions;
