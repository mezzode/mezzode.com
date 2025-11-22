import { useEffect, useCallback } from "react";
import Nameplate from "./Nameplate";
import styles from "./App.module.css";
import Grid from "./Grid";
import Schemer, { schemeSlice, type Mode } from "./Schemer";
import { type RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const updateMode = (mode: Mode) =>
    dispatch(schemeSlice.actions.setMode(mode));

  const handleModeChange = useCallback(
    (e: MediaQueryListEvent) => {
      updateMode(e.matches ? "dark" : "light");
    },
    [updateMode]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleModeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleModeChange);
    };
  }, [handleModeChange]);

  const onColorChange = (primaryColor: string, secondaryColor: string) => {
    dispatch(
      schemeSlice.actions.setColors({
        primaryColor,
        secondaryColor,
      })
    );
  };

  const { primaryColor, secondaryColor, mode } = state;

  return (
    <>
      <div className={styles.content}>
        <Nameplate alignment="right" {...{ mode, updateMode }} />
      </div>
      <Grid {...{ primaryColor, secondaryColor }} />
      <Schemer
        {...{
          primaryColor,
          secondaryColor,
          onColorChange,
        }}
      />
    </>
  );
}

export default App;
