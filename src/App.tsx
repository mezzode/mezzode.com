import Nameplate from "./Nameplate";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Nameplate alignment="right" />
    </div>
  );
}

export default App;
