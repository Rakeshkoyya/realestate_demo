import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { PropertyExplorer, type Filters } from "@/components/property/PropertyExplorer";
import { ArrowRight } from "@/components/ui/Icons";
import { communities } from "@/lib/content";
import { properties, type Listing } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties",
  description: "Villas, apartments and townhouses for sale, for rent and as furnished stays across Dubai.",
};

const LISTINGS: Listing[] = ["sale", "rent", "stay"];
const SORTS: Filters["sort"][] = ["featured", "price-desc", "price-asc", "size-desc"];

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Turn untrusted query params into a valid filter state. */
function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const listing = first(sp.listing);
  const community = first(sp.community);
  const beds = Number(first(sp.beds));
  const sort = first(sp.sort);
  return {
    listing: LISTINGS.includes(listing as Listing) ? (listing as Listing) : "all",
    community: communities.some((c) => c.slug === community) ? (community as string) : "all",
    beds: Number.isInteger(beds) && beds >= 0 && beds <= 6 ? beds : 0,
    sort: SORTS.includes(sort as Filters["sort"]) ? (sort as Filters["sort"]) : "featured",
  };
}

export default async function PropertiesPage({ searchParams }: PageProps<"/properties">) {
  const initial = parseFilters(await searchParams);
  const options = communities.map((c) => ({ value: c.slug, label: c.name }));

  return (
    <PageTransition>
      <PageHeader
        label="Properties"
        title={
          <>
            Homes we&rsquo;d happily <span className="serif-italic">live in</span> ourselves.
          </>
        }
        intro="Every home here has been visited, measured and photographed by our team. Prices are current, and nothing is listed without the owner's written consent."
      />

      <section className="shell pb-[var(--space-section)] pt-10">
        <PropertyExplorer items={properties} communities={options} initial={initial} />
      </section>

      <section className="shell pb-[var(--space-section)]">
        <div className="grid gap-8 border-t border-rule pt-12 md:grid-cols-12" data-reveal="up">
          <h2 className="t-h2 md:col-span-7">Looking for something we haven&rsquo;t shown?</h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-fg-muted">
              Register a search and we&rsquo;ll send new and off-market homes that fit, usually before they reach the portals.
            </p>
            <Link href="/contact?interest=Buying" className="btn btn-primary mt-6">
              Register a search <ArrowRight className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
