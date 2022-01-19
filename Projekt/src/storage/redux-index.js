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

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    price: 0,
  },
  reducers: {
    addToBasket(state, action) {
      state.items.push(action.payload);
      state.price = +state.items
        .reduce((total, currentValue) => {
          return total + currentValue.price;
        }, 0)
        .toFixed(2);
    },
    removeFromBasket(state, action) {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload;
      });
      state.price = +state.items
        .reduce((total, currentValue) => {
          return total + currentValue.price;
        }, 0)
        .toFixed(2);
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
      state.idCurse = action.payload.idCurse;
      if (action.payload.permissions) {
        state.isHeadAdmin = action.payload.permissions.isHeadAdmin;
        state.permissions = action.payload.permissions.permissionArray;
      }
    },
  },
});

const SelectedCourse = createSlice({
  name: "selectedCourse",
  initialState: {
    id: "",
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload.id;
      action.payload.cb();
    },
    fetchCourseFromCookies(state, action) {
      const cookies = document.cookie.split(";");
      let index = -1;
      cookies.forEach((c, i) => {
        const include = c.includes("courseId");
        if (include) {
          index = i;
        }
      });

      if (index > -1) {
        const id = cookies[index].split("=")[1];
        state.id = id;
        action.payload.success();
      } else {
        action.payload.failure();
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
    selectedCourse: SelectedCourse.reducer,
    basket: basketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const positionActions = sidebarPositionSlice.actions;
export const Authoindenty = AuthIdentificationInfo.actions;
export const SelectedCourseActions = SelectedCourse.actions;
export const basketActions = basketSlice.actions;
