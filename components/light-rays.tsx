"use client";

import { type CSSProperties, useEffect, useMemo, useRef } from "react";
import styles from "./light-rays.module.css";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

type RayStyle = CSSProperties & Record<`--${string}`, string | number>;

const origins: Record<RaysOrigin, [string, string]> = {
  "top-center": ["50%", "-12%"],
  "top-left": ["8%", "-10%"],
  "top-right": ["92%", "-10%"],
  right: ["112%", "44%"],
  left: ["-12%", "44%"],
  "bottom-center": ["50%", "112%"],
  "bottom-right": ["92%", "112%"],
  "bottom-left": ["8%", "112%"],
};

function hexToRgb(color: string) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (!match) return "255 255 255";

  return `${Number.parseInt(match[1], 16)} ${Number.parseInt(match[2], 16)} ${Number.parseInt(match[3], 16)}`;
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 1,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = false,
  mouseInfluence = 0.5,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [originX, originY] = origins[raysOrigin];

  const style = useMemo<RayStyle>(
    () => ({
      "--rays-rgb": hexToRgb(raysColor),
      "--rays-speed": Math.max(0.2, raysSpeed),
      "--ray-origin-x": originX,
      "--ray-origin-y": originY,
      "--ray-opacity": Math.min(0.95, 0.28 + fadeDistance * 0.28 + (pulsating ? 0.08 : 0)),
      "--ray-spread": `${Math.max(16, Math.min(60, 54 - lightSpread * 28 + distortion * 12))}deg`,
      "--ray-length": `${Math.max(80, rayLength * 110)}%`,
      "--ray-noise": Math.max(0, Math.min(0.22, noiseAmount * 0.65 + (1 - saturation) * 0.05)),
    }),
    [
      distortion,
      fadeDistance,
      lightSpread,
      noiseAmount,
      originX,
      originY,
      pulsating,
      rayLength,
      raysColor,
      raysSpeed,
      saturation,
    ],
  );

  useEffect(() => {
    if (!followMouse) return;

    let frame = 0;
    let targetX = 50;
    let targetY = 42;
    let currentX = targetX;
    let currentY = targetY;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      const influence = Math.max(0, Math.min(1, mouseInfluence));
      currentX += (targetX - currentX) * 0.05 * influence;
      currentY += (targetY - currentY) * 0.05 * influence;
      containerRef.current?.style.setProperty("--ray-mx", `${currentX}%`);
      containerRef.current?.style.setProperty("--ray-my", `${currentY}%`);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, [followMouse, mouseInfluence]);

  return (
    <div
      ref={containerRef}
      className={[styles.lightRays, className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}
