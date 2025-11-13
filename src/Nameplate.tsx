import { useState } from "react";
import clsx from "clsx";
import styles from "./Nameplate.module.css";

type Alignment = "left" | "center" | "right";

interface Props {
  alignment: Alignment;
}

const Nameplate = ({ alignment }: Props) => {
  const [showAlt, setShowAlt] = useState<boolean>(false);
  return (
    <div
      className={
        clsx(styles.nameplate, styles[alignment], {
          [styles.alt]: showAlt
        })
      }
      onClick={() => setShowAlt(!showAlt)}
    >
      {showAlt ? "Ash Bacal" : "mezzode"}
    </div>
  );
};
export default Nameplate;
