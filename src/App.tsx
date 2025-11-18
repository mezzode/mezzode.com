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

  return (
    <div className={styles.app}>
      <Nameplate alignment="right" />
      <Grid color={primaryColor} />
    </div>
  );
}

export default App;
