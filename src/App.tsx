import { useEffect, useCallback } from "react";
import Nameplate from "./Nameplate";
import styles from "./App.module.css";
import Grid from "./Grid";
import Schemer, { schemeSlice, type Mode } from "./Schemer";
import { type RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const scheme = useSelector((state: RootState) => state.scheme);

  const updateMode = useCallback(
    (mode: Mode) => dispatch(schemeSlice.actions.setMode(mode)),
    [dispatch]
  );

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

  const { primaryColor, secondaryColor, mode } = scheme;

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
