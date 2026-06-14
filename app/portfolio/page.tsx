"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

type Work = {
  title: string;
  category: string;
  role: string;
  description: string;
  videoSrc: string;
  rotate: number;
};

type CameraMode = "A" | "S" | "M";

const works: Work[] = [
  {
    title: "六十分之一的幸运",
    category: "Wedding Vlog",
    role: "导演 / 摄影 / 剪辑 / 成片输出",
    description:
      "遇见彼此是六十亿分之一的幸运，而双向奔赴的星光，才是真正能穿越时空的永恒。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/lucky-wedding.mp4",
    rotate: -3,
  },
  {
    title: "永远不变",
    category: "Wedding Vlog",
    role: "摄影 / 剪辑 / 音乐节奏 / 情绪表达",
    description:
      "相识相遇相知，一切或许都是命运的安排，而和你在一起的时光，也全都很耀眼。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/forever.mp4",
    rotate: 2,
  },
  {
    title: "关于我们 关于夏天",
    category: "Creator Short",
    role: "摄影 / 剪辑 / 音乐节奏 / 情绪表达",
    description: "既然注定要分别，那就把快门定格在这个夏天。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/bali.mp4",
    rotate: -1,
  },
  {
    title: "宝润二次供水企业宣传片",
    category: "Brand Film",
    role: "导演 / 摄影 / 剪辑 / 成片输出",
    description:
      "为邵阳市自来水宝润二次供水有限责任公司拍摄制作企业宣传片，完成企业形象影像呈现。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/BaoRunvideo%20videos.mp4",
    rotate: 3,
  },
  {
    title: "喜哥视界人物访谈",
    category: "Interview",
    role: "策划 / 摄影 / 后期剪辑 / 字幕包装",
    description: "围绕长对谈内容进行结构整理、节奏剪辑和信息强化。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/gaozhikai.mp4",
    rotate: -2,
  },
  {
    title: "又结束的夏天",
    category: "Creator Short",
    role: "摄影 / 后期剪辑 / 情绪表达",
    description:
      "喧嚷着蝉鸣、黏人的汗水、冰镇的饮料、发呆的下午，刚在梦里想起的谁，是想起哪样一个夏天。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/The%20Summer.mp4",
    rotate: 2.5,
  },
  {
    title: "箭至人心",
    category: "Documentary",
    role: "摄影 / 分镜脚本",
    description:
      "参与制作纪录片毕业设计，负责分镜设计与部分镜头拍摄制作。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/kuaizhi.mp4",
    rotate: -3,
  },
  {
    title: "湘中校园景观设计",
    category: "UE5 Scene",
    role: "场景搭建 / 后期剪辑",
    description:
      "在 UE5 中完成视频场景以及摄像机镜头制作，并完成剪辑成片。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/jingguan.mp4",
    rotate: 2,
  },
  {
    title: "浔泷号雨林铫润茶文化宣传片",
    category: "Brand Film",
    role: "导演 / 剪辑 / 成片输出",
    description:
      "为本地茶文化品牌制作商业宣传片，主要负责导演及后期剪辑。",
    videoSrc:
      "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/yunwu%20tea.mp4",
    rotate: -1.5,
  },
];

const archiveFrames = [
  "left-[9vw] top-[22vh] h-28 w-44 -rotate-[10deg]",
  "left-[18vw] top-[38vh] h-24 w-40 rotate-[7deg]",
  "right-[10vw] top-[24vh] h-32 w-48 rotate-[9deg]",
  "right-[18vw] top-[45vh] h-24 w-36 -rotate-[6deg]",
  "left-[12vw] bottom-[24vh] h-24 w-44 rotate-[4deg]",
  "right-[13vw] bottom-[23vh] h-28 w-44 -rotate-[8deg]",
  "left-[37vw] top-[16vh] h-20 w-36 rotate-[3deg]",
  "right-[36vw] bottom-[17vh] h-20 w-36 -rotate-[4deg]",
  "left-[43vw] bottom-[31vh] h-24 w-40 rotate-[8deg]",
  "left-[25vw] bottom-[10vh] h-20 w-32 -rotate-[3deg]",
  "right-[28vw] top-[13vh] h-24 w-32 rotate-[5deg]",
  "left-[4vw] top-[55vh] h-20 w-36 rotate-[11deg]",
  "right-[5vw] top-[62vh] h-20 w-36 -rotate-[12deg]",
  "left-[30vw] top-[68vh] h-16 w-28 rotate-[2deg]",
  "right-[42vw] top-[77vh] h-16 w-28 -rotate-[5deg]",
  "left-[52vw] top-[20vh] h-16 w-28 -rotate-[2deg]",
];

const cameraModes: Array<{ label: CameraMode; name: string }> = [
  { label: "A", name: "Aperture" },
  { label: "S", name: "Shutter" },
  { label: "M", name: "Manual" },
];

