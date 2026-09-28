"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Community } from "@/lib/content";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

/** Native scroll-snap rail; the buttons page it by one card for mouse and keyboard users. */
export function CommunityRail({ items }: { items: Community[] }) {
  const rail = useRef<HTMLUListElement>(null);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="shell mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 className="t-h2" data-reveal="up">
            Where we work
          </h2>
          <p className="mt-3 max-w-md text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 1 }}>
            Ten communities we know street by street, from beach villas on the Palm to family homes in the Ranches.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => page(-1)} className="btn btn-outline size-12 px-0" aria-label="Previous communities">
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => page(1)} className="btn btn-outline size-12 px-0" aria-label="Next communities">
            <ArrowRight />
          </button>
        </div>
      </div>

      <ul
        ref={rail}
        data-reveal="up"
        className="rail"
        aria-label="Communities"
      >
        {items.map((c) => (
          <li key={c.slug}>
            <Link href={`/communities#${c.slug}`} className="zoom-trigger group block">
              <div className="media zoom-on-hover aspect-[3/4]">
                <Image src={c.image} alt={`${c.name}, Dubai`} fill sizes="(min-width: 768px) 22rem, 78vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_12_11/0.7),transparent_55%)]" />
                <div className="on-dark absolute inset-x-0 bottom-0 p-5 text-night-fg">
                  <h3 className="font-serif text-[1.875rem] leading-tight">{c.name}</h3>
                  <p className="mt-1 text-sm text-night-fg/80">{c.line}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
