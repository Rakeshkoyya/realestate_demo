"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { nav, site } from "@/lib/content";

const EASE_EMPHASIZED = [0.2, 0, 0, 1] as const;
const EASE_EXIT = [0.4, 0, 1, 1] as const;

type MobileMenuProps = { pathname: string; onClose: (restoreFocus?: boolean) => void };

/** Full-screen menu that opens downward from the header like a blind. */
export function MobileMenu({ pathname, onClose }: MobileMenuProps) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    firstLink.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const links = [{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }];

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="on-dark fixed inset-0 z-40 flex flex-col bg-night text-night-fg lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)", transition: { duration: 0.56, ease: EASE_EMPHASIZED } }}
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.28, ease: EASE_EXIT } }}
    >
      <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto pt-[calc(var(--header-h)+2rem)]">
        <ul className="grid gap-1">
          {links.map((item, i) => {
            const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.14 + i * 0.05, duration: 0.5, ease: EASE_EMPHASIZED } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  onClick={() => onClose(false)}
                  aria-current={current ? "page" : undefined}
                  className="flex items-baseline justify-between border-b border-night-rule py-3 font-serif text-[2.25rem] leading-tight"
                >
                  <span className={current ? "serif-italic" : ""}>{item.label}</span>
                  {current ? <span className="t-label font-sans text-night-muted">You are here</span> : null}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
      <motion.div
        className="shell grid gap-1 pb-8 pt-6 text-sm text-night-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.45, duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <a href={site.phoneHref} className="text-night-fg">
          {site.phone}
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <p>{site.address[0]}, DIFC</p>
      </motion.div>
    </motion.div>
  );
}
