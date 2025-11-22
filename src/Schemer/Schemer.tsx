import { useCallback } from "react";
import styles from "./Schemer.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import schemeSlice from "./schemeSlice";

function Schemer() {
  const dispatch = useDispatch();
  const scheme = useSelector((state: RootState) => state.scheme);
  const { primaryColor, secondaryColor } = scheme;

  const handlePrimaryColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        schemeSlice.actions.setColors({
          primaryColor: e.target.value,
          secondaryColor,
        })
      );
    },
    [dispatch, secondaryColor]
  );

  const handleSecondaryColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        schemeSlice.actions.setColors({
          primaryColor,
          secondaryColor: e.target.value,
        })
      );
    },
    [dispatch, primaryColor]
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
