import { useCallback, useState } from "react";
import clsx from "clsx";
import Icon from "./Icon";
import styles from "./Nameplate.module.css";
import Schemer from "../Schemer";

type Alignment = "left" | "center" | "right";
type Mode = "light" | "dark";

interface Props {
  alignment: Alignment;
  mode: Mode;
  updateMode: (mode: Mode) => void;
}

function Nameplate({ alignment, mode, updateMode }: Props) {
  const [showAlt, setShowAlt] = useState<boolean>(false);
  return (
    <div className={clsx(styles.container, styles[alignment])}>
      <button
        className={clsx(styles.nameplate, styles[alignment], {
          [styles.alt]: showAlt,
        })}
        onClick={() => {
          setShowAlt(!showAlt);
        }}
      >
        {showAlt ? "Ash Bacal" : "mezzode"}
      </button>
      <Menu {...{ alignment, mode, updateMode }} />
    </div>
  );
}

function Menu({
  alignment,
  mode,
  updateMode,
}: {
  alignment: Alignment;
  mode: Mode;
  updateMode: (mode: Mode) => void;
}) {
  const [showSchemer, setShowSchemer] = useState<boolean>(false);
  const toggleSchemer = useCallback(() => {
    setShowSchemer(!showSchemer);
  }, [showSchemer]);

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
        <Icon label="Customize Colors" icon="palette" onclick={toggleSchemer} />
      </div>
      {showSocials && <Socials {...{ alignment }} />}
      {showSchemer && <Schemer />}
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

export default Nameplate;
