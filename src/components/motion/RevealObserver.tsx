"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-in)";

/**
 * One IntersectionObserver for the whole site. Marks [data-reveal] elements
 * with .is-in the first time they enter the viewport, then stops watching them.
 * A MutationObserver picks up elements added by route changes or filters.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.remove("reveal-ready");
      return;
    }
    root.classList.add("reveal-live");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = (scope: ParentNode) => {
      scope.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) io.observe(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

/** Inline head script: enables hidden reveal states, with a 2.5s safety net. */
export const revealBootScript = `(function(){var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!d.classList.contains('reveal-live'))d.classList.remove('reveal-ready')},2500)})();`;
