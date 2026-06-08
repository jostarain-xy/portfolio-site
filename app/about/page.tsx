"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const skills = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Blender",
  "ZBrush",
  "ChatGPT",
  "Codex",
  "即梦 AI",
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
const qaItems = [
  {
    question: "稍微做个自我介绍吧？",
    answer:
      "halo!我叫朱星宇，你也可以叫我阿星。平时喜欢拍一些生活里的瞬间，也喜欢把音乐、画面和情绪剪到同一个节奏里！",
  },
  {
    question: "那阿星你是什么时候接触的摄影以及为什么会喜欢影像？",
    answer:
      "接触摄影是从大一开始吧，喜欢记录生活加入了校新媒体部门开始拍！因为我觉得很多普通的瞬间，一旦被镜头留下，就会突然变得有重量。对我来说，摄影像是在保存生活，剪辑则是在重新整理这些瞬间被看见的方式。",
  },
  {
    question: "校园生活是怎么样的？",
    answer:
      "我呢毕业于邵阳学院影视传播专业,在校专业排名前3%，每年都有拿校级奖学金，毕业时也被评为湖南省级、邵阳学院校级优秀毕业生。在校期间我也参加过一些比赛，像是大学生广告艺术大赛、互联网+创新创业大赛等，拿过一些奖项。通过这些经历，我积累了不少拍摄和剪辑的实战经验，也锻炼了我的创意思维和团队协作能力。",
  },
  {
    question: "那对于一段影片，你认为最重要的是什么？或者你剪片子最在意什么？",
    answer:
      "对我来说，一段影片最重要的是声音。无论是环境音还是背景音乐，一段精心设计的声音有时候比画面带来冲击更大。而且声音影响着影片的节奏和情绪。什么时候让画面停一下，什么时候让音乐推起来，什么时候让一句话落在刚好的位置，这些细节会决定一条片子好不好看。",
  },
  {
    question: "擅长什么类型的内容？",
    answer:
      "人物访谈、企业宣传片、婚拍 Vlog、纪实短视频和创作者内容剪辑。接触摄影这么长时间,我从最初被作品打动，到逐渐尝试用影像表达情绪与故事。早期参与宣传片与纪录类拍摄,更多是完成信息与需求的传递;后来开始转向婚拍与vlog创作,尝试捕捉人与人之间更细腻的情感,也在不断拍摄与复盘中建立自己的“影像感觉”。"
  },
  {
    question: "常用哪些工具？",
    answer:
      "剪辑常用 Premiere Pro、After Effects以及DaVinci Resolve和剪映,对于三维也使用 Blender、ZBrush等软件。现在随着ai的进步,我也同时会结合 ChatGPT、即梦 AI、Kling 等工具辅助创作视频。还有本地部署codex来辅助我完成一些整理工作和代码编写。(现在这个网站就是我自己搭建codex辅助部署的!)",
  },
];
const experiences = [
  {
    title: "江苏中源工程管理股份有限公司",
    time: "2025.07 - 至今",
    role: "运营剪辑 / 内容制作",
    description:
      "负责打造并运营公司个人 IP 账号「喜哥世界」，独立完成选题策划、拍摄执行、后期剪辑与包装，制作经济科普、人物访谈及纪实类短视频内容。",
  },
  {
    title: "江苏风云动画有限公司",
    time: "2025.02 - 2025.04",
    role: "动画实习 ",
    description:
      "参与公司日常工作，了解三维动画制作流程，包括建模、绑定、渲染等环节，也进一步理解影像项目从前期到后期的协作方式。",
  },
];

export default function AboutPage() {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
  () => {
    const tl = gsap.timeline();

    const glow = container.current?.querySelector(".cursor-glow");
if (!glow) return;
const moveGlowX = gsap.quickTo(glow, "x", {
  duration: 0.45,
  ease: "power3.out",
});
if (!glow) return;
const moveGlowY = gsap.quickTo(glow, "y", {
  duration: 0.45,
  ease: "power3.out",
});

const handleMouseMove = (event: MouseEvent) => {
  moveGlowX(event.clientX);
  moveGlowY(event.clientY);
if (!glow) return;
  gsap.to(glow, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};
if (!glow) return;
const handleMouseLeave = () => {
  gsap.to(glow, {
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
  });
};
const profileCard =
  container.current?.querySelector<HTMLElement>(".profile-card");

const handleCardMove = (event: Event) => {
  if (!profileCard) return;

  const mouseEvent = event as MouseEvent;
  const rect = profileCard.getBoundingClientRect();

  const x = mouseEvent.clientX - rect.left;
  const y = mouseEvent.clientY - rect.top;

  const rotateY = (x / rect.width - 0.5) * 8;
  const rotateX = -(y / rect.height - 0.5) * 8;

  gsap.to(profileCard, {
    rotateX,
    rotateY,
    scale: 1.02,
    duration: 0.45,
    ease: "power3.out",
    transformPerspective: 900,
  });
};

const handleCardLeave = () => {
  if (!profileCard) return;

  gsap.to(profileCard, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.55,
    ease: "power3.out",
  });
};

if (profileCard) {
  profileCard.addEventListener("mousemove", handleCardMove);
  profileCard.addEventListener("mouseleave", handleCardLeave);
};

profileCard?.addEventListener("mousemove", handleCardMove);
profileCard?.addEventListener("mouseleave", handleCardLeave);

window.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseleave", handleMouseLeave);
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

    tl.from(".qa-kicker", {
      opacity: 0,
      y: 18,
      duration: 0.6,
      ease: "power3.out",
    });

    tl.from(
      ".about-photo",
      {
        opacity: 0,
        scale: 0.94,
        rotate: -1.5,
        duration: 0.9,
        ease: "power4.out",
      },
      "-=0.45"
    );


    tl.from(
      ".qa-side-char",
      {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
      },
      "-=0.9"
    );

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

gsap.utils.toArray<HTMLElement>(".chip-group").forEach((group) => {
  const chips = group.querySelectorAll(".mini-chip");

  gsap.fromTo(
    chips,
    {
      opacity: 0,
      y: 16,
      scale: 0.94,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: group.closest(".info-block") || group,
        start: "top 80%",
        once: true,
      },
    }
  );
});

gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    x: index % 2 === 0 ? -36 : 36,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      once: true,
    },
  });
});
    return () => {
  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", handleMouseLeave);
  profileCard?.removeEventListener("mousemove", handleCardMove);
profileCard?.removeEventListener("mouseleave", handleCardLeave);

};
  },
  { scope: container }
);

  return (
    <main
      ref={container}
      className="relative min-h-screen overflow-hidden bg-[#f4f1ea] text-[#111827]"
    >
      <div className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 opacity-0 blur-[90px]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(17,24,39,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.28)_1px,transparent_1px)] [background-size:120px_120px]" />

