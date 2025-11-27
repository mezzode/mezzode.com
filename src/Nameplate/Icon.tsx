import clsx from "clsx";
import styles from "./Icon.module.css";
import icons from "bootstrap-icons/bootstrap-icons.svg";

interface IconProps {
  icon: string;
  /** Label for accessibility */
  label: string;
  href?: string;
  onclick?: () => void;
  active?: boolean;
}

export default function Icon({
  icon,
  href,
  onclick,
  label,
  active,
}: IconProps) {
  const conditionalClasses = { [styles.active]: active };

  const svg = (
    <svg
      className={clsx("bi", conditionalClasses)}
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
        className={clsx(conditionalClasses)}
      >
        {svg}
      </a>
    );
  } else if (onclick) {
    return (
      <button
        type="button"
        className={clsx(styles.iconButton, conditionalClasses)}
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
