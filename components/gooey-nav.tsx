"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./gooey-nav.module.css";

type GooeyNavItem = {
  label: string;
  href: string;
};

type GooeyNavProps = {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  activeIndex?: number;
};

type Particle = {
  start: [number, number];
  end: [number, number];
  time: number;
  scale: number;
  color: number;
  rotate: number;
};

export default function GooeyNav({
  items,
  animationTime = 560,
  particleCount = 12,
  particleDistances = [56, 8],
  particleR = 72,
  timeVariance = 220,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  activeIndex = 0,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLUListElement | null>(null);
  const filterRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [localActiveIndex, setLocalActiveIndex] = useState(activeIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number): Particle => {
    const rotate = noise(r / 10);

    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLSpanElement) => {
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i += 1) {
      const particleTime = animationTime * 2 + noise(timeVariance * 2);
      const particleData = createParticle(i, particleTime, particleDistances, particleR);
      element.classList.remove(styles.active);

      window.setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add(styles.particle);
        particle.style.setProperty("--start-x", `${particleData.start[0]}px`);
        particle.style.setProperty("--start-y", `${particleData.start[1]}px`);
        particle.style.setProperty("--end-x", `${particleData.end[0]}px`);
        particle.style.setProperty("--end-y", `${particleData.end[1]}px`);
        particle.style.setProperty("--time", `${particleData.time}ms`);
        particle.style.setProperty("--scale", `${particleData.scale}`);
        particle.style.setProperty("--color", `var(--color-${particleData.color}, white)`);
        particle.style.setProperty("--rotate", `${particleData.rotate}deg`);

        point.classList.add(styles.point);
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add(styles.active));

        window.setTimeout(() => {
          if (particle.parentElement === element) {
            element.removeChild(particle);
          }
        }, particleTime);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const nextStyle = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };

    Object.assign(filterRef.current.style, nextStyle);
    Object.assign(textRef.current.style, nextStyle);
    textRef.current.innerText = element.innerText;
  };

  const activateItem = (liEl: HTMLElement, index: number) => {
    if (localActiveIndex === index) return;

    setLocalActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      filterRef.current.querySelectorAll(`.${styles.particle}`).forEach((particle) => {
        filterRef.current?.removeChild(particle);
      });
      makeParticles(filterRef.current);
    }

    if (textRef.current) {
      textRef.current.classList.remove(styles.active);
      void textRef.current.offsetWidth;
      textRef.current.classList.add(styles.active);
    }
  };

  useEffect(() => {
    setLocalActiveIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;

    const activeLi = navRef.current.querySelectorAll("li")[localActiveIndex];
    if (activeLi instanceof HTMLElement) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add(styles.active);
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[localActiveIndex];
      if (currentActiveLi instanceof HTMLElement) {
        updateEffectPosition(currentActiveLi);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [localActiveIndex]);

  return (
    <div className={styles.gooeyNavContainer} ref={containerRef}>
      <nav aria-label="主导航">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.href}
              className={localActiveIndex === index ? styles.activeItem : undefined}
            >
              <Link
                href={item.href}
                onClick={(event) => activateItem(event.currentTarget.parentElement as HTMLElement, index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    const liEl = event.currentTarget.parentElement;
                    if (liEl instanceof HTMLElement) activateItem(liEl, index);
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span className={`${styles.effect} ${styles.filter}`} ref={filterRef} />
      <span className={`${styles.effect} ${styles.text}`} ref={textRef} />
    </div>
  );
}
