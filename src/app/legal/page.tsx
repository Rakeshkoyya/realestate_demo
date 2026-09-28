import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy and terms",
  description: "How Sahra Estates handles your personal data, and the terms of using this website.",
};

const privacy = [
  ["What we collect", "Your name, contact details and whatever you tell us about the home you're looking for, buying, selling or letting. We also keep basic, anonymous analytics about how this site is used."],
  ["Why we collect it", "To reply to you, arrange viewings, prepare offers and contracts, and meet our obligations under UAE anti-money-laundering rules. We never sell your data or share it for marketing."],
  ["Who we share it with", "Only the people a transaction needs: the other party's agent, conveyancers, trustees, mortgage partners and the Dubai Land Department, and only what they need."],
  ["How long we keep it", "Enquiries that don't lead anywhere are deleted after 24 months. Transaction records are kept for five years, as the law requires."],
  ["Your rights", `You can ask to see, correct or delete your data at any time. Email ${site.email} and we'll respond within 30 days.`],
];

const terms = [
  ["Listings", "We take care to keep listings accurate, but prices, availability and details can change and don't form part of any contract. Floor areas are approximate."],
  ["Estimates", "Mortgage and cost calculations on this site are for guidance only and aren't financial advice."],
  ["Content", "Photographs and text are owned by Sahra Estates or used with permission. Please ask before reusing them."],
  ["Regulation", `Sahra Estates Real Estate Brokers LLC is registered with the Real Estate Regulatory Agency, ${site.orn}.`],
];

function Section({ id, title, items }: { id: string; title: string; items: string[][] }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid gap-8 lg:grid-cols-12">
      <h2 id={`${id}-title`} className="t-h2 lg:col-span-4" data-reveal="up">
        {title}
      </h2>
      <dl className="lg:col-span-7 lg:col-start-6">
        {items.map(([k, v], i) => (
          <div key={k} className="grid gap-2 border-t border-rule py-6 md:grid-cols-[12rem_1fr] md:gap-8" data-reveal="up" style={{ ["--i" as string]: i }}>
            <dt className="font-medium">{k}</dt>
            <dd className="text-fg-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function LegalPage() {
  return (
    <PageTransition>
      <PageHeader label="Legal" title="Privacy and terms" intro="Written to be read. Last updated 1 September 2026." />
      <div className="shell grid gap-[var(--space-section)] py-[var(--space-section)] pt-16">
        <Section id="privacy" title="Privacy" items={privacy} />
        <Section id="terms" title="Terms of use" items={terms} />
        <p className="text-fg-muted">
          Questions?{" "}
          <Link href="/contact" className="text-fg underline decoration-1 underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </PageTransition>
  );
}
