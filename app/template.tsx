"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: ReactNode }) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      pageRef.current,
      {
        autoAlpha: 0,
        y: 32,
        scale: 0.985,
        filter: "blur(14px)",
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      glowRef.current,
      {
        autoAlpha: 0.45,
        scale: 1.25,
      },
      {
        autoAlpha: 0,
        scale: 1.65,
        duration: 1.1,
        ease: "power2.out",
      },
      0
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-[9998] bg-[radial-gradient(circle_at_center,rgba(55,224,194,0.18),transparent_38%)]"
      />

      <div ref={pageRef}>{children}</div>
    </div>
  );
}
