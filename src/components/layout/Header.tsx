"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { nav } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

const HIDE_AFTER_PX = 480;
const SOLID_AFTER_PX = 24;

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > SOLID_AFTER_PX);
      if (y > last + 4 && y > HIDE_AFTER_PX) setHidden(true);
      else if (y < last - 4 || y <= HIDE_AFTER_PX) setHidden(false);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  const onHero = pathname === "/" && !scrolled;
  const light = onHero || open;
  const solid = scrolled && !open;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${light ? "text-night-fg on-dark" : "text-fg"}`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 border-b border-rule bg-canvas transition-opacity duration-[var(--dur-base)]"
          style={{ opacity: solid ? 1 : 0 }}
        />
        <div className="shell relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="Sahra Estates, home" onClick={() => setOpen(false)} className="rounded-sm">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.9375rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`btn hidden min-h-11 px-5 text-sm md:inline-flex ${light ? "btn-ghost-light" : "btn-outline"}`}
            >
              Book a consultation
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex min-h-11 items-center gap-3 rounded-full px-2 text-[0.9375rem] font-medium lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open ? <MobileMenu pathname={pathname} onClose={closeMenu} /> : null}</AnimatePresence>
    </>
  );
}
