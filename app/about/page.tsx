"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withBasePath } from "@/lib/site-paths";
import styles from "./about.module.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Premiere Pro", src: withBasePath("/images/软件logo/Premiere Pro.png"), color: "#9999ff" },
  { name: "After Effects", src: withBasePath("/images/软件logo/After Effects.png"), color: "#d8a6ff" },
  { name: "DaVinci Resolve", src: withBasePath("/images/软件logo/DaVinc.png"), color: "#9ce8ff" },
  { name: "剪映", src: withBasePath("/images/软件logo/剪映.png"), color: "#54f3ff" },
  { name: "Blender", src: withBasePath("/images/软件logo/blender.jpg"), color: "#ff9a2e" },
  { name: "ZBrush", src: withBasePath("/images/软件logo/ZBrush.jpg"), color: "#f2f2f2" },
  { name: "ChatGPT", src: withBasePath("/images/软件logo/chatgpt.png"), color: "#7de5c3" },
  { name: "Codex", src: withBasePath("/images/软件logo/codex.png"), color: "#37e0c2" },
  { name: "Jimeng AI", src: withBasePath("/images/软件logo/即梦.jpg"), color: "#ffc7e8" },
  { name: "Kling", src: withBasePath("/images/软件logo/可灵.png"), color: "#8fe7ff" },
];

const services = [
  "人物访谈剪辑",
  "宣传片制作",
  "婚拍影像",
  "短视频包装",
  "纪实影像",
  "内容结构整理",
];

const introPhotoNumbers = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
];

const deferredIntroPhotoNumbers = new Set(["23", "24", "25", "26", "27", "28", "29"]);

const introPhotos = introPhotoNumbers.map((number) => ({
  src: withBasePath(`/images/pic/${number}.jpg`),
  alt: `入场照片 ${number}`,
  defer: deferredIntroPhotoNumbers.has(number),
}));

const introMasonryClasses = [
  "object-center",
  "object-left",
  "object-right",
  "object-top",
  "object-bottom",
  "object-center",
  "object-left",
  "object-right",
  "object-top",
  "object-bottom",
  "object-center",
  "object-left",
];

const profilePhoto = withBasePath("/images/pic/person.jpg");

const studioSignals = [
  { label: "影像语气", value: "纪实 / 情绪 / 节奏" },
  { label: "工作方式", value: "拍摄到剪辑闭环" },
  { label: "画面偏好", value: "干净构图 / 生活感" },
];

const timelineFrames = [
  withBasePath("/images/pic/03.jpg"),
  withBasePath("/images/pic/08.jpg"),
  withBasePath("/images/pic/14.jpg"),
  withBasePath("/images/pic/21.jpg"),
];

const qaItems = [
  {
    question: "稍微做个自我介绍吧？",
    answer:
      "你好！我叫朱星宇，也可以叫我阿星。平时喜欢拍生活里的瞬间，也喜欢把音乐、画面和情绪剪到同一个节奏里。",
  },
  {
    question: "什么时候开始接触摄影，为什么喜欢影像？",
    answer:
      "我是从大学开始系统接触摄影的。影像对我来说像是在保存生活，剪辑则是在重新整理这些瞬间被看见的方式。",
  },
  {
    question: "校园生活是怎样的？",
    answer:
      "我毕业于邵阳学院影视传播专业，在校期间拿过奖学金，也参与过广告艺术大赛、互联网+创新创业大赛等项目，积累了拍摄和剪辑经验。",
  },
  {
    question: "一段影片里你最在意什么？",
    answer:
      "我很在意声音、节奏和情绪落点。什么时候停顿，什么时候让音乐推起来，什么时候让一句话落在刚好的位置，这些都会决定片子好不好看。",
  },
  {
    question: "擅长什么类型的内容？",
    answer:
      "人物访谈、企业宣传片、婚拍影像、纪实短视频和创作者内容剪辑。比起只是完成需求，我更希望把内容做得有观看体验。",
  },
  {
    question: "常用哪些工具？",
    answer:
      "剪辑上常用 Premiere Pro、After Effects、DaVinci Resolve 和剪映，能完成节奏剪辑、包装和基础调色；创作中会结合 ChatGPT、Codex、Jimeng AI、Kling 等 AI 工具提升策划、文案、视觉生成和效率，也具备一定网页搭建与前端实现能力，这个作品集网站就是我自己搭建完成的。",
  },
];

