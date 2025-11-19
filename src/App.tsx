import { useState, useEffect, useCallback } from "react";
import Nameplate from "./Nameplate";
import styles from "./App.module.css";
import Grid from "./Grid";
import Schemer from "./Schemer";

const initialMode =
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

function App() {
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor);
  const [secondaryColor, setSecondaryColor] = useState(initialSecondaryColor);

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
      // TODO: also set primaryColor and secondaryColor
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

  const onColorChange = useCallback(
    (newPrimary: string, newSecondary: string) => {
      if (newPrimary !== primaryColor) {
        setPrimaryColor(newPrimary);
        document.documentElement.style.setProperty(
          "--primary-color",
          newPrimary
        );
      }
      if (newSecondary !== secondaryColor) {
        setSecondaryColor(newSecondary);
        document.documentElement.style.setProperty(
          "--secondary-color",
          newSecondary
        );
      }
    },
    [setPrimaryColor, setSecondaryColor, primaryColor, secondaryColor]
  );

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
