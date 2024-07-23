import { configureStore } from "@reduxjs/toolkit";
import investorsReducer from "./investorsSlice";
import { apiSlice } from "../services/apiSlice";

export const store = configureStore({
  reducer: {
    investors: investorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
