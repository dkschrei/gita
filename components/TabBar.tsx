"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  {
    href: "/",
    label: "Storyboard",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="12" y1="10" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    href: "/graph",
    label: "Graph",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="7" r="2.5" />
        <circle cx="12" cy="14" r="2.5" />
        <circle cx="6" cy="20" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <line x1="7" y1="7" x2="11" y2="13" />
        <line x1="17" y1="8" x2="13" y2="13" />
        <line x1="11" y1="15" x2="7" y2="19" />
        <line x1="13" y1="15" x2="17" y2="18" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <circle cx="12" cy="8" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

export default function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl"
      style={{
        background: "rgba(10, 8, 7, 0.85)",
        borderTop: "0.5px solid rgba(217, 164, 65, 0.2)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="max-w-md mx-auto flex">
        {tabs.map((t) => {
          const active = pathname === t.href || (t.href === "/" && pathname.startsWith("/storyboard"));
          return (
            <Link
              key={t.href}
              href={t.href}
              className={clsx(
                "flex-1 flex flex-col items-center justify-center gap-1 py-2.5",
                active ? "text-dharma-400" : "text-dust-200"
              )}
            >
              {t.icon(active)}
              <span className="text-[10px] tracking-wide">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
