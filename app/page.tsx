"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const featuredWork = [
  {
    title: "宝润二次供水企业宣传片",
    category: "Brand Film",
    role: "导演 / 摄影 / 剪辑 / 成片输出",
    description:
      "为邵阳市自来水宝润二次供水有限责任公司拍摄制作企业宣传片，负责整体拍摄执行与影像呈现。",
    videoSrc: "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/BaoRunvideo%20videos.mp4",
  },
  {
    title: "喜哥视界人物访谈：高志凯专题对谈",
    category: "Interview",
    role: "策划 / 摄影 / 后期剪辑 / 字幕包装",
    description:
      "参与喜哥视界访谈类内容制作，围绕长对谈内容进行结构整理、节奏剪辑和信息强化。",
    videoSrc: "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/gaozhikai.mp4",
  },
  {
    title: "我们不会明白那曾是一闪而过的夏天",
    category: "Creator Short",
    role: "摄影 / 剪辑 / 音乐节奏 / 情绪表达",
    description:
      "以日常影像和情绪片段为基础，通过镜头顺序、音乐节奏和画面停顿建立氛围。",
    videoSrc: "https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/%E6%88%91%E4%BB%AC%E4%B8%8D%E4%BC%9A%E6%98%8E%E7%99%BD%E9%82%A3%E6%9B%BE%E6%98%AF%E4%B8%80%E9%97%AA%E8%80%8C%E8%BF%87%E7%9A%84%E5%A4%8F%E5%A4%A9.mp4",
  },
];

export default function Home() {
  const container = useRef<HTMLElement | null>(null);

  const heroTitle = ["用剪辑节奏", "把画面", "变成故事"];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-bg-video",
        {
          scale: 1.16,
          opacity: 0,
          filter: "blur(16px)",
        },
        {
          scale: 1.06,
          opacity: 0.68,
          filter: "blur(0px)",
          duration: 2,
          ease: "power4.out",
        }
      )
        .from(
          ".hero-kicker",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=1.2"
        )
       .from(
  ".hero-char",
  {
    opacity: 0,
    yPercent: 120,
    rotateX: 35,
    filter: "blur(10px)",
    duration: 0.9,
    stagger: 0.045,
    ease: "power4.out",
  },
  "-=0.8"
)
        .from(
          ".hero-copy",
          {
            opacity: 0,
            y: 32,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 24,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.45"
        );

      gsap.from(".section-title", {
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 75%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row, index) => {
        const media = row.querySelector(".project-media");
        const info = row.querySelector(".project-info");

        gsap.from(row, {
          opacity: 0,
          y: 72,
          duration: 0.95,
          delay: index * 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(media, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1,
          delay: index * 0.12 + 0.15,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(info, {
          opacity: 0,
          x: 40,
          duration: 0.85,
          delay: index * 0.12 + 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="relative overflow-hidden bg-[#f4f1ea] text-[#111827]">
      <section className="relative min-h-[calc(100vh-73px)] overflow-hidden">
<div className="pointer-events-none absolute right-10 top-28 hidden h-28 w-28 rounded-full border border-black/10 md:block" />
<div className="pointer-events-none absolute right-20 top-40 hidden h-2 w-2 rounded-full bg-signal shadow-[0_0_24px_rgba(55,224,194,0.8)] md:block" />
        <video
  src="https://w1h0khvwm8ysntpz.public.blob.vercel-storage.com/showreel.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="hero-bg-video pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.9] contrast-[0.95]"
/>

<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#efe7da]/92 via-[#efe7da]/58 to-[#efe7da]/18" />
<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#efe7da]/88 via-[#efe7da]/20 to-[#efe7da]/45" />
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(55,224,194,0.16),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl grid-cols-1 items-end gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-5xl space-y-8">
            <p className="hero-kicker text-xs font-semibold uppercase tracking-[0.36em] text-signal">
              摄影 / 剪辑 / 内容创作
            </p>

            <div className="space-y-6">
              <h1 className="hero-heading text-6xl font-semibold leading-[0.98] tracking-[-0.08em] text-[#1b2230] md:text-8xl lg:text-9xl">
  {heroTitle.map((line) => (
    <span key={line} className="block overflow-hidden">
      {line.split("").map((char, index) => (
        <span
          key={`${line}-${index}`}
          className="hero-char inline-block"
        >
          {char}
        </span>
      ))}
    </span>
  ))}
</h1>

              <p className="hero-copy max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
                生活里的很多瞬间如果不被记录，就会悄悄消失，而被镜头留下的画面，哪怕再普通，也会变得有重量。
              </p>
            </div>

            <div className="hero-actions flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-signal"
              >
                所有作品
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                关于我
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section relative overflow-hidden border-t border-black/10 bg-[#f7f3ec]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:120px_120px]" />

<div className="pointer-events-none absolute left-[-12%] top-[10%] h-[520px] w-[520px] rounded-full bg-signal/10 blur-[160px]" />
<div className="pointer-events-none absolute right-[-10%] bottom-[20%] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[160px]" />

<div className="pointer-events-none absolute left-8 top-28 hidden text-[11vw] font-semibold uppercase leading-none tracking-[-0.08em] text-white/[0.04] lg:block">
  WORKS
</div>

<div className="pointer-events-none absolute right-8 bottom-20 hidden text-[9vw] font-semibold uppercase leading-none tracking-[-0.08em] text-white/[0.04] lg:block">
  2026
</div>
        <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-24">
          <div className="section-title mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-signal">
                Selected Projects
              </p>
              <h2 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                精选作品
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-400">
              展示近期完成的一些作品。
            </p>
          </div>

          <div className="space-y-8">
            {featuredWork.map((work, index) => (
              <article
  key={work.title}
  className="project-row group relative grid gap-6 overflow-hidden rounded-[32px] border border-black/10 bg-[#fffaf0]/80 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-signal/60 hover:bg-white hover:shadow-[0_28px_110px_rgba(55,224,194,0.18)] lg:grid-cols-[0.95fr_1.05fr]"
>
  <div className="pointer-events-none absolute right-6 top-6 text-7xl font-semibold tracking-[-0.08em] text-black/[0.04]">
    {String(index + 1).padStart(2, "0")}
  </div>
                <div className="project-media overflow-hidden rounded-[24px] bg-black">
                  <video
                    src={work.videoSrc}
                    controls
                    className="aspect-video h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="project-info flex flex-col justify-between gap-10 p-2 lg:p-6">
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <span className="text-sm text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-10 bg-white/15" />
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">
                        {work.category}
                      </span>
                    </div>

                    <h3 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] transition group-hover:text-signal md:text-6xl">
                      {work.title}
                    </h3>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700">
                      {work.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <p className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                      Role
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {work.role.split(" / ").map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}