import styles from "./Icon.module.css";
import icons from "bootstrap-icons/bootstrap-icons.svg";

export default function Icon({
  icon,
  href,
  onclick,
  label,
}: {
  icon: string;
  /** Label for accessibility */
  label: string;
  href?: string;
  onclick?: () => void;
}) {
  const svg = (
    <svg
      className="bi"
      width="32"
      height="32"
      fill="currentColor"
      aria-label={label}
    >
      <use href={`${icons}#${icon}`} />
    </svg>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {svg}
      </a>
    );
  } else if (onclick) {
    return (
      <button
        type="button"
        className={styles.iconButton} // Change to named imports
        aria-label={label}
        onClick={onclick}
      >
        {svg}
      </button>
    );
  } else {
    return svg;
  }
}
