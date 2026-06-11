"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Blender",
  "ZBrush",
  "ChatGPT",
  "Codex",
  "Jimeng AI",
  "Kling",
];

const services = [
  "人物访谈剪辑",
  "宣传片制作",
  "婚拍 Vlog",
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

const introPhotos = introPhotoNumbers.map((number) => ({
  src: `/images/pic/${number}.jpg`,
  alt: `入场照片 ${number}`,
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

const profilePhoto = "/images/pic/person.jpg";

const qaItems = [
  {
    question: "稍微做个自我介绍吧？",
    answer:
      "Halo！我叫朱星宇，也可以叫我阿星。平时喜欢拍生活里的瞬间，也喜欢把音乐、画面和情绪剪到同一个节奏里。",
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
      "人物访谈、企业宣传片、婚拍 Vlog、纪实短视频和创作者内容剪辑。比起只是完成需求，我更希望把内容做得有观看体验。",
  },
  {
    question: "常用哪些工具？",
    answer:
      "常用 Premiere Pro、After Effects、DaVinci Resolve，也会使用 Blender、ZBrush，并结合 ChatGPT、Codex、Jimeng AI、Kling 等工具辅助创作。",
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

      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 34,
        filter: "blur(10px)",
        duration: 0.82,
        stagger: 0.08,
        delay: 2.75,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".qa-item").forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 48,
          filter: "blur(10px)",
          duration: 0.75,
          delay: index * 0.03,
          ease: "power3.out",
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
          y: 56,
          filter: "blur(10px)",
          duration: 0.8,
          ease: "power3.out",
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
      className="relative min-h-screen overflow-hidden bg-[#eaf8ff] text-[#10212b]"
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
              ABOUT / INTRO
            </p>
            <h2 className="font-serif text-[clamp(48px,8vw,88px)] font-normal italic leading-[0.78] tracking-[-0.06em] text-[#17334e]">
              Zhu
              <span className="block not-italic">Xingyu</span>
            </h2>
          </div>

          <div className="mt-8">
            <p className="max-w-[210px] text-[10px] font-semibold uppercase leading-[1.08] tracking-[-0.04em] text-[#10243a]/75">
              Photographer / editor / content creator.
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[-0.03em] text-[#10243a]/85">
              Profile -&gt;
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 gap-3 md:flex">
          {["PHOTO", "CUT", "STORY", "LIFE"].map((item, index) => (
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

      <div className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#70d3ff]/28 opacity-0 blur-[90px]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(18,92,125,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(18,92,125,0.16)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(112,211,255,0.34),transparent_31%),radial-gradient(circle_at_8%_70%,rgba(255,255,255,0.72),transparent_36%),linear-gradient(to_bottom,#eaf8ff,#dff3ff_52%,#f7fbff)]" />

      <section className={`page-shell relative z-10 mx-auto max-w-7xl px-6 py-24 ${styles.pageShell}`}>
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="hero-reveal mb-10 flex items-start justify-between border-b border-black/10 pb-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.34em] text-signal">
                  ABOUT / Q&A
                </p>

                <div className="mt-4 leading-none text-[#111827]">
                  <span className="block text-[42px] font-black tracking-[-0.08em] md:text-[56px]">
                    关于我
                  </span>
                </div>
              </div>

              <p className="hidden text-[11px] font-semibold tracking-[0.34em] text-slate-400 md:block">
                PERSONAL INTRO
              </p>
            </div>

            <div className="qa-intro">
              <h1 className="hero-reveal max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.06em] text-[#111827] md:text-6xl">
                “音乐是我的输氧管
                <br />
                摄影是我的呼吸机”
              </h1>

              <p className="hero-reveal mt-5 max-w-2xl text-base leading-8 text-slate-600">
                比起一份传统简历，我更想用轻松一点的方式，介绍我的专业背景、创作习惯和我对影像的理解。
              </p>
            </div>

            <div className="mt-10 space-y-10">
              {qaItems.map((item, index) => (
                <article
                  key={item.question}
                  className="qa-item group relative overflow-hidden border-t border-black/10 px-4 py-6 transition duration-300 hover:border-signal/50 hover:bg-white/35"
                >
                  <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-signal transition duration-300 group-hover:scale-y-100" />
                  <div className="flex items-start gap-4">
                    <span className="mt-1 shrink-0 text-[11px] font-semibold tracking-[0.30em] text-signal">
                      Q{String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
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

          <aside className="hero-reveal about-photo lg:sticky lg:top-28">
            <div className="profile-card rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur transition will-change-transform">
              <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white/70 p-3">
                <img
                  src={profilePhoto}
                  alt="个人介绍照片"
                  className="aspect-[4/5] w-full rounded-[18px] object-cover"
                />
              </div>

              <div className="mt-5 border-t border-black/10 pt-5">
                <p className="text-[11px] font-semibold tracking-[0.34em] text-signal">
                  ZHU XINGYU
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827]">
                  朱星宇
                </h2>

                <p className="mt-2 text-base text-slate-600">
                  摄影 / 剪辑 / 内容创作
                </p>

                <p className="mt-5 text-sm leading-7 text-slate-700">
                  喜欢记录生活里的瞬间，也喜欢把音乐、画面和情绪剪到同一个节奏里。希望每一条视频都不只是完成，而是好看。
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["热爱记录", "节奏剪辑", "生活感影像"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>

        <div className="mt-24 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="info-block group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/62 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_90px_rgba(55,224,194,0.14)]">
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
                  className="rounded-2xl border border-black/10 bg-white/65 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-white"
                >
                  <div className="mb-3 h-1.5 w-1.5 rounded-full bg-signal transition duration-300 group-hover:scale-[1.8]" />
                  <p className="text-sm font-semibold text-[#111827]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="info-block group relative overflow-hidden rounded-[32px] border border-black/10 bg-white/62 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_90px_rgba(55,224,194,0.14)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl transition duration-500 group-hover:bg-signal/20" />

            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-slate-500">
                  常用工具
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#111827]">
                  我的创作工具箱
                </h2>
              </div>

              <span className="hidden text-5xl font-black tracking-[-0.08em] text-black/[0.04] md:block">
                02
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-signal hover:text-black hover:shadow-[0_12px_30px_rgba(55,224,194,0.24)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="info-block mt-6 rounded-[32px] border border-black/10 bg-white/62 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
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
                        0{index + 1} / EXPERIENCE
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
