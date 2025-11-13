import { useState } from "react";
import clsx from "clsx";
import styles from "./Nameplate.module.css";

type Alignment = "left" | "center" | "right";

interface Props {
  alignment: Alignment;
}

function Nameplate({ alignment }: Props) {
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
      <Menu {...{ alignment }} />
    </div>
  );
}

function Menu({ alignment }: { alignment: Alignment }) {
  return (
    <div className={clsx(styles.menu, styles[alignment])}>
      <Icon icon="envelope" href="mailto:mezzode@mezzode.com" />
      <Icon icon="github" href="https://github.com/mezzode" />
      <Icon icon="linkedin" href="https://www.linkedin.com/in/mezzode/" />
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
