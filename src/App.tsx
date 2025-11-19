import { useState, useEffect, useCallback } from "react";
import Nameplate from "./Nameplate";
import styles from "./App.module.css";
import Grid from "./Grid";

const initialMode =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

type Mode = "light" | "dark";

function App() {
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--secondary-color");

  // TODO: Theme toggle and customizer

  const [mode, setMode] = useState<Mode>(initialMode);
  const handleModeChange = useCallback(
    (e: MediaQueryListEvent) => setMode(e.matches ? "dark" : "light"),
    []
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleModeChange);
    return () => mediaQuery.removeEventListener("change", handleModeChange);
  }, [handleModeChange]);

  return (
    <>
      <div className={styles.content}>
        <Nameplate alignment="right" {...{ mode }} />
      </div>
      <Grid {...{ primaryColor, secondaryColor }} />
    </>
  );
}

export default App;
