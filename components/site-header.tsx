"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PillNav from "./pill-nav";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我" },
  { href: "/portfolio", label: "作品集" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const activeIndex = navItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050a10]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_18px_rgba(55,224,194,0.9)] transition group-hover:scale-125" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white transition group-hover:text-signal md:text-base md:tracking-[0.45em]">
            Joestar
          </span>
        </Link>

        <PillNav
          items={navItems}
          activeHref={navItems[Math.max(activeIndex, 0)]?.href}
          baseColor="#050a10"
          pillColor="#ffffff"
          pillTextColor="#050a10"
          hoveredPillTextColor="#ffffff"
          ease="power3.out"
        />
      </div>
    </header>
  );
}
