import { useState } from "react";
import clsx from "clsx";
import styles from "./Nameplate.module.css";

type Alignment = "left" | "center" | "right";

interface Props {
  alignment: Alignment;
  mode: "light" | "dark";
}

function Nameplate({ alignment, mode }: Props) {
  const [showAlt, setShowAlt] = useState<boolean>(false);
  return (
    <div className={clsx(styles.container, styles[alignment])}>
      <div
        className={clsx(styles.nameplate, {
          [styles.alt]: showAlt,
        })}
        onClick={() => setShowAlt(!showAlt)}
      >
        {showAlt ? "Ash Bacal" : "mezzode"}
      </div>
      <Menu {...{ alignment, mode }} />
    </div>
  );
}

function Menu({
  alignment,
  mode,
}: {
  alignment: Alignment;
  mode: "light" | "dark";
}) {
  return (
    <div className={clsx(styles.menu, styles[alignment])}>
      <Icon icon="envelope" href="mailto:mezzode@mezzode.com" />
      <Icon icon="github" href="https://github.com/mezzode" />
      <Icon icon="linkedin" href="https://www.linkedin.com/in/mezzode/" />
      <Icon icon={mode === "dark" ? "sun" : "moon"} />
    </div>
  );
}

function Icon({ icon, href }: { icon: string; href?: string }) {
  const svg = (
    <svg className="bi" width="32" height="32" fill="currentColor">
      <use href={`node_modules/bootstrap-icons/bootstrap-icons.svg#${icon}`} />
    </svg>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {svg}
      </a>
    );
  } else {
    return svg;
  }
}

export default Nameplate;
