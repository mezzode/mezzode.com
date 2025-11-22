import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "../listener";

const initialMode =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export type Mode = "light" | "dark";

const light = getComputedStyle(document.documentElement).getPropertyValue(
  "--light"
);
const dark = getComputedStyle(document.documentElement).getPropertyValue(
  "--dark"
);
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
        state.primaryColor = light;
        state.secondaryColor = dark;
      } else if (action.payload === "light") {
        state.primaryColor = dark;
        state.secondaryColor = light;
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
