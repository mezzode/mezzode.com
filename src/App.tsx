import Nameplate from "./Nameplate";
import styles from "./App.module.css";
import Grid from "./Grid";

function App() {
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--secondary-color");

  // TODO: Theme toggle and customizer

  return (
    <>
      <div className={styles.content}>
        <Nameplate alignment="right" />
      </div>
      <Grid color={primaryColor} />
    </>
  );
}

export default App;
