import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "../listener";

const initialMode =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export type Mode = "light" | "dark";

const initialPrimaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--primary-color");
const initialSecondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--secondary-color");

const schemeSlice = createSlice({
  name: "scheme",
  initialState: {
    mode: initialMode as Mode,
    primaryColor: initialPrimaryColor,
    secondaryColor: initialSecondaryColor,
  },
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      if (action.payload === "dark") {
        state.primaryColor = "var(--light)";
        state.secondaryColor = "var(--dark)";
      } else if (action.payload === "light") {
        state.primaryColor = "var(--dark)";
        state.secondaryColor = "var(--light)";
      } else {
        throw new Error("Invalid mode");
      }
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload;
    },
  },
});

startAppListening({
  predicate: (_action, currentState, originalState) =>
    currentState.primaryColor !== originalState.primaryColor,
  effect: (_action, listenerApi) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      listenerApi.getState().primaryColor
    );
  },
});

startAppListening({
  predicate: (_action, currentState, originalState) =>
    currentState.secondaryColor !== originalState.secondaryColor,
  effect: (_action, listenerApi) => {
    document.documentElement.style.setProperty(
      "--secondary-color",
      listenerApi.getState().secondaryColor
    );
  },
});

export default schemeSlice;
