"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { testimonials as data } from "@/lib/content";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

type Testimonial = (typeof data)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

/** One quote at a time; no autoplay, so nothing moves unless the visitor asks. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const t = items[index];

  const go = (step: 1 | -1) => {
    setDir(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  return (
    <figure className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-9">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.blockquote
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, x: dir * -16, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
            className="t-h2 min-h-[8.5em] sm:min-h-[6.5em] lg:min-h-[5.2em]"
          >
            <span aria-hidden="true" className="serif-italic text-fg-muted">
              &ldquo;
            </span>
            {t.quote}
            <span aria-hidden="true" className="serif-italic text-fg-muted">
              &rdquo;
            </span>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-between gap-8 lg:col-span-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figcaption
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="flex items-center gap-4"
          >
            <span className="media size-14 shrink-0 rounded-full">
              <Image src={t.image} alt="" fill sizes="56px" className="object-cover" />
            </span>
            <span>
              <span className="block font-medium">{t.name}</span>
              <span className="block text-sm text-fg-muted">{t.detail}</span>
            </span>
          </motion.figcaption>
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} className="btn btn-outline size-12 px-0" aria-label="Previous testimonial">
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => go(1)} className="btn btn-outline size-12 px-0" aria-label="Next testimonial">
            <ArrowRight />
          </button>
          <p className="numeric ml-2 text-sm text-fg-muted" aria-live="polite">
            {index + 1} / {items.length}
          </p>
        </div>
      </div>
    </figure>
  );
}
