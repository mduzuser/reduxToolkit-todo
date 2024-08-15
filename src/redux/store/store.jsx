import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../slice/todosSlice";

const store = configureStore({
    reducer:{
      todo: todosSlice
    }
})

export default store;