const apertureStops = [
  { label: "f/1.8", blur: 10, vignette: 0.24 },
  { label: "f/2.8", blur: 7, vignette: 0.21 },
  { label: "f/4", blur: 4.5, vignette: 0.18 },
  { label: "f/5.6", blur: 2, vignette: 0.14 },
  { label: "f/8", blur: 0.2, vignette: 0.1 },
];

const shutterSpeeds = [
  { label: "1/30", trail: 0.36, exposure: 0.24 },
  { label: "1/60", trail: 0.26, exposure: 0.12 },
  { label: "1/125", trail: 0.14, exposure: 0 },
  { label: "1/250", trail: 0.07, exposure: -0.13 },
  { label: "1/500", trail: 0.03, exposure: -0.26 },
];

const isoStops = [
  { label: "ISO 100", grain: 0.03, exposure: -0.1 },
  { label: "ISO 200", grain: 0.05, exposure: -0.03 },
  { label: "ISO 400", grain: 0.08, exposure: 0.07 },
  { label: "ISO 800", grain: 0.13, exposure: 0.18 },
  { label: "ISO 1600", grain: 0.2, exposure: 0.31 },
];

const proofFrames = Array.from({ length: 32 }, (_, index) => index);

const total = works.length;

function wrapPosition(value: number) {
  return ((value % total) + total) % total;
}

function centeredDistance(value: number) {
  return (((value + total / 2) % total) + total) % total - total / 2;
}

