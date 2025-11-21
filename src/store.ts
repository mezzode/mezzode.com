import {
  configureStore,
  createListenerMiddleware,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialMode =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

type Mode = "light" | "dark";

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
    setDarkMode: (state) => {
      state.mode = "dark";
      state.primaryColor = "var(--light)";
      state.secondaryColor = "var(--dark)";
    },
    setLightMode: (state) => {
      state.mode = "light";
      state.primaryColor = "var(--dark)";
      state.secondaryColor = "var(--light)";
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload;
    },
  },
});

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
