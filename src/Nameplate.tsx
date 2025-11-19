import { useCallback, useState } from "react";
import clsx from "clsx";
import styles from "./Nameplate.module.css";
import icons from "bootstrap-icons/bootstrap-icons.svg";

type Alignment = "left" | "center" | "right";

interface Props {
  alignment: Alignment;
  mode: "light" | "dark";
  updateMode: (mode: "light" | "dark") => void;
}

function Nameplate({ alignment, mode, updateMode }: Props) {
  const [showAlt, setShowAlt] = useState<boolean>(false);
  return (
    <div className={clsx(styles.container, styles[alignment])}>
      <button
        className={clsx(styles.nameplate, styles[alignment], {
          [styles.alt]: showAlt,
        })}
        onClick={() => setShowAlt(!showAlt)}
      >
        {showAlt ? "Ash Bacal" : "mezzode"}
      </button>
      <Menu {...{ alignment, mode, updateMode }} />
      {/* TODO: Schemer should live here */}
    </div>
  );
}

function Menu({
  alignment,
  mode,
  updateMode,
}: {
  alignment: Alignment;
  mode: "light" | "dark";
  updateMode: (mode: "light" | "dark") => void;
}) {
  const [showSocials, setShowSocials] = useState<boolean>(false);
  const toggleSocials = useCallback(() => {
    setShowSocials(!showSocials);
  }, [showSocials]);
  const toggleMode = useCallback(() => {
    updateMode(mode === "light" ? "dark" : "light");
  }, [mode, updateMode]);
  return (
    <div>
    <div className={clsx(styles.menu, styles[alignment])}>
      <Icon label="Email" icon="envelope" href="mailto:mezzode@mezzode.com" />
      <Icon label="GitHub" icon="github" href="https://github.com/mezzode" />
      <Icon
        label="LinkedIn"
        icon="linkedin"
        href="https://www.linkedin.com/in/mezzode/"
      />
        <Icon label="Socials" icon="chat" onclick={toggleSocials} />
      <Icon
        label="Theme Toggle"
        icon={mode === "dark" ? "moon" : "sun"}
        onclick={toggleMode}
      />
      {/* TODO: If custom scheme, change mode icon to a reset button */}
      <Icon label="Customize Colors" icon="palette" />
      </div>
      {showSocials && <Socials {...{ alignment }} />}
    </div>
  );
}

function Socials({ alignment }: { alignment: Alignment }) {
  return (
    <div>
      <div className={styles.close}>
        <Icon label="Close Socials" icon="chevron-compact-up" />
      </div>
      <aside>
        Not on social media much, but these are included for completeness as my
        canonical profiles.
      </aside>
      <div className={clsx(styles.menu, styles[alignment])}>
        <Icon
          label="Bluesky"
          icon="bluesky"
          href="https://bsky.app/profile/mezzode.com"
        />
        <Icon
          label="Mastodon"
          icon="mastodon"
          href="https://hachyderm.io/@mezzode"
        />
        <Icon
          label="Twitter (I will never call it X)"
          icon="twitter"
          href="https://twitter.com/_mezzode"
        />
      </div>
    </div>
  );
}

function Icon({
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

export default Nameplate;
