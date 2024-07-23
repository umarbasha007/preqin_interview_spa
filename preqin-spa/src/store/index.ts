import { configureStore } from "@reduxjs/toolkit";
import investorsReducer from "./investorsSlice";

export const store = configureStore({
  reducer: {
    investors: investorsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
