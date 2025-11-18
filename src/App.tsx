import Nameplate from "./Nameplate";
import styles from "./App.module.css";
import Grid from "./Grid";

function App() {
  return (
    <div className={styles.app}>
      <Nameplate alignment="right" />
      <Grid />
    </div>
  );
}

export default App;
