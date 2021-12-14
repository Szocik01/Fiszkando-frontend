import { configureStore, createSlice } from "@reduxjs/toolkit";

const sidebarPositionSlice = createSlice({
  name: "sidebarPosition",
  initialState: { currentPosition: 0, hoverPosition:0 },
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

const AuthIdentificationInfo = createSlice({
  name: "autoIndentification",
  initialState: {uid: '', token: '', expire: '', rememberToken: ''},
  reducers: {
    IndetificationShow(state, action){
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.expire = action.payload.expire;
      state.rememberToken = action.payload.rememberToken;
    }
  }
});


const store = configureStore({ reducer: {sidebarPosition: sidebarPositionSlice.reducer, autoIndentification: AuthIdentificationInfo.reducer, }});

export default store;
export const positionActions=sidebarPositionSlice.actions;
export const Authoindenty = AuthIdentificationInfo.actions;
