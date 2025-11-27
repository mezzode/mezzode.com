import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "../listener";

const initialMode =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export type Mode = "light" | "dark" | "custom";

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
      }
    },
    setColors: (
      state,
      action: PayloadAction<{ primaryColor?: string; secondaryColor?: string }>
    ) => {
      const { primaryColor, secondaryColor } = action.payload;
      state.mode = "custom";
      if (primaryColor !== undefined) {
        state.primaryColor = primaryColor;
      }
      if (secondaryColor !== undefined) {
        state.secondaryColor = secondaryColor;
      }
    },
  },
});

startAppListening({
  predicate: (_action, currentState, originalState) =>
    currentState.scheme.primaryColor !== originalState.scheme.primaryColor,
  effect: (_action, listenerApi) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      listenerApi.getState().scheme.primaryColor
    );
  },
});

startAppListening({
  predicate: (_action, currentState, originalState) =>
    currentState.scheme.secondaryColor !== originalState.scheme.secondaryColor,
  effect: (_action, listenerApi) => {
    document.documentElement.style.setProperty(
      "--secondary-color",
      listenerApi.getState().scheme.secondaryColor
    );
  },
});

export default schemeSlice;
