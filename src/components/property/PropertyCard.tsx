import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { getCommunity } from "@/lib/content";
import { formatNumber, formatPrice, LISTING_LABEL, type Property } from "@/lib/properties";
import { ArrowUpRight } from "@/components/ui/Icons";

type PropertyCardProps = {
  property: Property;
  aspect?: "portrait" | "landscape" | "square";
  sizes?: string;
  revealIndex?: number;
  headingLevel?: "h2" | "h3";
};

const ASPECT: Record<NonNullable<PropertyCardProps["aspect"]>, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function PropertyCard({
  property: p,
  aspect = "portrait",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  revealIndex,
  headingLevel: Heading = "h3",
}: PropertyCardProps) {
  const community = getCommunity(p.community)?.name ?? "Dubai";
  const reveal = revealIndex === undefined ? {} : { "data-reveal": "up", style: { ["--i" as string]: revealIndex } };

  return (
    <article className="zoom-trigger" {...reveal}>
      <Link href={`/properties/${p.slug}`} className="group block rounded-[var(--radius-media)]">
        <ViewTransition name={`property-${p.slug}`} share="morph" default="none">
          <div className={`media zoom-on-hover ${ASPECT[aspect]}`}>
            <Image src={p.cover} alt={`${p.title}, ${community}`} fill sizes={sizes} className="object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-canvas/90 px-3 py-1 text-xs font-medium text-fg">
              {LISTING_LABEL[p.listing]}
              {p.completion === "Off-plan" ? " · Off-plan" : ""}
            </span>
          </div>
        </ViewTransition>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <Heading className="font-serif text-[1.625rem] leading-tight">{p.title}</Heading>
            <p className="mt-1 text-sm text-fg-muted">
              {community} · {p.type}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-rule-strong transition-colors duration-[var(--dur-base)] group-hover:border-fg group-hover:bg-fg group-hover:text-canvas"
          >
            <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-3 text-sm">
          <span className="numeric font-medium">{formatPrice(p)}</span>
          <span className="numeric text-fg-muted">
            {p.beds} bed · {p.baths} bath · {formatNumber(p.sqft)} sq ft
          </span>
        </div>
      </Link>
    </article>
  );
}
