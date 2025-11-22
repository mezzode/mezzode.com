import { configureStore } from "@reduxjs/toolkit";
import schemeSlice from "./Schemer/schemeSlice";
import listener from "./listener";

const store = configureStore({
  reducer: { scheme: schemeSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
