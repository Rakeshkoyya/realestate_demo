import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowRight, Check, Plus } from "@/components/ui/Icons";
import { faqs, processSteps, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Buying, selling, leasing, furnished stays and property management in Dubai, from one independent team.",
};

const INTEREST_FOR: Record<string, string> = {
  buying: "Buying",
  selling: "Selling",
  leasing: "Renting",
  "furnished-stays": "Furnished stay",
  management: "Property management",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader
        label="Services"
        title={
          <>
            Everything a move needs, <span className="serif-italic">and nothing it doesn&rsquo;t</span>.
          </>
        }
        intro="Five services, one team and one named adviser. We charge the standard market fees and we're open about them from the first conversation."
      />

      <div className="shell grid gap-[var(--space-section)] py-[var(--space-section)]">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <RevealImage
                src={s.image}
                alt=""
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={`aspect-[5/4] lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
              />
              <div className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`}>
                <h2 id={`${s.id}-title`} className="t-h2" data-reveal="up">
                  {s.title}
                </h2>
                <p className="t-lead mt-5 text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 1 }}>
                  {s.body}
                </p>
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {s.points.map((point, j) => (
                    <li key={point} className="flex items-center gap-3 border-t border-rule py-3" data-reveal="up" style={{ ["--i" as string]: j + 2 }}>
                      <Check size={16} className="shrink-0 text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={`/contact?interest=${encodeURIComponent(INTEREST_FOR[s.id] ?? "Something else")}`} className="link-line mt-8">
                  Talk to us about {s.title.toLowerCase()} <ArrowRight size={16} />
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="process-title" className="section bg-panel">
        <div className="shell">
          <h2 id="process-title" className="t-h2 max-w-xl" data-reveal="up">
            How working with us goes
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title}>
                <span className="horizon" data-reveal="line" style={{ ["--i" as string]: i * 2 }} />
                <div data-reveal="up" style={{ ["--i" as string]: i * 2 + 1 }}>
                  <p className="numeric mt-5 font-serif text-[2rem] leading-none text-fg-muted">{i + 1}</p>
                  <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 text-fg-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="t-h2" data-reveal="up">
            Questions we&rsquo;re often asked
          </h2>
          <p className="mt-4 text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 1 }}>
            Something else on your mind?{" "}
            <Link href="/contact" className="text-fg underline decoration-1 underline-offset-4">
              Ask us directly
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq border-b border-rule first:border-t" data-reveal="up" style={{ ["--i" as string]: i }}>
              <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-lg font-medium">
                {f.q}
                <Plus className="faq-icon shrink-0" />
              </summary>
              <p className="prose-measure pb-6 text-fg-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
