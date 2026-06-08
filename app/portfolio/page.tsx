"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Work = {
  title: string;
  category: string;
  role: string;
  description: string;
  videoSrc: string;
  coverSrc?: string;
  y: number;
  rotate: number;
  scale: number;
};

const works: Work[] = [
  {
    title: "六十亿分之一的幸运",
    category: "Wedding Vlog",
    role: "导演 / 摄影 / 剪辑 / 成片输出",
    description:
      "遇见彼此是六十亿分之一的幸运。而双向奔赴的星光，才是真正能穿越时空的永恒。",
    videoSrc: "/videos/lucky-wedding.mp4",
    y: 40,
    rotate: -3,
    scale: 0.98,
  },
  {
    title: "永远不变",
    category: "Wedding Vlog",
    role: "摄影 / 剪辑 / 音乐节奏 / 情绪表达",
    description:
      "相识相遇相知，一切或许都是命运的安排，而和你在一起的时光，也全都很耀眼。",
    videoSrc: "/videos/forever.mp4",
    y: -60,
    rotate: 2,
    scale: 1,
  },
  {
    title: "关于我们 关于夏天",
    category: "Creator Short",
    role: "摄影 / 剪辑 / 音乐节奏 / 情绪表达",
    description: "既然注定要分别，那就把快门定格在这个夏天。",
    videoSrc: "/videos/bali.mp4",
    y: 90,
    rotate: -1,
    scale: 0.94,
  },
  {
    title: "宝润二次供水企业宣传片",
    category: "Brand Film",
    role: "导演 / 摄影 / 剪辑 / 成片输出",
    description:
      "为邵阳市自来水宝润二次供水有限责任公司拍摄制作企业宣传片，完成企业形象影像呈现。",
    videoSrc: "/videos/BaoRun.mp4",
    y: -10,
    rotate: 3,
    scale: 0.96,
  },
  {
    title: "喜哥视界人物访谈",
    category: "Interview",
    role: "策划 / 摄影 / 后期剪辑 / 字幕包装",
    description: "围绕长对谈内容进行结构整理、节奏剪辑和信息强化。",
    videoSrc: "/videos/5月30日.mp4",
    y: -110,
    rotate: -2,
    scale: 0.92,
  },
  {
    title: "又结束的夏天",
    category: "Creator Short",
    role: "摄影 / 后期剪辑 / 情绪表达",
    description:
      "喧嚣着蝉鸣、黐人的汗水，冰镇的饮料、发呆的下午...刚在梦里想起的谁，是想起哪样一个夏天。",
    videoSrc: "/videos/The Summer.mp4",
    y: 120,
    rotate: 2.5,
    scale: 0.95,
  },
  {
    title: "筷至人心",
    category: "Documentary",
    role: "摄影 / 分镜脚本",
    description:
      "参与制作《筷至人心》纪录片毕业设计。负责分镜设计与部分镜头拍摄制作。",
    videoSrc: "/videos/kuaizhi.mp4",
    y: -30,
    rotate: -3,
    scale: 0.9,
  },
  {
    title: "湘中校园景观设计",
    category: "UE5 Scene",
    role: "场景搭建 / 后期剪辑",
    description:
      "在 UE5 中完成制作了视频中的场景以及摄像机镜头，并完成剪辑成片。",
    videoSrc: "/videos/jingguan.mp4",
    y: 70,
    rotate: 2,
    scale: 0.93,
  },
  {
    title: "浚泉号雨林铭润茶文化宣传片",
    category: "Brand Film",
    role: "导演 / 剪辑 / 成片输出",
    description:
      "为邵阳市本地茶文化浚泉号雨林铭润品牌茶叶及紫砂壶制作并拍摄商业广告，主要负责导演及后期剪辑。",
    videoSrc: "/videos/yunwu tea.mp4",
    y: -80,
    rotate: -1.5,
    scale: 0.94,
  },
];

const total = works.length;

function wrapPosition(value: number) {
  return ((value % total) + total) % total;
}

