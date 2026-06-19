import { type CSSProperties, type ReactNode } from "react";
import styles from "./glare-hover.module.css";

type GlareHoverProps = {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: CSSProperties;
};

type GlareStyle = CSSProperties & Record<`--${string}`, string | number>;

function hexToRgba(color: string, opacity: number) {
  const hex = color.replace("#", "");

  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = Number.parseInt(hex[0] + hex[0], 16);
    const g = Number.parseInt(hex[1] + hex[1], 16);
    const b = Number.parseInt(hex[2] + hex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return color;
}

export default function GlareHover({
  width = "500px",
  height = "500px",
  background = "#000",
  borderRadius = "10px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style,
}: GlareHoverProps) {
  const glareStyle: GlareStyle = {
    "--gh-width": width,
    "--gh-height": height,
    "--gh-bg": background,
    "--gh-br": borderRadius,
    "--gh-angle": `${glareAngle}deg`,
    "--gh-duration": `${transitionDuration}ms`,
    "--gh-size": `${glareSize}%`,
    "--gh-rgba": hexToRgba(glareColor, glareOpacity),
    "--gh-border": borderColor,
    ...style,
  };

  return (
    <div
      className={[styles.glareHover, playOnce ? styles.playOnce : "", className]
        .filter(Boolean)
        .join(" ")}
      style={glareStyle}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
