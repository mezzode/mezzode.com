import { useState } from "react";
import styles from "./Nameplate.module.css";

const Nameplate = () => {
  const [showAlt, setShowAlt] = useState<boolean>(false);
  return (
    <div className={styles.nameplate} onClick={() => setShowAlt(!showAlt)}>
      {showAlt ? "Ash Bacal" : "mezzode"}
    </div>
  );
};
export default Nameplate;
