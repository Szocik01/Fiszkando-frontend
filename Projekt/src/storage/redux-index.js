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
  name:"basket",
  initialState: {
    items:[],
    price:0
  },
  reducers: {
    addToBasket(state,action)
    {
      state.items.push(action.payload);
      state.price = +state.items.reduce((total,currentValue)=>{
        return total + currentValue.price; 
      },0).toFixed(2);
      state.items.forEach((item,index)=>{
        document.cookie = `basketItem${index}=${JSON.stringify(item)};`
      })
    },
    removeFromBasket(state,action)
    {
      state.items = state.items.filter((item)=>{
        return item.id !== action.payload;
      });
      state.price = +state.items.reduce((total,currentValue)=>{
        return total + currentValue.price; 
      },0).toFixed(2); 
      const cookieArray=document.cookie.split(";")
      const filteredArray=cookieArray.filter((item)=>{
        return item.split("=")[0].includes("basketItem");
      });
      filteredArray.forEach((item)=>{
        document.cookie=`${item.split("=")[0]}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
      });
      state.items.forEach((item,index)=>{
        document.cookie = `basketItem${index}=${JSON.stringify(item)};`
      });
    },
    getBasketFromCookies(state)
    {
      const cookiesArray=document.cookie.split(";");
      const filteredArray = cookiesArray.filter((item)=>{
        return item.split("=")[0].includes("basketItem");
      });
      filteredArray.forEach((item)=>{
        state.items.push(JSON.parse(item.split("=")[1]))
      });
      state.price = +state.items.reduce((total,currentValue)=>{
        return total + currentValue.price; 
      },0).toFixed(2);
    }
  }
})

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

const AuthoCurseId = createSlice({
  name: 'autoCurseId',
  initialState:{
    id: ""
  },
  reducers:{
    IndetificationCurseId(state, action){
      state.id = action.payload.id
    }
  }
});

const store = configureStore({
  reducer: {
    sidebarPosition: sidebarPositionSlice.reducer,
    autoIndentification: AuthIdentificationInfo.reducer,
    informationBoxManager: informationBoxManager.reducer,
    confirmation: confirmation.reducer,
    autoCurseId: AuthoCurseId.reducer,
    basket: basketSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const positionActions = sidebarPositionSlice.actions;
export const Authoindenty = AuthIdentificationInfo.actions;
export const AuthCurseId = AuthoCurseId.actions;
export const basketActions = basketSlice.actions;
