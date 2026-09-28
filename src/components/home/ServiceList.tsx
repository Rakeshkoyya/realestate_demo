"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/lib/content";
import { ArrowRight } from "@/components/ui/Icons";

/** Service rows; the photograph beside them follows whichever row is hovered or focused. */
export function ServiceList({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {items.map((s, i) => (
          <li key={s.id} data-reveal="up" style={{ ["--i" as string]: i }} className="border-t border-rule last:border-b">
            <Link
              href={`/services#${s.id}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid gap-2 py-6 md:grid-cols-[1fr_1.3fr_auto] md:items-center md:gap-8 md:py-8"
            >
              <span
                className={`font-serif text-[2rem] leading-none transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] md:text-[2.5rem] ${
                  active === i ? "md:translate-x-2" : ""
                }`}
              >
                {s.title}
              </span>
              <span className="text-fg-muted">{s.short}</span>
              <span
                aria-hidden="true"
                className={`hidden size-11 place-items-center rounded-full border transition-colors duration-[var(--dur-base)] md:grid ${
                  active === i ? "border-fg bg-fg text-canvas" : "border-rule-strong"
                }`}
              >
                <ArrowRight size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="media aspect-[4/5]" data-reveal="fade">
            {items.map((s, i) => (
              <Image
                key={s.id}
                src={s.image}
                alt=""
                fill
                sizes="40vw"
                className={`object-cover transition-[opacity,transform] duration-[var(--dur-slow)] ease-[var(--ease-out)] ${
                  active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
            <p className="absolute bottom-4 left-4 rounded-full bg-canvas/90 px-3 py-1 text-xs font-medium">
              {items[active]?.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
