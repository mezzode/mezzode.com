import { useCallback } from "react";
import styles from "./Schemer.module.css";

interface Props {
  primaryColor: string;
  secondaryColor: string;
  onColorChange: (primary: string, secondary: string) => void;
}

function Schemer({ primaryColor, secondaryColor, onColorChange }: Props) {
  const handlePrimaryColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onColorChange(e.target.value, secondaryColor);
    },
    [onColorChange, secondaryColor]
  );

  const handleSecondaryColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onColorChange(primaryColor, e.target.value);
    },
    [onColorChange, primaryColor]
  );

  return (
    <div className={styles.container}>
      <label htmlFor="primary-color-picker">Primary Color:</label>
      <input
        type="text"
        id="primary-color-picker"
        value={primaryColor}
        onChange={handlePrimaryColorChange}
        className={styles.field}
      />
      <label htmlFor="secondary-color-picker">Secondary Color:</label>
      <input
        type="text"
        id="secondary-color-picker"
        value={secondaryColor}
        onChange={handleSecondaryColorChange}
        className={styles.field}
      />
    </div>
  );
}

export default Schemer;