<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(55,224,194,0.16),transparent_30%),linear-gradient(to_bottom,#f4f1ea,#efe7da)]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
  {/* 左侧内容区 */}
  <div>
    {/* 左上角小型“关于我”标题 */}
    <div className="mb-10 flex items-start justify-between border-b border-black/10 pb-6">
      <div>
        <p className="qa-kicker text-[11px] font-semibold tracking-[0.34em] text-signal">
          ABOUT / Q&A
        </p>

        <div className="mt-4 leading-none text-[#111827]">
          <span className="qa-side-char block text-[42px] font-black tracking-[-0.08em] md:text-[56px]">
            关 于 我
          </span>
        </div>
      </div>

      <p className="hidden text-[11px] font-semibold tracking-[0.34em] text-slate-400 md:block">
        PERSONAL INTRO
      </p>
    </div>

    {/* 主标题 */}
    <div className="qa-intro">
      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.06em] text-[#111827] md:text-6xl">
        “音乐是我的输氧管
        <br />
        摄影是我的呼吸机”
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
        比起一份传统简历，我更想用轻松一点的方式，介绍我的专业背景、创作习惯和我对影像的理解。
      </p>
    </div>

    {/* Q&A 列表 */}
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

  {/* 右侧人物卡片 */}
  <aside className="about-photo lg:sticky lg:top-28">
    <div className="profile-card rounded-[28px] border border-black/10 bg-[#fffaf0]/88 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur transition will-change-transform">
      <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white/70 p-3">
        <img
          src="/images/person.png"
          alt="朱星宇个人照片"
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
          喜欢记录生活里的瞬间，也喜欢把音乐、画面和情绪剪到同一个节奏里。
          我更在意内容的观看体验，希望每一条视频都不只是“完成”，而是“好看”。
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
  <section className="info-block group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#fffaf0]/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_90px_rgba(55,224,194,0.14)]">
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

    <div className="chip-group grid gap-3 sm:grid-cols-2">
      {services.map((item) => (
        <div
          key={item}
          className="mini-chip group/chip rounded-2xl border border-black/10 bg-white/65 px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-white"
        >
          <div className="mb-3 h-1.5 w-1.5 rounded-full bg-signal transition duration-300 group-hover/chip:scale-[1.8]" />
          <p className="text-sm font-semibold text-[#111827]">
            {item}
          </p>
        </div>
      ))}
    </div>
  </section>

  <section className="info-block group relative overflow-hidden rounded-[32px] border border-black/10 bg-[#fffaf0]/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_90px_rgba(55,224,194,0.14)]">
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

    <div className="chip-group flex flex-wrap gap-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className="mini-chip rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-slate-700 transition duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-signal hover:text-black hover:shadow-[0_12px_30px_rgba(55,224,194,0.24)]"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
</div>

<section className="info-block mt-6 rounded-[32px] border border-black/10 bg-[#fffaf0]/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
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
      以内容制作为核心，参与过短视频运营、人物访谈、三维动画流程等不同类型项目。
    </p>
  </div>

  <div className="relative">
    <div className="pointer-events-none absolute left-[11px] top-2 hidden h-[calc(100%-16px)] w-px bg-black/10 md:block" />

    <div className="grid gap-5">
      {experiences.map((item, index) => (
        <article
          key={item.title}
          className="experience-card group relative rounded-[24px] border border-black/10 bg-white/70 p-5 transition duration-500 hover:-translate-y-1 hover:border-signal/60 hover:bg-white hover:shadow-[0_24px_80px_rgba(55,224,194,0.14)] md:ml-10"
        >
          <div className="absolute -left-[46px] top-7 hidden h-6 w-6 rounded-full border border-black/10 bg-[#fffaf0] p-1 md:block">
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

            <p className="rounded-full border border-black/10 bg-[#fffaf0]/80 px-4 py-2 text-sm text-slate-600">
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