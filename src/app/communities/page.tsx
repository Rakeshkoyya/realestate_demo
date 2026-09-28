import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowRight } from "@/components/ui/Icons";
import { communities } from "@/lib/content";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Communities",
  description: "Guides to the ten Dubai communities we know best, with typical prices, rents, yields and commutes.",
};

export default function CommunitiesPage() {
  return (
    <PageTransition>
      <PageHeader
        label="Communities"
        title={
          <>
            Ten neighbourhoods, known <span className="serif-italic">street by street</span>.
          </>
        }
        intro="Where you live in Dubai shapes your commute, your school run and your weekends more than the house itself. Here's how we'd describe each community to a friend."
      />

      <nav aria-label="Jump to a community" className="shell pt-10">
        <ul className="flex flex-wrap gap-2">
          {communities.map((c) => (
            <li key={c.slug}>
              <a
                href={`#${c.slug}`}
                className="inline-flex min-h-10 items-center rounded-full border border-rule-strong px-4 text-sm transition-colors duration-[var(--dur-base)] hover:border-fg hover:bg-fg hover:text-canvas"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell grid gap-[var(--space-section)] py-[var(--space-section)]">
        {communities.map((c, i) => {
          const count = properties.filter((p) => p.community === c.slug).length;
          const flip = i % 2 === 1;
          return (
            <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-title`} className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <RevealImage
                src={c.image}
                alt={`${c.name}, Dubai`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`aspect-[4/3] lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}
              />
              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className="t-label text-fg-muted" data-reveal="up">
                  {c.line}
                </p>
                <h2 id={`${c.slug}-title`} className="t-h2 mt-3" data-reveal="up" style={{ ["--i" as string]: 1 }}>
                  {c.name}
                </h2>
                <p className="mt-5 text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 2 }}>
                  {c.body}
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-x-6 text-sm" data-reveal="up" style={{ ["--i" as string]: 3 }}>
                  {[
                    ["Typical sale price", c.avgSale],
                    ["Typical villa rent", c.avgRent],
                    ["Gross yield", c.yield],
                    ["Commute", c.commute],
                  ].map(([label, value]) => (
                    <div key={label} className="border-t border-rule py-3">
                      <dt className="text-fg-muted">{label}</dt>
                      <dd className="numeric mt-0.5 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8" data-reveal="up" style={{ ["--i" as string]: 4 }}>
                  {count > 0 ? (
                    <Link href={`/properties?community=${c.slug}`} className="btn btn-outline">
                      {count === 1 ? "See 1 home" : `See ${count} homes`} in {c.name} <ArrowRight className="btn-arrow" />
                    </Link>
                  ) : (
                    <Link href="/contact?interest=Buying" className="btn btn-outline">
                      Ask about homes in {c.name} <ArrowRight className="btn-arrow" />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <p className="shell pb-[var(--space-section)] text-sm text-fg-muted">
        Figures are Sahra Estates estimates from Dubai Land Department transactions, Q3 2026. Commutes are typical morning drive
        times.
      </p>
    </PageTransition>
  );
}
