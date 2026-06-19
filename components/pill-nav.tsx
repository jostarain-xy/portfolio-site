"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./pill-nav.module.css";

type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type PillNavProps = {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
};

export default function PillNav({
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "#050a10",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor,
  initialLoadAnimation = true,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width, height } = rect;
        const radius = (width * width / 4 + height * height) / (2 * height);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - width * width / 4))) + 1;
        const originY = diameter - delta;

        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(`.${styles.pillLabel}`);
        const hoverLabel = pill.querySelector(`.${styles.pillLabelHover}`);

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: height + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const timeline = gsap.timeline({ paused: true });

        timeline.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          timeline.to(label, { y: -(height + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(height + 100), opacity: 0 });
          timeline.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = timeline;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => {});

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.set(navItemsRef.current, { width: 0, overflow: "hidden" });
      gsap.to(navItemsRef.current, {
        width: "auto",
        duration: 0.6,
        ease,
        onComplete: () => {
          if (navItemsRef.current) navItemsRef.current.style.overflow = "";
        },
      });
    }

    return () => window.removeEventListener("resize", layout);
  }, [ease, initialLoadAnimation, items]);

  const handleEnter = (index: number) => {
    const timeline = tlRefs.current[index];
    if (!timeline) return;

    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(timeline.duration(), {
      duration: 0.32,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (index: number) => {
    const timeline = tlRefs.current[index];
    if (!timeline) return;

    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(0, {
      duration: 0.24,
      ease,
      overwrite: "auto",
    });
  };

  return (
    <div className={styles.pillNavContainer}>
      <nav
        className={`${styles.pillNav} ${className}`}
        aria-label="主导航"
        style={
          {
            "--base": baseColor,
            "--pill-bg": pillColor,
            "--hover-text": hoveredPillTextColor,
            "--pill-text": resolvedPillTextColor,
          } as React.CSSProperties
        }
      >
        <div className={styles.pillNavItems} ref={navItemsRef}>
          <ul className={styles.pillList} role="menubar">
            {items.map((item, index) => (
              <li key={item.href} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  className={`${styles.pill} ${activeHref === item.href ? styles.isActive : ""}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(index)}
                  onMouseLeave={() => handleLeave(index)}
                >
                  <span
                    className={styles.hoverCircle}
                    aria-hidden="true"
                    ref={(element) => {
                      circleRefs.current[index] = element;
                    }}
                  />
                  <span className={styles.labelStack}>
                    <span className={styles.pillLabel}>{item.label}</span>
                    <span
                      className={styles.pillLabelHover}
                      data-label={item.label}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
