import { createSlice } from "@reduxjs/toolkit";

const informationBoxManager = createSlice({
  name: "informationBoxManager",
  initialState: { visible: false, message: "", isError: false },
  reducers: {
    setBox(state, action) {
      state.message = action.payload.message;
      state.isError = !!action.payload.isError;
    },
    toggleVisibility(state) {
      state.visible = !state.visible;
      console.log(state.visible);
    },
  },
});

export const informationBoxManagerActions = informationBoxManager.actions;
export default informationBoxManager;
