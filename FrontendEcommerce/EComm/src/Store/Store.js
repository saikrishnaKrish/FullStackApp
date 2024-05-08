import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

const store = configureStore({
   reducer:{
    cartReducer:CartSlice.reducer
   }
})

export default store