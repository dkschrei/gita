"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { canSynthesize } from "@/lib/progress";

const baseTabs = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
        <path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2V11z" />
      </svg>
    ),
  },
  {
    href: "/read",
    label: "Read",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
        <path d="M2 5l1 0a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3l-2 0z" />
        <path d="M22 5l-1 0a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3l2 0z" />
        <line x1="12" y1="9" x2="12" y2="20" />
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
    href: "/ask",
    label: "Ask",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const synthesisTab = {
  href: "/synthesis",
  label: "Synthesis",
  icon: (active: boolean) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
};

export default function TabBar() {
  const pathname = usePathname();
  const [showSynthesis, setShowSynthesis] = useState(false);

  useEffect(() => {
    setShowSynthesis(canSynthesize());
  }, [pathname]);

  const tabs = showSynthesis ? [...baseTabs, synthesisTab] : baseTabs;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile: bottom tab bar */}
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
                <span className="text-[9px] tracking-wide">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop: top horizontal nav */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-40 backdrop-blur-xl items-center"
        style={{
          background: "rgba(10, 8, 7, 0.85)",
          borderBottom: "0.5px solid rgba(217, 164, 65, 0.2)",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center px-6 lg:px-10 py-3">
          <div className="flex-1 flex items-baseline gap-2">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.22em] text-dust-200/60 hover:text-dharma-400 transition-colors"
            >
              The Bhagavad Gita
            </Link>
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
          <Link
            href="/profile"
            className={clsx(
              "ml-2 flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-medium transition-colors",
              pathname === "/profile"
                ? "bg-dharma-400/15 text-dharma-400"
                : "text-dust-200/70 hover:text-dharma-400 hover:bg-dust-800/40"
            )}
            title="Reader profile"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
            </svg>
            <span className="hidden lg:inline">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