function centeredDistance(value: number) {
  return ((value + total / 2) % total + total) % total - total / 2;
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

  useGSAP(
    () => {
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

    /**
     * 防穿模核心：
     * 当某张卡片被 hover 时，附近的其他卡片自动向两边让位。
     */
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
      rotateZ: hovered ? 0 : workRotate(index, p),
      opacity,
      filter: `blur(${!hovered && (depth > 4 || isNearFocused > 0.6) ? 1.5 : 0}px)`,
      zIndex: hovered ? 6000 : Math.round(1000 - depth * 90 - isNearFocused * 200),
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

      const workRotate = (index: number, p: number) => {
        return works[index].rotate * 0.45 + p * 1.2;
      };

      updateDeckRef.current = updateDeck;
      updateDeck(false);

      gsap.from(".portfolio-intro", {
        opacity: 0,
        y: 24,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.from(".stack-card", {
        opacity: 0,
        y: 70,
        scale: 0.88,
        filter: "blur(12px)",
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.12,
        onComplete: () => updateDeck(false),
      });

      const deckArea =
        container.current?.querySelector<HTMLElement>(".deck-drag-area");
const handleDeckPointerMove = (event: PointerEvent) => {
  if (activeIndexRef.current !== null) return;
  if (isDragging.current) return;

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
      const isDragging = { current: false };
      const dragStartY = { current: 0 };
      const dragStartPosition = { current: 0 };
      const lastY = { current: 0 };
      const lastTime = { current: 0 };
      const pressedIndex = { current: null as number | null };

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
        if (!isDragging.current) return;
        if (activeIndexRef.current !== null) return;

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
  if (activeIndexRef.current !== null) return;
  if (isDragging.current) return;

  if (hoveredIndex.current !== null) {
    velocity.current = 0;
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
    },
    { scope: container }
  );

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

  // 关键：立刻隐藏原卡片，避免出现你截图里那种“两张重叠”的情况
  gsap.set(selectedCard, {
    visibility: "hidden",
    pointerEvents: "none",
  });

  const otherCards = cards.current.filter((_, cardIndex) => cardIndex !== index);

  gsap.to(otherCards, {
    opacity: 0,
    x: (cardIndex, target) => {
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

  // 先让播放页挂载，但它默认 opacity-0，不会突然闪出来
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
            // 自动播放被浏览器拦截时，可以手动点击控件播放
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
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && activeIndexRef.current !== null) {
      closeProject();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);
  return (
    <main
      ref={container}
      className="relative min-h-screen overflow-hidden bg-[#f4f1ea] text-[#111827]"
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(55,224,194,0.13),transparent_30%),linear-gradient(to_bottom,#f4f1ea,#efe7da)]" />

      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(17,24,39,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.25)_1px,transparent_1px)] [background-size:120px_120px]" />

      <section
        className="relative z-10 h-screen overflow-hidden"
        style={{ perspective: "2600px" }}
      >
        <div className="portfolio-intro absolute left-1/2 top-8 z-40 -translate-x-1/2 text-center">
          <h1 className="text-5xl font-semibold tracking-[-0.08em] text-[#111827] md:text-7xl">
            作品集展示
          </h1>
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
              <div className="overflow-hidden border border-black/15 bg-white/35 shadow-[0_30px_90px_rgba(15,23,42,0.16)] backdrop-blur-sm transition duration-500 group-hover:bg-white/75 group-hover:shadow-[0_42px_140px_rgba(55,224,194,0.22)]">
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
                    poster={work.coverSrc}
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

       {activeWork && (
  <div className="player-overlay fixed inset-0 z-[90] flex items-center justify-center bg-[#f4f1ea]/86 px-6 opacity-0 backdrop-blur-xl">
            <article className="active-player w-full max-w-5xl overflow-hidden rounded-[28px] border border-black/10 bg-[#fffaf0]/95 p-4 opacity-0 shadow-[0_40px_150px_rgba(15,23,42,0.22)]">
              <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.32em] text-signal">
                    SELECTED PROJECT
                  </p>

                  <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#111827] md:text-5xl">
                    {activeWork.title}
                  </h2>
                </div>

                <p className="hidden rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-slate-600 md:block">
                  {activeWork.category}
                </p>
              </div>

              <div className="overflow-hidden rounded-[24px] bg-black">
                <video
  src={activeWork.videoSrc}
  controls
  autoPlay
  muted
  playsInline
  className="aspect-video max-h-[68vh] w-full bg-black object-contain"
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
          </div>
        )}
      </section>
    </main>
  );
}