export default function PortfolioPage() {
  const container = useRef<HTMLElement | null>(null);
  const cards = useRef<HTMLElement[]>([]);
  const position = useRef(0);
  const velocity = useRef(0);
  const hoveredIndex = useRef<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const hasDragged = useRef(false);
  const updateDeckRef = useRef<(animate?: boolean) => void>(() => {});

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeWork = activeIndex === null ? null : works[activeIndex];
  const [cinemaMode, setCinemaMode] = useState(false);
  const [cameraMode, setCameraMode] = useState<CameraMode>("A");
  const [apertureIndex, setApertureIndex] = useState(1);
  const [shutterIndex, setShutterIndex] = useState(2);
  const [isoIndex, setIsoIndex] = useState(1);

  const autoApertureIndex = Math.max(
    0,
    Math.min(apertureStops.length - 1, 4 - shutterIndex + Math.max(0, isoIndex - 2))
  );
  const autoShutterIndex = Math.max(
    0,
    Math.min(shutterSpeeds.length - 1, 4 - apertureIndex + Math.max(0, isoIndex - 2))
  );
  const effectiveApertureIndex =
    cameraMode === "S" ? autoApertureIndex : apertureIndex;
  const effectiveShutterIndex =
    cameraMode === "A" ? autoShutterIndex : shutterIndex;
  const aperture = apertureStops[effectiveApertureIndex];
  const shutter = shutterSpeeds[effectiveShutterIndex];
  const iso = isoStops[isoIndex];
  const apertureScale = 0.72 + effectiveApertureIndex * 0.14;
  const exposureValue =
    cameraMode === "A" ? iso.exposure : shutter.exposure + iso.exposure;
  const lightOpacity = Math.max(0, exposureValue) * 0.78;
  const darkOpacity = Math.max(0, -exposureValue) * 0.85;
  const shutterSelectEnabled = cameraMode !== "A";
  const apertureSelectEnabled = cameraMode !== "S";

  const triggerShutter = () => {
    gsap.fromTo(
      ".shutter-flash",
      { opacity: 0.5 },
      { opacity: 0, duration: 0.48, ease: "power2.out" }
    );
    gsap.fromTo(
      ".lens-pulse",
      { opacity: 0.42, scale: 0.72 },
      { opacity: 0, scale: 1.22, duration: 0.72, ease: "power3.out" }
    );
    gsap.fromTo(
      ".focus-reticle",
      { scale: 0.96, opacity: 0.38 },
      { scale: 1, opacity: 0.18, duration: 0.42, ease: "power3.out" }
    );
  };

  useEffect(() => {
    gsap.fromTo(
      ".camera-readout",
      { opacity: 0.45, y: 5 },
      { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" }
    );
    gsap.fromTo(
      ".camera-mode-chip",
      { scale: 0.96 },
      { scale: 1, duration: 0.28, ease: "back.out(2)" }
    );
  }, [cameraMode, apertureIndex, shutterIndex, isoIndex]);

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduceMotion) {
        gsap.fromTo(
          ".camera-dock",
          { autoAlpha: 0, x: -28, y: 10, scale: 0.96 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: "back.out(1.7)",
            delay: 0.28,
          }
        );
      }

      const updateDeck = (animate = false) => {
        const focusedIndex = hoveredIndex.current;
        const focusedP =
          focusedIndex === null
            ? 0
            : centeredDistance(focusedIndex - position.current);

        cards.current.forEach((card, index) => {
          const p = centeredDistance(index - position.current);
          const depth = Math.abs(p);
          const hovered = focusedIndex === index;
          const visible = depth < 5.1;
          const baseX = p * 150 + Math.sign(p) * depth * 38;
          const baseY = -p * 82;
          const baseZ = 90 - depth * 48;
          const relationToFocused = p - focusedP;
          const isNearFocused =
            focusedIndex !== null && !hovered
              ? Math.max(0, 1 - Math.abs(relationToFocused) / 2.2)
              : 0;
          const pushDirection =
            relationToFocused === 0
              ? index < focusedIndex!
                ? -1
                : 1
              : Math.sign(relationToFocused);
          const pushX = pushDirection * isNearFocused * 180;
          const pushY = -pushDirection * isNearFocused * 54;
          const pushZ = isNearFocused * -140;
          const x = hovered ? baseX : baseX + pushX;
          const y = hovered ? baseY - 10 : baseY + pushY;
          const z = hovered ? 260 : baseZ + pushZ;
          const scale = hovered
            ? 0.88
            : 0.78 - Math.min(depth, 5) * 0.035 - isNearFocused * 0.035;
          const opacity = visible
            ? hovered
              ? 1
              : Math.max(0.18, 1 - depth * 0.11 - isNearFocused * 0.28)
            : 0;
          const props = {
            xPercent: -50,
            yPercent: -50,
            x,
            y,
            z,
            scale,
            rotateX: 0,
            rotateY: hovered ? -4 : -18 + p * 1.4,
            rotateZ: hovered ? 0 : works[index].rotate * 0.45 + p * 1.2,
            opacity,
            filter: `blur(${
              !hovered && (depth > 4 || isNearFocused > 0.6) ? 1.5 : 0
            }px)`,
            zIndex: hovered
              ? 6000
              : Math.round(1000 - depth * 90 - isNearFocused * 200),
            transformPerspective: 2600,
            transformOrigin: "50% 50%",
            pointerEvents: visible ? "auto" : "none",
          };

          if (animate) {
            gsap.to(card, {
              ...props,
              duration: hovered ? 0.42 : 0.58,
              ease: "power4.out",
            });
          } else {
            gsap.set(card, props);
          }
        });
      };

      updateDeckRef.current = updateDeck;
      updateDeck(false);

      if (reduceMotion) {
        gsap.set(".focus-intro-overlay", { display: "none" });
      }

      gsap.from(".portfolio-intro", {
        opacity: 0,
        y: 24,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power4.out",
        delay: reduceMotion ? 0 : 0.72,
      });

      gsap.from(".stack-card", {
        opacity: 0,
        y: 70,
        scale: 0.88,
        filter: "blur(12px)",
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
        delay: reduceMotion ? 0.12 : 0.9,
        onComplete: () => updateDeck(false),
      });

      const deckArea =
        container.current?.querySelector<HTMLElement>(".deck-drag-area");
      const isDragging = { current: false };
      const dragStartY = { current: 0 };
      const dragStartPosition = { current: 0 };
      const lastY = { current: 0 };
      const lastTime = { current: 0 };
      const pressedIndex = { current: null as number | null };

      const handleDeckPointerMove = (event: PointerEvent) => {
        if (activeIndexRef.current !== null || isDragging.current) return;

        const element = document.elementFromPoint(
          event.clientX,
          event.clientY
        ) as HTMLElement | null;
        const card = element?.closest(".stack-card") as HTMLElement | null;
        const nextIndex = card ? Number(card.dataset.index) : null;
        const normalizedIndex =
          nextIndex !== null && !Number.isNaN(nextIndex) ? nextIndex : null;

        if (hoveredIndex.current !== normalizedIndex) {
          hoveredIndex.current = normalizedIndex;
          velocity.current = 0;
          updateDeckRef.current(true);
        }
      };

      const handleDeckPointerLeave = () => {
        if (activeIndexRef.current !== null) return;
        hoveredIndex.current = null;
        velocity.current = 0;
        updateDeckRef.current(true);
      };

      const handlePointerDown = (event: PointerEvent) => {
        if (activeIndexRef.current !== null) return;

        const target = event.target as HTMLElement;
        const card = target.closest(".stack-card") as HTMLElement | null;
        pressedIndex.current = card ? Number(card.dataset.index) : null;
        isDragging.current = true;
        hasDragged.current = false;
        dragStartY.current = event.clientY;
        dragStartPosition.current = position.current;
        lastY.current = event.clientY;
        lastTime.current = performance.now();
        velocity.current = 0;
        deckArea?.setPointerCapture(event.pointerId);
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!isDragging.current || activeIndexRef.current !== null) return;

        const deltaY = event.clientY - dragStartY.current;
        if (Math.abs(deltaY) > 6) {
          if (!hasDragged.current) {
            hoveredIndex.current = null;
            velocity.current = 0;
            updateDeckRef.current(false);
          }
          hasDragged.current = true;
        }

        position.current = wrapPosition(
          dragStartPosition.current + deltaY * 0.0085
        );

        const now = performance.now();
        const timeDelta = Math.max(16, now - lastTime.current);
        velocity.current = ((event.clientY - lastY.current) / timeDelta) * 0.1;
        lastY.current = event.clientY;
        lastTime.current = now;
        updateDeck(false);
      };

      const handlePointerUp = (event: PointerEvent) => {
        if (!isDragging.current) return;

        isDragging.current = false;
        if (deckArea?.hasPointerCapture(event.pointerId)) {
          deckArea.releasePointerCapture(event.pointerId);
        }

        if (!hasDragged.current && pressedIndex.current !== null) {
          openProject(pressedIndex.current);
        }

        pressedIndex.current = null;
      };

      const tick = () => {
        if (
          activeIndexRef.current !== null ||
          isDragging.current ||
          hoveredIndex.current !== null
        ) {
          return;
        }

        if (Math.abs(velocity.current) > 0.0001) {
          position.current = wrapPosition(position.current + velocity.current);
          velocity.current *= 0.9;
          updateDeck(false);
        }
      };

      deckArea?.addEventListener("pointermove", handleDeckPointerMove);
      deckArea?.addEventListener("pointerleave", handleDeckPointerLeave);
      deckArea?.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
      gsap.ticker.add(tick);

      return () => {
        deckArea?.removeEventListener("pointermove", handleDeckPointerMove);
        deckArea?.removeEventListener("pointerleave", handleDeckPointerLeave);
        deckArea?.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);
        gsap.ticker.remove(tick);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeIndexRef.current !== null) {
        closeProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animateBackground = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      root.style.setProperty("--mx", `${currentX}px`);
      root.style.setProperty("--my", `${currentY}px`);
      raf = requestAnimationFrame(animateBackground);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animateBackground();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const openProject = (index: number) => {
    const selectedCard = cards.current[index];
    if (!selectedCard || activeIndexRef.current !== null) return;

    activeIndexRef.current = index;

    const rect = selectedCard.getBoundingClientRect();
    const clone = selectedCard.cloneNode(true) as HTMLElement;

    Object.assign(clone.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: "0",
      transform: "none",
      zIndex: "120",
      pointerEvents: "none",
      transformOrigin: "center center",
      willChange: "left, top, width, height, transform, opacity, filter",
    });

    document.body.appendChild(clone);

    gsap.set(selectedCard, {
      visibility: "hidden",
      pointerEvents: "none",
    });

    const otherCards = cards.current.filter((_, cardIndex) => cardIndex !== index);

    gsap.to(otherCards, {
      opacity: 0,
      x: (_cardIndex, target) => {
        const targetIndex = Number((target as HTMLElement).dataset.index);
        return targetIndex < index ? "-=220" : "+=220";
      },
      y: "+=70",
      z: -260,
      scale: 0.74,
      filter: "blur(12px)",
      duration: 0.58,
      stagger: 0.025,
      ease: "power4.inOut",
      pointerEvents: "none",
    });

    setActiveIndex(index);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const overlay = document.querySelector(".player-overlay");
        const player = document.querySelector(".active-player");
        const video = document.querySelector<HTMLVideoElement>(
          ".active-player video"
        );

        gsap.set(player, {
          opacity: 0,
          y: 36,
          scale: 0.96,
          filter: "blur(12px)",
        });

        gsap.to(overlay, {
          opacity: 1,
          duration: 0.24,
          ease: "power2.out",
        });

        const targetWidth = Math.min(window.innerWidth * 0.62, 860);
        const targetHeight = Math.min(
          targetWidth * (rect.height / rect.width),
          window.innerHeight * 0.56
        );

        const tl = gsap.timeline({
          onComplete: () => {
            clone.remove();
            video?.play().catch(() => {
              // Autoplay can be blocked; controls remain available.
            });
          },
        });

        tl.to(
          clone,
          {
            left: "50%",
            top: "48%",
            width: targetWidth,
            height: targetHeight,
            xPercent: -50,
            yPercent: -50,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.62,
            ease: "power4.inOut",
          },
          0
        );

        tl.to(
          clone,
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.22,
            ease: "power2.out",
          },
          0.5
        );

        tl.to(
          player,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.42,
            ease: "power3.out",
          },
          0.48
        );
      });
    });
  };

  const closeProject = () => {
    const video = document.querySelector<HTMLVideoElement>(
      ".active-player video"
    );

    video?.pause();

    gsap.to(".active-player", {
      opacity: 0,
      y: 40,
      scale: 0.96,
      filter: "blur(12px)",
      duration: 0.32,
      ease: "power3.inOut",
    });

    gsap.to(".player-overlay", {
      opacity: 0,
      duration: 0.38,
      ease: "power2.inOut",
      onComplete: () => {
        activeIndexRef.current = null;
        setActiveIndex(null);

        requestAnimationFrame(() => {
          cards.current.forEach((card) => {
            gsap.set(card, {
              visibility: "visible",
              clearProps: "pointerEvents",
            });
          });

          updateDeckRef.current(true);
        });
      },
    });
  };

  return (
    <main
      ref={container}
      className={[
        "relative min-h-screen overflow-hidden transition-colors duration-700",
        cinemaMode ? "bg-[#090b0c] text-[#f4f1ea]" : "bg-[#f4f1ea] text-[#111827]",
      ].join(" ")}
      style={
        {
          "--mx": "50vw",
          "--my": "50vh",
          "--lens-blur": `${aperture.blur}px`,
          "--aperture-scale": apertureScale,
          "--grain-opacity": iso.grain * 1.55,
          "--trail-opacity": shutter.trail * 1.45,
          "--vignette-opacity": aperture.vignette,
          "--light-opacity": lightOpacity,
          "--dark-opacity": darkOpacity,
        } as CSSProperties
      }
    >
      <div
        className={[
          "pointer-events-none fixed inset-0 transition-colors duration-700",
          cinemaMode ? "bg-[#090b0c]" : "bg-[#f4f1ea]",
        ].join(" ")}
      />
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-700"
        style={{
          opacity: cinemaMode ? 0.95 : 1,
          background: cinemaMode
            ? "linear-gradient(135deg, #07090a 0%, #101616 46%, #090b0c 100%)"
            : "linear-gradient(135deg, #fbf8f1 0%, #ece8dc 48%, #f7f3e8 100%)",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-700"
        style={{
          opacity: cinemaMode ? 0.74 : 0.88,
          background: cinemaMode
            ? "radial-gradient(720px circle at var(--mx, 50vw) var(--my, 50vh), rgba(55,224,194,0.13), transparent 62%), radial-gradient(980px circle at 50% 55%, rgba(255,255,255,0.07), transparent 42%), radial-gradient(900px circle at 50% 110%, rgba(0,0,0,0.74), transparent 58%)"
            : "radial-gradient(720px circle at var(--mx, 50vw) var(--my, 50vh), rgba(55,224,194,0.14), transparent 62%), radial-gradient(980px circle at 50% 55%, rgba(255,255,255,0.88), transparent 42%), radial-gradient(900px circle at 50% 108%, rgba(28,31,28,0.12), transparent 58%)",
        }}
      />

      <div
        className={[
          "pointer-events-none fixed inset-0 transition-opacity duration-700",
          cinemaMode ? "opacity-[0.11]" : "opacity-[0.06]",
        ].join(" ")}
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,32,24,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(24,32,24,0.28) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[12] bg-white transition-opacity duration-500"
        style={{ opacity: "var(--light-opacity)" }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[12] bg-[#020617] transition-opacity duration-500"
        style={{ opacity: "var(--dark-opacity)" }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[13] mix-blend-multiply transition-opacity duration-500"
        style={{
          opacity: "var(--grain-opacity)",
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.55) 0.7px, transparent 0.8px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[13] mix-blend-soft-light transition-opacity duration-500"
        style={{
          opacity: "var(--trail-opacity)",
          background:
            "repeating-linear-gradient(100deg, transparent 0 18px, rgba(55,224,194,0.16) 19px 20px, transparent 21px 42px)",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[13] transition-opacity duration-500"
        style={{
          opacity: "var(--vignette-opacity)",
          background:
            "radial-gradient(circle at center, transparent 0 42%, rgba(15,23,42,0.22) 74%, rgba(15,23,42,0.45) 100%)",
        }}
      />

      <div className="shutter-flash pointer-events-none fixed inset-0 z-[70] bg-white opacity-0" />

      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden [perspective:1400px]">
        <div className="focus-reticle absolute left-1/2 top-[54%] h-[82vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 opacity-18 shadow-[inset_0_0_90px_rgba(0,0,0,0.08)] transition-colors duration-700 dark:border-white/10" />
        <div className="lens-pulse absolute left-1/2 top-[54%] h-[82vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/60 opacity-0" />
        <div
          className={[
            "absolute left-1/2 top-[54%] h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-700",
            cinemaMode ? "border-white/10 shadow-[0_0_120px_rgba(55,224,194,0.08)]" : "border-black/10 shadow-[0_0_120px_rgba(15,23,42,0.08)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute left-1/2 top-[54%] h-[30vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500",
            cinemaMode ? "border-white/14 bg-white/[0.015]" : "border-black/10 bg-white/20",
          ].join(" ")}
          style={{ scale: "var(--aperture-scale)" }}
        />

        {archiveFrames.map((frame, index) => (
          <span
            key={index}
            className={[
              "absolute rounded-[18px] border shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-[2px] transition duration-700",
              cinemaMode
                ? "border-white/10 bg-white/[0.035] opacity-28"
                : "border-black/10 bg-white/32 opacity-50",
              frame,
            ].join(" ")}
            style={{
              transform: `translateZ(${-360 - index * 24}px)`,
              filter: "blur(var(--lens-blur))",
            }}
          >
            <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-signal/70" />
            <span className="absolute bottom-3 left-3 right-3 h-px bg-current opacity-15" />
            <span className="absolute bottom-5 left-3 text-[9px] font-semibold uppercase tracking-[0.22em] opacity-35">
              Shot {String(index + 1).padStart(2, "0")}
            </span>
          </span>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-5 z-[2] hidden md:block">
        <span className="absolute left-0 top-0 h-16 w-16 border-l border-t border-current opacity-18" />
        <span className="absolute right-0 top-0 h-16 w-16 border-r border-t border-current opacity-18" />
        <span className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-current opacity-18" />
        <span className="absolute bottom-0 right-0 h-16 w-16 border-b border-r border-current opacity-18" />
        <span className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-current opacity-12" />
        <span className="absolute bottom-0 left-1/2 h-10 w-px -translate-x-1/2 bg-current opacity-12" />
        <span className="absolute left-0 top-1/2 h-px w-10 -translate-y-1/2 bg-current opacity-12" />
        <span className="absolute right-0 top-1/2 h-px w-10 -translate-y-1/2 bg-current opacity-12" />
      </div>

      <div className="pointer-events-none fixed left-4 top-[15vh] z-[2] hidden w-24 rounded-[26px] border border-black/10 bg-white/24 p-3 shadow-[0_24px_90px_rgba(31,40,28,0.06)] backdrop-blur-xl min-[760px]:block">
        <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-[#233b29]/45">
          <span>Film</span>
          <span>Roll</span>
        </div>
        <div className="space-y-2">
          {proofFrames.slice(0, 16).map((frame) => (
            <div key={`film-${frame}`} className="flex items-center gap-2">
              <span
                className={[
                  "h-3 w-3 shrink-0 rounded-sm border",
                  cinemaMode ? "border-white/14 bg-white/8" : "border-black/10 bg-black/[0.04]",
                ].join(" ")}
              />
              <span className="h-px flex-1 bg-current opacity-12" />
            </div>
          ))}
        </div>
      </div>

      <div className="camera-dock fixed left-3 top-[104px] z-50 w-[min(310px,calc(100vw-1.5rem))] rounded-[22px] border border-black/10 bg-white/68 p-2 text-[#233b29] shadow-[0_16px_54px_rgba(20,30,20,0.11)] backdrop-blur-2xl transition-all duration-500">
        <div className="mb-1.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={triggerShutter}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 bg-[#111827] shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition hover:scale-105 active:scale-95"
            aria-label="Press shutter"
            title="Press shutter"
          >
            <span className="h-4 w-4 rounded-full border border-white/70 bg-white/10 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.18)]" />
          </button>

          <div className="min-w-0 flex-1 rounded-[15px] border border-black/10 bg-[#111827] px-2.5 py-1.5 text-white shadow-[inset_0_0_16px_rgba(255,255,255,0.04)]">
            <div className="camera-readout flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-signal">
                {cameraMode === "A"
                  ? "A 光圈优先"
                  : cameraMode === "S"
                    ? "S 快门优先"
                    : "M 手动"}
              </span>
              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.1em] text-white/58">
                {aperture.label} / {shutter.label} / {iso.label}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-1.5 grid grid-cols-3 gap-1.5">
          {cameraModes.map((mode) => (
            <button
              key={mode.label}
              type="button"
              onClick={() => setCameraMode(mode.label)}
              className={[
                "camera-mode-chip h-7 rounded-full border text-[9px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
                cameraMode === mode.label
                  ? "border-signal bg-signal text-black shadow-[0_10px_26px_rgba(55,224,194,0.18)]"
                  : "border-black/10 bg-white/50 text-[#233b29]/58 hover:bg-white",
              ].join(" ")}
              title={mode.name}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <label
            className={[
              "rounded-[14px] border px-2 py-1.5 transition-all duration-300",
              apertureSelectEnabled
                ? "border-black/10 bg-white/55"
                : "border-black/5 bg-black/[0.035] opacity-60",
            ].join(" ")}
          >
            <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-[#233b29]/44">
              光圈
            </span>
            <select
              value={effectiveApertureIndex}
              disabled={!apertureSelectEnabled}
              onChange={(event) => setApertureIndex(Number(event.target.value))}
              className="w-full bg-transparent text-[11px] font-semibold text-[#111827] outline-none disabled:cursor-not-allowed"
            >
              {apertureStops.map((stop, index) => (
                <option key={stop.label} value={index}>
                  {stop.label}
                </option>
              ))}
            </select>
          </label>

          <label
            className={[
              "rounded-[14px] border px-2 py-1.5 transition-all duration-300",
              shutterSelectEnabled
                ? "border-black/10 bg-white/55"
                : "border-black/5 bg-black/[0.035] opacity-60",
            ].join(" ")}
          >
            <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-[#233b29]/44">
              快门
            </span>
            <select
              value={effectiveShutterIndex}
              disabled={!shutterSelectEnabled}
              onChange={(event) => setShutterIndex(Number(event.target.value))}
              className="w-full bg-transparent text-[11px] font-semibold text-[#111827] outline-none disabled:cursor-not-allowed"
            >
              {shutterSpeeds.map((speed, index) => (
                <option key={speed.label} value={index}>
                  {speed.label}
                </option>
              ))}
            </select>
          </label>

          <label className="rounded-[14px] border border-black/10 bg-white/55 px-2 py-1.5 transition-all duration-300">
            <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-[#233b29]/44">
              感光度
            </span>
            <select
              value={isoIndex}
              onChange={(event) => setIsoIndex(Number(event.target.value))}
              className="w-full bg-transparent text-[11px] font-semibold text-[#111827] outline-none"
            >
              {isoStops.map((stop, index) => (
                <option key={stop.label} value={index}>
                  {stop.label.replace("ISO ", "")}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-3 bottom-6 z-[2] rounded-[28px] border border-black/10 bg-white/24 p-3 shadow-[0_24px_90px_rgba(31,40,28,0.06)] backdrop-blur-xl md:inset-x-[5vw]">
        <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-[#233b29]/45">
          <span>Contact Sheet</span>
          <span>Archive Roll / Drag To Browse</span>
        </div>
        <div className="relative grid h-20 grid-cols-[repeat(16,minmax(0,1fr))] gap-1.5 overflow-hidden rounded-[18px] bg-black/[0.035] p-2 md:grid-cols-[repeat(32,minmax(0,1fr))]">
          <span
            className="absolute bottom-2 top-2 w-px bg-signal/55 shadow-[0_0_24px_rgba(55,224,194,0.38)]"
            style={{ left: "var(--mx, 50vw)" }}
          />
          {proofFrames.map((frame) => (
            <div
              key={`contact-${frame}`}
              className={[
                "relative overflow-hidden rounded-[12px] border transition-colors duration-700",
                cinemaMode ? "border-white/10 bg-white/[0.045]" : "border-black/10 bg-white/40",
              ].join(" ")}
            >
              <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-current opacity-18" />
              <span className="absolute inset-x-2 bottom-2 h-px bg-current opacity-12" />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_36%,rgba(15,19,17,0.16)_100%)]" />

      <button
        type="button"
        onClick={() => setCinemaMode((value) => !value)}
        className="fixed bottom-6 left-6 z-40 rounded-full border border-black/10 bg-white/72 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#233b29]/70 shadow-[0_18px_60px_rgba(20,30,20,0.10)] backdrop-blur-xl transition hover:bg-white hover:text-[#111827]"
      >
        {cinemaMode ? "Studio Light" : "Studio Dark"}
      </button>

      <section
        className="relative z-10 h-screen overflow-hidden"
        style={{ perspective: "2600px" }}
      >
        <div className="focus-intro-overlay pointer-events-none absolute inset-0 z-[70] flex items-center justify-center bg-[#eef5ef]/18 backdrop-blur-[18px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_28%,rgba(10,18,24,0.18)_68%,rgba(10,18,24,0.34)_100%)]" />
          <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(16,33,43,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(16,33,43,0.14)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="focus-aperture-ring absolute left-1/2 top-1/2 h-[min(56vw,430px)] w-[min(56vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#37e0c2]/38 shadow-[0_0_90px_rgba(55,224,194,0.18)]">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#37e0c2]/45 to-transparent" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#37e0c2]/45 to-transparent" />
            <span className="absolute inset-[18%] rounded-full border border-white/24" />
          </div>

          <div className="relative h-[min(46vw,330px)] w-[min(72vw,520px)] text-[#10212b]">
            <span className="focus-reticle-corner absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-[#37e0c2]" />
            <span className="focus-reticle-corner absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-[#37e0c2]" />
            <span className="focus-reticle-corner absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-[#37e0c2]" />
            <span className="focus-reticle-corner absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-[#37e0c2]" />

            <span className="focus-scan-line absolute left-1/2 top-1/2 h-[120%] w-12 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#37e0c2]/36 to-transparent blur-sm" />

            <div className="focus-lock-chip absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border border-[#37e0c2]/50 bg-[#101820]/82 px-5 py-3 text-[11px] font-semibold tracking-[0.28em] text-[#d9fff8] shadow-[0_18px_60px_rgba(15,23,42,0.24)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#37e0c2] shadow-[0_0_18px_rgba(55,224,194,0.88)]" />
              合焦完成
            </div>
          </div>
        </div>

        <div className="portfolio-intro absolute left-1/2 top-7 z-40 w-[min(92vw,680px)] -translate-x-1/2 text-center md:top-8">
          <div
            className={[
              "relative mx-auto inline-flex min-w-[min(86vw,520px)] flex-col items-center px-7 py-3 transition-colors duration-700",
              cinemaMode ? "text-[#f4f1ea]" : "text-[#111827]",
            ].join(" ")}
          >
            <span className="absolute left-0 top-0 h-4 w-10 border-l border-t border-current opacity-22" />
            <span className="absolute right-0 top-0 h-4 w-10 border-r border-t border-current opacity-22" />
            <span className="absolute bottom-0 left-0 h-4 w-10 border-b border-l border-current opacity-22" />
            <span className="absolute bottom-0 right-0 h-4 w-10 border-b border-r border-current opacity-22" />

            <div className="mb-2 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 text-[10px] font-semibold tracking-[0.34em] opacity-52">
              <span className="h-px bg-current opacity-22" />
              <span>作品选帧</span>
              <span className="h-px bg-current opacity-22" />
            </div>

            <h1
              className="relative flex items-center justify-center gap-1 text-[clamp(44px,7vw,92px)] font-black leading-[0.82] tracking-[-0.12em]"
              style={{
                fontFamily:
                  '"STSong", "Songti SC", "Noto Serif SC", "Source Han Serif SC", serif',
                textShadow: cinemaMode
                  ? "0 18px 55px rgba(55,224,194,0.18)"
                  : "0 18px 55px rgba(15,23,42,0.12)",
              }}
            >
              <span className="relative z-10">影</span>
              <span className="relative z-10 -mx-1 text-transparent [-webkit-text-stroke:1.25px_currentColor] md:-mx-2">
                像
              </span>
              <span className="relative z-10">
                集
              </span>
              <span className="absolute -right-9 top-1/2 mt-0.5 mr-[-20px] hidden -translate-y-1/2 border-l border-current py-[5px] pl-3 text-[11px] font-semibold leading-[1.35] tracking-[0.2em] opacity-46 md:block">
                精选
                <br />
                片段
              </span>
              <span className="absolute -bottom-2 left-1/2 h-2 w-[74%] -translate-x-1/2 bg-signal/35 blur-md" />
            </h1>

            <div className="mt-3 grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 text-[10px] font-semibold tracking-[0.24em] opacity-46">
              <span>镜头</span>
              <span className="h-px bg-current opacity-18" />
              <span>剪辑 / 叙事 / 节奏</span>
            </div>
          </div>
        </div>

        <div
          className="deck-drag-area absolute left-1/2 top-[57%] h-[82vh] w-[96vw] max-w-[1900px] -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: "preserve-3d",
            perspective: "2600px",
            touchAction: "none",
          }}
        >
          {works.map((work, index) => (
            <article
              key={work.title}
              ref={(el) => {
                if (el) cards.current[index] = el;
              }}
              data-index={index}
              className="stack-card group absolute left-1/2 top-1/2 block w-[280px] cursor-pointer text-left outline-none md:w-[520px] lg:w-[620px]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="overflow-hidden border border-black/15 bg-white/35 shadow-[0_30px_90px_rgba(15,23,42,0.16)] backdrop-blur-sm transition duration-500 group-hover:bg-white/75 group-hover:shadow-[0_42px_140px_rgba(55,224,194,0.22)]"
                style={{
                  filter: `brightness(${1 + exposureValue * 0.42}) saturate(${
                    1 + isoIndex * 0.025
                  }) drop-shadow(0 ${18 + effectiveApertureIndex * 2}px ${
                    34 + effectiveApertureIndex * 7
                  }px rgba(15,23,42,${0.08 + effectiveApertureIndex * 0.02}))`,
                }}
              >
                <div className="flex h-10 items-center justify-between bg-[#111827]/92 px-4 text-white">
                  <p className="truncate text-xs font-semibold tracking-[0.12em]">
                    {work.title}
                  </p>
                  <p className="ml-4 shrink-0 text-xs text-white/65">
                    {work.category}
                  </p>
                </div>

                <div className="relative overflow-hidden bg-black">
                  <video
                    src={work.videoSrc}
                    muted
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {activeWork &&
          createPortal(
            <div className="player-overlay fixed inset-0 z-[9990] flex h-screen max-h-screen items-start justify-center overflow-y-auto bg-[#f4f1ea]/86 px-4 py-6 opacity-0 backdrop-blur-xl md:items-center md:px-6">
              <article className="active-player w-full max-w-5xl overflow-hidden rounded-[28px] border border-black/10 bg-[#fffaf0]/95 p-4 opacity-0 shadow-[0_40px_150px_rgba(15,23,42,0.22)]">
                <div className="mb-4 flex items-start justify-between gap-5 border-b border-black/10 pb-4">
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-signal">
                      Selected Project
                    </p>
                    <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#111827] md:text-5xl">
                      {activeWork.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeProject}
                    className="shrink-0 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#111827] hover:text-white"
                  >
                    关闭
                  </button>
                </div>

                <div className="overflow-hidden rounded-[24px] bg-black">
                  <video
                    src={activeWork.videoSrc}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="aspect-video max-h-[62vh] w-full bg-black object-contain"
                  />
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-[1fr_0.35fr]">
                  <p className="text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                    {activeWork.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {activeWork.role.split(" / ").map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs text-slate-700"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>,
            document.body
          )}
      </section>
    </main>
  );
}
