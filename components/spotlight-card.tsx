"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import styles from "./spotlight-card.module.css";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

type SpotlightStyle = CSSProperties & Record<`--${string}`, string>;

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const element = divRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    element.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <section
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={[styles.spotlightCard, className].filter(Boolean).join(" ")}
      style={{ "--spotlight-color": spotlightColor } as SpotlightStyle}
    >
      <div className={styles.spotlightContent}>{children}</div>
    </section>
  );
}
