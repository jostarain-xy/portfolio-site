"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我" },
  { href: "/portfolio", label: "作品集" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050a10]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_18px_rgba(55,224,194,0.9)] transition group-hover:scale-125" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white transition group-hover:text-signal md:text-base md:tracking-[0.45em]">
            Joestar
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-xs text-slate-300 backdrop-blur md:gap-2 md:text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-full px-3 py-2 font-medium transition duration-300 md:px-4",
                  isActive
                    ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                    : "hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
