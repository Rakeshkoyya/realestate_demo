"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Listing, Property } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import { ArrowRight } from "@/components/ui/Icons";

export type Filters = {
  listing: Listing | "all";
  community: string; // "all" or a community slug
  beds: number; // minimum; 0 = any
  sort: "featured" | "price-desc" | "price-asc" | "size-desc";
};

type Option = { value: string; label: string };

type PropertyExplorerProps = {
  items: Property[];
  communities: Option[];
  initial: Filters;
};

const TABS: { value: Filters["listing"]; label: string; short?: string }[] = [
  { value: "all", label: "All" },
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
  { value: "stay", label: "Furnished stays", short: "Stays" },
];

const BEDS: Option[] = [
  { value: "0", label: "Any" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const SORTS: Option[] = [
  { value: "featured", label: "Featured" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "size-desc", label: "Largest first" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULTS: Filters = { listing: "all", community: "all", beds: 0, sort: "featured" };

function applyFilters(items: Property[], f: Filters): Property[] {
  const filtered = items.filter(
    (p) =>
      (f.listing === "all" || p.listing === f.listing) &&
      (f.community === "all" || p.community === f.community) &&
      p.beds >= f.beds,
  );
  const sorters: Record<Filters["sort"], ((a: Property, b: Property) => number) | null> = {
    featured: null,
    "price-desc": (a, b) => b.price - a.price,
    "price-asc": (a, b) => a.price - b.price,
    "size-desc": (a, b) => b.sqft - a.sqft,
  };
  const sorter = sorters[f.sort];
  return sorter ? [...filtered].sort(sorter) : filtered;
}

function syncUrl(f: Filters) {
  const params = new URLSearchParams();
  if (f.listing !== "all") params.set("listing", f.listing);
  if (f.community !== "all") params.set("community", f.community);
  if (f.beds > 0) params.set("beds", String(f.beds));
  if (f.sort !== "featured") params.set("sort", f.sort);
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

export function PropertyExplorer({ items, communities, initial }: PropertyExplorerProps) {
  const [filters, setFilters] = useState<Filters>(initial);
  const results = useMemo(() => applyFilters(items, filters), [items, filters]);
  const ids = useId();

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    syncUrl(next);
  };

  const communityName = communities.find((c) => c.value === filters.community)?.label;
  const isFiltered = JSON.stringify(filters) !== JSON.stringify(DEFAULTS);

  return (
    <div>
      <div className="flex flex-col gap-8 border-b border-rule pb-6 lg:flex-row lg:items-end lg:justify-between">
        <LayoutGroup id="listing-tabs">
          <div role="group" aria-label="Listing type" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
            {TABS.map((tab) => {
              const active = filters.listing === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ listing: tab.value })}
                  className={`relative min-h-11 shrink-0 rounded-full px-5 text-[0.9375rem] font-medium transition-colors duration-[var(--dur-base)] ${
                    active ? "text-canvas" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-fg"
                      transition={{ duration: 0.42, ease: EASE }}
                    />
                  ) : null}
                  {tab.short ? (
                    <span className="relative">
                      <span className="sm:hidden">{tab.short}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                  ) : (
                    <span className="relative">{tab.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:w-[38rem]">
          <div className="field col-span-2 sm:col-span-1">
            <label htmlFor={`${ids}-community`}>Community</label>
            <select
              id={`${ids}-community`}
              className="input"
              value={filters.community}
              onChange={(e) => update({ community: e.target.value })}
            >
              <option value="all">All communities</option>
              {communities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${ids}-beds`}>Bedrooms</label>
            <select id={`${ids}-beds`} className="input" value={String(filters.beds)} onChange={(e) => update({ beds: Number(e.target.value) })}>
              {BEDS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${ids}-sort`}>Sort by</label>
            <select
              id={`${ids}-sort`}
              className="input"
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as Filters["sort"] })}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 py-6 text-sm text-fg-muted">
        <p aria-live="polite" className="numeric">
          {results.length === 1 ? "1 home" : `${results.length} homes`}
          {communityName ? ` in ${communityName}` : ""}
        </p>
        {isFiltered ? (
          <button type="button" onClick={() => update(DEFAULTS)} className="link-line text-fg">
            Clear filters
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <motion.ul layout className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.16 } }}
              >
                <PropertyCard property={p} headingLevel="h2" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }}
          className="grid gap-6 border-y border-rule py-16 md:grid-cols-12"
        >
          <h2 className="t-h3 md:col-span-6">
            Nothing listed{communityName ? ` in ${communityName}` : ""} that matches, right now.
          </h2>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-fg-muted">
              Around half the homes we sell never appear online. Tell us what you&rsquo;re after and we&rsquo;ll check our private
              list the same day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact?interest=Buying" className="btn btn-primary">
                Ask about off-market homes <ArrowRight className="btn-arrow" />
              </Link>
              <button type="button" onClick={() => update(DEFAULTS)} className="btn btn-outline">
                Show all homes
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
