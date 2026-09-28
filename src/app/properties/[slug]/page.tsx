import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { RevealImage } from "@/components/motion/RevealImage";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Gallery } from "@/components/property/Gallery";
import { CostPanel } from "@/components/property/CostPanel";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ArrowLeft, ArrowRight, Check } from "@/components/ui/Icons";
import { getAgent, getCommunity, site } from "@/lib/content";
import { formatNumber, formatPrice, getProperty, getSimilar, LISTING_LABEL, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Property not found" };
  return { title: p.title, description: p.summary, openGraph: { images: [p.cover] } };
}

export default async function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const community = getCommunity(p.community);
  const agent = getAgent(p.agent);
  const similar = getSimilar(p);

  const facts = [
    { label: "Bedrooms", value: String(p.beds) },
    { label: "Bathrooms", value: String(p.baths) },
    { label: "Built-up area", value: `${formatNumber(p.sqft)} sq ft` },
    { label: "Plot", value: p.plotSqft ? `${formatNumber(p.plotSqft)} sq ft` : "—" },
    { label: "Status", value: `${p.completion}${p.furnished ? " · Furnished" : ""}` },
    { label: "Reference", value: p.ref },
  ];

  return (
    <PageTransition>
      <article>
        <header className="shell pt-[calc(var(--header-h)+2.5rem)]">
          <Link href="/properties" className="link-line text-sm text-fg-muted">
            <ArrowLeft size={16} /> All properties
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="t-label text-fg-muted" data-reveal="up">
                {LISTING_LABEL[p.listing]} · {community?.name ?? "Dubai"} · {p.type}
              </p>
              <h1 className="t-h1 mt-3" data-reveal="up" style={{ ["--i" as string]: 1 }}>
                {p.title}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:text-right" data-reveal="up" style={{ ["--i" as string]: 2 }}>
              <p className="numeric font-serif text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-tight">{formatPrice(p)}</p>
              <p className="mt-1 text-sm text-fg-muted">{p.completion === "Off-plan" ? "Payment plan available" : "Available now"}</p>
            </div>
          </div>
        </header>

        <div className="shell mt-10">
          <ViewTransition name={`property-${p.slug}`} share="morph" default="none">
            <div className="media aspect-[4/3] md:aspect-[21/9]">
              <Image src={p.cover} alt={`${p.title}, ${community?.name ?? "Dubai"}`} fill priority sizes="100vw" className="object-cover" />
            </div>
          </ViewTransition>

          <dl className="grid grid-cols-2 border-b border-rule sm:grid-cols-3 lg:grid-cols-6">
            {facts.map((f, i) => (
              <div key={f.label} className="border-t border-rule py-5 pr-4" data-reveal="up" style={{ ["--i" as string]: i }}>
                <dt className="text-sm text-fg-muted">{f.label}</dt>
                <dd className="numeric mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="shell grid gap-16 py-[var(--space-section)] lg:grid-cols-12">
          <div className="grid content-start gap-20 lg:col-span-7">
            <section aria-labelledby="about-home">
              <h2 id="about-home" className="t-h3" data-reveal="up">
                {p.summary}
              </h2>
              <div className="mt-6 grid gap-4 text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 1 }}>
                {p.description.map((para) => (
                  <p key={para.slice(0, 24)} className="prose-measure">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            <section aria-labelledby="features">
              <h2 id="features" className="t-label text-fg-muted" data-reveal="up">
                Features
              </h2>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {p.features.map((f, i) => (
                  <li key={f} className="flex items-center gap-3 border-b border-rule py-3" data-reveal="up" style={{ ["--i" as string]: Math.min(i, 6) }}>
                    <Check size={16} className="shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="photos">
              <h2 id="photos" className="t-label mb-4 text-fg-muted">
                Photographs
              </h2>
              <Gallery images={p.gallery} title={p.title} />
            </section>

            <section aria-labelledby="costs">
              <h2 id="costs" className="t-h3 mb-8" data-reveal="up">
                {p.listing === "sale" ? "What it would cost" : "What you'll pay to move in"}
              </h2>
              <CostPanel property={p} />
            </section>

            {community ? (
              <section aria-labelledby="area" className="grid gap-8 border-t border-rule pt-12 sm:grid-cols-2">
                <RevealImage src={community.image} alt={`${community.name}, Dubai`} sizes="(min-width: 1024px) 28vw, 50vw" className="aspect-[4/3]" />
                <div>
                  <h2 id="area" className="t-h3">
                    Living in {community.name}
                  </h2>
                  <p className="mt-3 text-fg-muted">{community.body}</p>
                  <p className="mt-3 text-sm text-fg-muted">
                    Typical yield {community.yield} · {community.commute}
                  </p>
                  <Link href={`/communities#${community.slug}`} className="link-line mt-5">
                    Community guide <ArrowRight size={16} />
                  </Link>
                </div>
              </section>
            ) : null}
          </div>

          <aside className="lg:col-span-5 lg:col-start-8" aria-label="Arrange a viewing">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <div className="rounded-[var(--radius-media)] bg-panel p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <span className="media size-16 shrink-0 rounded-full">
                    <Image src={agent.image} alt="" fill sizes="64px" className="object-cover object-top" />
                  </span>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-fg-muted">{agent.role}</p>
                    <p className="text-sm text-fg-muted">Speaks {agent.languages}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-rule pb-6 text-sm">
                  <a href={site.phoneHref} className="link-line">
                    {site.phone}
                  </a>
                  <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="link-line">
                    WhatsApp
                  </a>
                </div>
                <h2 className="t-h3 mt-6">Arrange a viewing</h2>
                <p className="mt-2 text-sm text-fg-muted">In person or by live video. Quote {p.ref} if you call.</p>
                <div className="mt-6">
                  <EnquiryForm kind="viewing" propertyRef={p.ref} propertyTitle={p.title} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="similar" className="shell pb-[var(--space-section)]">
        <span className="horizon mb-12" data-reveal="line" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="similar" className="t-h2" data-reveal="up">
            You might also like
          </h2>
          <Link href="/properties" className="link-line">
            All properties <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((s, i) => (
            <PropertyCard key={s.slug} property={s} revealIndex={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
