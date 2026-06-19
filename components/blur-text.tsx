"use client";

import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styles from "./blur-text.module.css";

type BlurTextPart = {
  text: string;
  className?: string;
};

type BlurTextProps = {
  text?: string;
  parts?: BlurTextPart[];
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "p" | "span" | "div";
};

type Segment = {
  text: string;
  className?: string;
};

function splitText(text: string, animateBy: "words" | "letters"): Segment[] {
  if (animateBy === "letters") {
    return Array.from(text).map((letter) => ({ text: letter === " " ? "\u00A0" : letter }));
  }

  return text.split(" ").flatMap((word, index, words) => {
    const segment = [{ text: word }];
    if (index < words.length - 1) segment.push({ text: "\u00A0" });
    return segment;
  });
}

export default function BlurText({
  text = "",
  parts,
  delay = 90,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.48,
  as = "p",
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const segments = useMemo(() => (parts?.length ? parts : splitText(text, animateBy)), [animateBy, parts, text]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.unobserve(element);
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const content: ReactNode = segments.map((segment, index) => (
    <span
      key={`${segment.text}-${index}`}
      className={[styles.segment, segment.className].filter(Boolean).join(" ")}
      style={
        {
          "--blur-delay": `${index * delay}ms`,
          "--blur-duration": `${stepDuration}s`,
          "--blur-y": direction === "top" ? "-30px" : "30px",
        } as CSSProperties
      }
      onAnimationEnd={index === segments.length - 1 ? onAnimationComplete : undefined}
    >
      {segment.text}
    </span>
  ));

  const rootClassName = [styles.root, inView ? styles.isInView : "", className].filter(Boolean).join(" ");
  const setRootRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  if (as === "span") {
    return (
      <span ref={setRootRef} className={rootClassName}>
        {content}
      </span>
    );
  }

  if (as === "div") {
    return (
      <div ref={setRootRef} className={rootClassName}>
        {content}
      </div>
    );
  }

  return (
    <p ref={setRootRef} className={rootClassName}>
      {content}
    </p>
  );
}
