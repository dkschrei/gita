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
  const isActive = (href: string) =>
    pathname === href || (href === "/" && pathname.startsWith("/storyboard"));

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl md:hidden"
        style={{
          background: "rgba(10, 8, 7, 0.85)",
          borderTop: "0.5px solid rgba(217, 164, 65, 0.2)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="max-w-md mx-auto flex">
          {tabs.map((t) => {
            const active = isActive(t.href);
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

      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-40 backdrop-blur-xl items-center"
        style={{
          background: "rgba(10, 8, 7, 0.85)",
          borderBottom: "0.5px solid rgba(217, 164, 65, 0.2)",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="max-w-[1600px] mx-auto w-full flex items-center px-6 lg:px-12 xl:px-16 py-3">
          <div className="flex-1 flex items-baseline gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-dust-200/60">
              The Bhagavad Gita
            </span>
            <span className="text-[15px] font-serif-d text-dharma-400 hidden lg:inline">
              · Companion
            </span>
          </div>
          <div className="flex gap-1">
            {tabs.map((t) => {
              const active = isActive(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-[13px] font-medium transition-colors",
                    active
                      ? "bg-dharma-400 text-dust-900"
                      : "text-dust-100 hover:text-dharma-400 hover:bg-dust-800/40"
                  )}
                >
                  <span className="w-4 h-4 inline-flex">{t.icon(active)}</span>
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
