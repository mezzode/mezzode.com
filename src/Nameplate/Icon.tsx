import clsx from "clsx";
import styles from "./Icon.module.css";
import icons from "bootstrap-icons/bootstrap-icons.svg";

interface SharedIconProps {
  icon: string;
  /** Label for accessibility */
  label: string;
  active?: boolean;
}

interface PlainIconProps extends SharedIconProps {
  onclick?: never;
  href?: never;
  rel?: never;
}

interface ButtonProps extends SharedIconProps {
  onclick: () => void;
  href?: never;
  rel?: never;
}

interface LinkProps extends SharedIconProps {
  href: string;
  /** Additional `rel` attribute keywords */
  rel?: string[];
  onclick?: never;
}

type IconProps = PlainIconProps | ButtonProps | LinkProps;

export default function Icon({
  icon,
  href,
  onclick,
  label,
  active,
  rel,
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
        rel={`noopener noreferrer ${rel?.join(" ") ?? ""}`}
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