const experiences = [
  {
    title: "江苏中源工程管理股份有限公司",
    time: "2025.07 - 至今",
    role: "运营剪辑 / 内容制作",
    description:
      "负责公司个人 IP 账号内容制作，独立完成选题策划、拍摄执行、后期剪辑与包装。",
  },
  {
    title: "江苏风云动画有限公司",
    time: "2025.02 - 2025.04",
    role: "动画实习",
    description:
      "参与公司日常工作，了解三维动画制作流程，包括建模、绑定、渲染等环节。",
  },
];

export default function AboutPage() {
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const glow = root.querySelector<HTMLElement>(".cursor-glow");
      const profileCard = root.querySelector<HTMLElement>(".profile-card");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (glow) {
        const moveGlowX = gsap.quickTo(glow, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        const moveGlowY = gsap.quickTo(glow, "y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const handleMouseMove = (event: MouseEvent) => {
          moveGlowX(event.clientX);
          moveGlowY(event.clientY);
          gsap.to(glow, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        cleanups.push(() => {
          window.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseleave", handleMouseLeave);
        });
      }

      if (profileCard) {
        const handleCardMove = (event: MouseEvent) => {
          const rect = profileCard.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = (x / rect.width - 0.5) * 9;
          const rotateX = -(y / rect.height - 0.5) * 9;

          gsap.to(profileCard, {
            rotateX,
            rotateY,
            scale: 1.025,
            duration: 0.45,
            ease: "power3.out",
            transformPerspective: 900,
          });
        };

        const handleCardLeave = () => {
          gsap.to(profileCard, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          });
        };

        profileCard.addEventListener("mousemove", handleCardMove);
        profileCard.addEventListener("mouseleave", handleCardLeave);
        cleanups.push(() => {
          profileCard.removeEventListener("mousemove", handleCardMove);
          profileCard.removeEventListener("mouseleave", handleCardLeave);
        });
      }

      if (reduceMotion) {
        gsap.set(".intro-loader", { display: "none" });
        gsap.set(".page-shell", { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      introTimeline
        .to(".page-shell", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.76,
        }, 0.98)
        .from(".hero-reveal", {
          opacity: 0,
          y: 28,
          filter: "blur(12px)",
          duration: 0.78,
          stagger: 0.055,
        }, 1.02)
        .from(".studio-signal", {
          opacity: 0,
          y: 18,
          filter: "blur(8px)",
          duration: 0.58,
          stagger: 0.045,
        }, 1.16)
        .from(".frame-tile", {
          opacity: 0,
          y: 18,
          scale: 0.96,
          filter: "blur(8px)",
          duration: 0.66,
          stagger: 0.04,
        }, 1.22);

      gsap.utils.toArray<HTMLElement>(".qa-item").forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 28,
          filter: "blur(7px)",
          duration: 0.68,
          delay: index * 0.025,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".info-block").forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 34,
          filter: "blur(7px)",
          duration: 0.72,
          ease: "power4.out",
          scrollTrigger: {
            trigger: block,
            start: "top 82%",
            once: true,
          },
        });
      });

    }, root);

    return () => {
      ctx.revert();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main
      ref={container}
      className="relative min-h-screen overflow-hidden bg-[#edf7fb] text-[#10212b]"
    >
      <section className={`intro-loader fixed inset-0 z-50 overflow-hidden bg-[#b9dfff] text-[#10243a] ${styles.introLoader}`}>
        <div className="relative z-10 grid h-[calc(100vh-78px)] grid-cols-4 grid-rows-[repeat(7,minmax(0,1fr))] gap-1.5 p-1.5 sm:grid-cols-7 sm:grid-rows-[repeat(4,minmax(0,1fr))] md:gap-3 md:p-3">
          {introPhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`nrly-photo min-h-0 overflow-hidden bg-white shadow-[0_18px_44px_rgba(21,78,125,0.16)] will-change-transform ${styles.photo}`}
              style={{
                animationDelay: `${0.42 + Math.abs(index - (introPhotos.length - 1) / 2) * 0.018}s`,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={photo.defer ? "lazy" : "eager"}
                fetchPriority={photo.defer ? "low" : "auto"}
                decoding="async"
                className={`h-full w-full object-cover ${introMasonryClasses[index % introMasonryClasses.length]}`}
                draggable={false}
              />
            </figure>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.36),transparent_25%),radial-gradient(circle_at_74%_72%,rgba(23,89,146,0.2),transparent_34%)] mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,rgba(12,52,88,0.34)_0.7px,transparent_0.7px)] [background-size:3px_3px]" />

        <div className={`nrly-center-card absolute left-1/2 top-1/2 z-20 flex w-[min(78vw,300px)] -translate-x-1/2 -translate-y-1/2 flex-col justify-between bg-[#b7ddff]/92 px-7 py-8 shadow-[0_20px_80px_rgba(21,78,125,0.24)] backdrop-blur-sm md:min-h-[360px] md:w-[min(24vw,360px)] ${styles.centerCard}`}>
          <div>
            <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/50">
              个人介绍
            </p>
            <h2 className="font-serif text-[clamp(48px,8vw,88px)] font-normal italic leading-[0.78] tracking-[-0.06em] text-[#17334e]">
              朱
              <span className="block not-italic">星宇</span>
            </h2>
          </div>

          <div className="mt-8">
            <p className="max-w-[210px] text-[10px] font-semibold uppercase leading-[1.08] tracking-[-0.04em] text-[#10243a]/75">
              摄影 / 剪辑 / 内容创作
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[-0.03em] text-[#10243a]/85">
              查看资料 -&gt;
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 gap-3 md:flex">
          {["摄影", "剪辑", "故事", "生活"].map((item, index) => (
            <span
              key={item}
              className={`nrly-pill rounded-full bg-white/86 px-5 py-3 text-xs font-semibold tracking-[-0.04em] text-[#10243a]/68 shadow-[0_12px_30px_rgba(21,78,125,0.14)] ${styles.pill}`}
              style={{ animationDelay: `${1.78 + index * 0.08}s` }}
            >
              {item}
            </span>
          ))}
        </div>

        <div className={`nrly-cover pointer-events-none absolute inset-0 z-30 origin-center bg-[#8fc7f6] shadow-[0_0_120px_rgba(21,78,125,0.18)] ${styles.cover}`}>
          <div className="absolute inset-0 opacity-[0.2] [background-image:radial-gradient(circle,rgba(9,43,74,0.34)_0.8px,transparent_0.8px)] [background-size:3px_3px]" />
        </div>
      </section>

      <div className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#37e0c2]/18 opacity-0 blur-[96px]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(16,33,43,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,33,43,0.10)_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(55,224,194,0.22),transparent_26%),radial-gradient(circle_at_12%_74%,rgba(140,198,255,0.28),transparent_33%),linear-gradient(135deg,#f7fbff_0%,#e7f5fb_46%,#f8fbf8_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-24 z-[1] h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <section className={`page-shell relative z-10 mx-auto max-w-[1380px] px-5 py-14 md:px-8 md:py-24 ${styles.pageShell}`}>
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] lg:items-start">
          <div className="rounded-[34px] border border-black/10 bg-white/[0.48] p-4 shadow-[0_26px_90px_rgba(15,23,42,0.07)] backdrop-blur-xl md:p-8">
            <div className="hero-reveal mb-5 flex items-start justify-between border-b border-black/10 pb-4 md:mb-8 md:pb-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.34em] text-signal">
                  ABOUT / 问答
                </p>

                <div className="mt-4 leading-none text-[#111827]">
                  <span className="block text-[34px] font-black tracking-[-0.08em] md:text-[56px]">
                    关于我
                  </span>
                </div>
              </div>

              <p className="hidden text-[11px] font-semibold tracking-[0.34em] text-slate-400 md:block">
                个人介绍
              </p>
            </div>

            <div className="qa-intro">
              <div className="hero-reveal relative max-w-4xl border-y border-black/10 py-4 md:py-5">
                <div className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  <span>个人介绍</span>
                  <span className="h-px flex-1 bg-black/10" />
                  <span className="text-signal">01</span>
                </div>

                <div className={styles.statementCard}>
                  <div className={styles.statementBody}>
                    <div className={styles.waveBars} aria-hidden="true">
                      {[42, 68, 34, 86, 52, 74, 44, 92, 58, 76].map(
                        (height, index) => (
                          <span
                            key={`${height}-${index}`}
                            style={
                              {
                                "--bar-height": `${height}%`,
                                "--bar-delay": `${index * 0.08}s`,
                            } as CSSProperties
                            }
                          />
                        ),
                      )}
                    </div>

                    <h1 className={styles.statementTitle}>
                      <span className={styles.statementLine}>
                        音乐是我的
                        <span className={styles.outlineWord}>输氧管</span>
                      </span>
                      <span className={styles.statementLine}>
                        摄影是我的
                        <span className={styles.solidWord}>呼吸机</span>
                      </span>
                    </h1>
                  </div>
                </div>
              </div>

              <p className="hero-reveal mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:mt-6 md:text-base md:leading-8">
                比起一份传统简历，我更想用轻松一点的方式，介绍我的专业背景、创作习惯和我对影像的理解。
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 md:mt-7 md:gap-3">
                {studioSignals.map((item) => (
                  <div
                    key={item.label}
                    className="studio-signal rounded-[16px] border border-black/10 bg-white/62 p-3 shadow-[0_14px_38px_rgba(15,23,42,0.05)] md:rounded-[18px] md:p-4"
                  >
                    <p className="text-[9px] font-semibold tracking-[0.18em] text-slate-400 md:text-[10px] md:tracking-[0.24em]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-5 tracking-[-0.03em] text-[#111827] md:mt-3 md:text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hero-reveal mt-4 overflow-hidden rounded-[26px] border border-black/10 bg-[#101820] p-3 text-white shadow-[0_20px_70px_rgba(15,23,42,0.16)] lg:hidden">
                <div className="grid grid-cols-[0.84fr_1fr] gap-3">
                  <img
                    src={profilePhoto}
                    alt="个人介绍照片"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] h-full w-full rounded-[18px] object-cover"
                  />
                  <div className="flex min-w-0 flex-col justify-between py-1">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-signal">
                        Zhu Xing Yu
                      </p>
                      <p className="mt-2 text-xl font-semibold tracking-[-0.05em]">
                        摄影 / 剪辑
                      </p>
                      <p className="mt-2 text-xs leading-5 text-white/62">
                        用画面记录生活，用节奏整理情绪。
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {timelineFrames.map((frame, index) => (
                        <img
                          key={frame}
                          src={frame}
                          alt={`创作帧 ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="frame-tile aspect-square rounded-[10px] object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-9 grid gap-3">
              {qaItems.map((item, index) => (
                <article
                  key={item.question}
                  className="qa-item group relative overflow-hidden rounded-[24px] border border-black/10 bg-white/46 px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-signal/50 hover:bg-white/78 hover:shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
                >
                  <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-signal transition duration-300 group-hover:scale-y-100" />
                  <div className="flex items-start gap-4 md:gap-5">
                    <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-[11px] font-semibold tracking-[-0.03em] text-signal shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                      Q{String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold leading-snug tracking-[-0.03em] text-[#111827] transition duration-300 group-hover:translate-x-1 group-hover:text-signal md:text-xl">
                        {item.question}
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 transition duration-300 group-hover:translate-x-1 md:text-[15px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-reveal about-photo hidden lg:sticky lg:top-24 lg:block">
            <div className="profile-card relative overflow-hidden rounded-[34px] border border-black/10 bg-[#101820] p-4 shadow-[0_28px_100px_rgba(15,23,42,0.20)] transition will-change-transform">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(55,224,194,0.22),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_46%)]" />

              <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-white/10 p-3">
                <img
                  src={profilePhoto}
                  alt="个人介绍照片"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[20px] object-cover grayscale-[12%]"
                />
                <div className="pointer-events-none absolute inset-3 rounded-[20px] ring-1 ring-white/10" />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 h-24 rounded-b-[20px] bg-gradient-to-t from-black/38 to-transparent" />
              </div>
            </div>

            <div className="hero-reveal mt-4 rounded-[28px] border border-black/10 bg-white/60 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                <span>Timeline</span>
                <span>00:18</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timelineFrames.map((frame, index) => (
                  <div
                    key={frame}
                    className={`frame-tile ${styles.timelineFrame} overflow-hidden rounded-[14px] border border-black/10 bg-black/5 p-1`}
                  >
                    <img
                      src={frame}
                      alt={`创作帧 ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full rounded-[10px] object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="h-1 rounded-full bg-gradient-to-r from-signal to-signal/20" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  剪辑
                </span>
                <div className="h-1 rounded-full bg-black/10" />
              </div>
            </div>

            <div className="hero-reveal relative mt-4 overflow-hidden rounded-[28px] border border-black/10 bg-white/62 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-signal/10 blur-3xl" />

              <div className="relative mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    创作方向
                  </p>

                  <h2 className="text-2xl font-semibold tracking-[-0.05em] text-[#111827]">
                    我可以做什么？
                  </h2>
                </div>

                <span className="text-4xl font-black tracking-[-0.08em] text-black/[0.04]">
                  01
                </span>
              </div>

              <div className="relative grid gap-2">
                {services.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-[18px] border border-black/10 bg-white/64 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-signal/60 hover:bg-white"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal transition duration-300 group-hover:scale-[1.8]" />
                    <p className="text-sm font-semibold text-[#111827]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <div className="mt-8">
          <section className="info-block group relative overflow-hidden rounded-[30px] border border-black/10 bg-white/58 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/84 hover:shadow-[0_26px_90px_rgba(55,224,194,0.12)] lg:hidden">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-signal/10 blur-3xl transition duration-500 group-hover:bg-signal/20" />

            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-slate-500">
                  创作方向
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#111827]">
                  我可以做什么？
                </h2>
              </div>

              <span className="hidden text-5xl font-black tracking-[-0.08em] text-black/[0.04] md:block">
                01
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-black/10 bg-white/64 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-white"
                >
                  <div className="mb-3 h-1.5 w-1.5 rounded-full bg-signal transition duration-300 group-hover:scale-[1.8]" />
                  <p className="text-sm font-semibold text-[#111827]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="info-block group relative overflow-hidden rounded-[30px] border border-black/10 bg-[#101820] p-7 text-white shadow-[0_20px_70px_rgba(15,23,42,0.11)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(15,23,42,0.18)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl transition duration-500 group-hover:bg-signal/20" />

            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-white/42">
                  常用工具
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                  我的创作工具箱
                </h2>
              </div>

              <span className="hidden text-5xl font-black tracking-[-0.08em] text-white/[0.08] md:block">
                02
              </span>
            </div>

            <div className={styles.toolGrid}>
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={styles.toolIconCard}
                  style={
                    {
                      "--tool-color": skill.color,
                    } as CSSProperties
                  }
                >
                  <span className={styles.toolLogo} aria-hidden="true">
                    <img src={skill.src} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className={styles.toolName}>{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="info-block mt-5 rounded-[30px] border border-black/10 bg-white/58 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-slate-500">
                工作经历
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#111827]">
                在真实项目里成长
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600">
              以内容制作为核心，参与过短视频运营、人物访谈、宣传片与三维动画流程等不同类型项目。
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-[11px] top-2 hidden h-[calc(100%-16px)] w-px bg-black/10 md:block" />

            <div className="grid gap-5">
              {experiences.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative rounded-[24px] border border-black/10 bg-white/70 p-5 transition duration-500 hover:-translate-y-1 hover:border-signal/60 hover:bg-white hover:shadow-[0_24px_80px_rgba(55,224,194,0.14)] md:ml-10"
                >
                  <div className="absolute -left-[46px] top-7 hidden h-6 w-6 rounded-full border border-black/10 bg-[#eaf8ff] p-1 md:block">
                    <div className="h-full w-full rounded-full bg-signal transition duration-300 group-hover:scale-125" />
                  </div>

                  <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <p className="mb-2 text-xs font-semibold tracking-[0.26em] text-signal">
                        0{index + 1} / {index === 0 ? "工作经历" : "实习经历"}
                      </p>

                      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#111827]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-signal">
                        {item.role}
                      </p>
                    </div>

                    <p className="rounded-full border border-black/10 bg-white/62 px-4 py-2 text-sm text-slate-600">
                      {item.time}
                    </p>
                  </div>

                  <p className="text-sm leading-7 text-slate-700">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
