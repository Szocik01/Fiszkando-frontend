import { configureStore, createSlice } from "@reduxjs/toolkit";

const sidebarPositionSlice = createSlice({
  name: "sidebarPosition",
  initialState: { currentPosition: 0, hoverPosition: 0 },
  reducers:{
      hoverPositionChange(state,action)
      {
        state.hoverPosition=action.payload
      },
      pagePositionChange(state,action)
      {
          state.currentPosition=action.payload;
          state.hoverPosition=action.payload;
      },
      onLeavePositionChange(state)
      {
          state.hoverPosition=state.currentPosition;
      }
  }
});



const store = configureStore({ reducer: {sidebarPosition: sidebarPositionSlice.reducer} });

export default store;
export const positionActions=sidebarPositionSlice.actions;