import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";

const listener = createListenerMiddleware();

export default listener;

export const startAppListening = listener.startListening.withTypes<
  RootState,
  AppDispatch
>();