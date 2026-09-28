"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Close, Expand } from "@/components/ui/Icons";

type GalleryProps = { images: string[]; title: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Photo grid that opens a native <dialog> lightbox (focus trap, Escape and inert page for free). */
export function Gallery({ images, title }: GalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: 1 | -1) => setIndex((i) => (i + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <>
      <ul className="grid grid-cols-6 gap-3 md:gap-4">
        {images.map((src, i) => (
          <li key={src} className={i === 0 ? "col-span-6" : "col-span-2"} data-reveal="up" style={{ ["--i" as string]: i }}>
            <button
              type="button"
              onClick={() => open(i)}
              className={`zoom-trigger group relative block w-full ${i === 0 ? "aspect-[16/9]" : "aspect-square"}`}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <span className="media zoom-on-hover absolute inset-0">
                <Image src={src} alt="" fill sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 20vw, 33vw"} className="object-cover" />
              </span>
              <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-canvas/90 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox on-dark"
        aria-label={`${title} photos`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col text-night-fg">
          <div className="flex items-center justify-between p-4 md:p-6">
            <p className="numeric text-sm text-night-muted" aria-live="polite">
              {index + 1} / {images.length}
            </p>
            <button type="button" onClick={close} className="btn btn-ghost-light size-11 px-0" aria-label="Close photos">
              <Close />
            </button>
          </div>
          <div className="relative flex-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={images[index]}
                className="absolute inset-x-4 inset-y-0 md:inset-x-24"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.42, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.16 } }}
              >
                <Image src={images[index]} alt={`${title}, photo ${index + 1}`} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-3 p-4 md:p-6">
            <button type="button" onClick={() => step(-1)} className="btn btn-ghost-light size-12 px-0" aria-label="Previous photo">
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => step(1)} className="btn btn-ghost-light size-12 px-0" aria-label="Next photo">
              <ArrowRight />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
