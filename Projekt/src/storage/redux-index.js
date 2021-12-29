import { configureStore, createSlice } from "@reduxjs/toolkit";
import informationBoxManager from "./information-box";
import confirmation from "./confirmation";

const sidebarPositionSlice = createSlice({
  name: "sidebarPosition",
  initialState: { currentPosition: 0, hoverPosition: 0 },
  reducers: {
    hoverPositionChange(state, action) {
      state.hoverPosition = action.payload;
    },
    pagePositionChange(state, action) {
      state.currentPosition = action.payload;
      state.hoverPosition = action.payload;
    },
    onLeavePositionChange(state) {
      state.hoverPosition = state.currentPosition;
    },
  },
});

const AuthIdentificationInfo = createSlice({
  name: "autoIndentification",
  initialState: {
    uid: "",
    token: "",
    rememberToken: "",
    isHeadAdmin: false,
    permissions: [],
  },
  reducers: {
    IndetificationShow(state, action) {
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.rememberToken = action.payload.rememberToken;
      if (action.payload.permissions) {
        state.isHeadAdmin = action.payload.permissions.isHeadAdmin;
        state.permissions = action.payload.permissions.permissionsArray;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    sidebarPosition: sidebarPositionSlice.reducer,
    autoIndentification: AuthIdentificationInfo.reducer,
    informationBoxManager: informationBoxManager.reducer,
    confirmation: confirmation.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const positionActions = sidebarPositionSlice.actions;
export const Authoindenty = AuthIdentificationInfo.actions;
