import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const listener = createListenerMiddleware<RootState>();

export default listener;
