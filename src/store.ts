import { configureStore } from "@reduxjs/toolkit";
import schemeSlice from "./Schemer/schemeSlice";

const store = configureStore({
  reducer: schemeSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
