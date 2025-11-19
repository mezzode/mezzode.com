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
  /**
   * Wrapper to update CSS properties as well when setting mode
   */
  const updateMode = useCallback(
    (mode: Mode) => {
      setMode(mode);
      document.documentElement.style.setProperty(
        "--primary-color",
        mode === "dark" ? "var(--light)" : "var(--dark)"
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        mode === "dark" ? "var(--dark)" : "var(--light)"
      );
    },
    [setMode]
  );

  const handleModeChange = useCallback(
    (e: MediaQueryListEvent) => updateMode(e.matches ? "dark" : "light"),
    [updateMode]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleModeChange);
    return () => mediaQuery.removeEventListener("change", handleModeChange);
  }, [handleModeChange]);

  return (
    <>
      <div className={styles.content}>
        <Nameplate alignment="right" {...{ mode, updateMode }} />
      </div>
      <Grid {...{ primaryColor, secondaryColor }} />
    </>
  );
}

export default App;
