import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "ducks/auth";

export default configureStore({
  reducer: authReducer,
  middleware: [...getDefaultMiddleware()],
});
