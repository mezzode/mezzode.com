import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import schemeSlice from "./Schemer/schemeSlice";

export const listener = createListenerMiddleware<RootState>();

listener.startListening({
  predicate: (_action, currentState, originalState) =>
    currentState.primaryColor !== originalState.primaryColor,
  effect: (_action, listenerApi) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      listenerApi.getState().primaryColor
    );
  },
});

listener.startListening({
  predicate: (_action, currentState, originalState) =>
    currentState.secondaryColor !== originalState.secondaryColor,
  effect: (_action, listenerApi) => {
    document.documentElement.style.setProperty(
      "--secondary-color",
      listenerApi.getState().secondaryColor
    );
  },
});

const store = configureStore({
  reducer: schemeSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
