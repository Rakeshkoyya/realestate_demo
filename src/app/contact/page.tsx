import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { RevealImage } from "@/components/motion/RevealImage";
import { DubaiClock } from "@/components/layout/DubaiClock";
import { ArrowUpRight } from "@/components/ui/Icons";
import { site } from "@/lib/content";
import { INTERESTS } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation with Sahra Estates. Call, WhatsApp, email or visit us at Index Tower, DIFC.",
};

const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Index+Tower+DIFC+Dubai";

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.interest) ? sp.interest[0] : sp.interest;
  const interest = INTERESTS.find((i) => i === raw);

  return (
    <PageTransition>
      <PageHeader
        label="Contact"
        title={
          <>
            Start with a <span className="serif-italic">conversation</span>.
          </>
        }
        intro="Thirty minutes, in person at our DIFC office or on a call. No obligation, and no follow-up calls you didn't ask for."
      />

      <div className="shell grid gap-16 py-[var(--space-section)] pt-12 lg:grid-cols-12">
        <section aria-labelledby="form-title" className="lg:col-span-7">
          <h2 id="form-title" className="t-h3" data-reveal="up">
            Send us a note
          </h2>
          <div className="mt-8" data-reveal="up" style={{ ["--i" as string]: 1 }}>
            <EnquiryForm kind="enquiry" defaultInterest={interest} />
          </div>
        </section>

        <aside className="grid content-start gap-10 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us">
          <div data-reveal="up">
            <h2 className="t-label text-fg-muted">Call or message</h2>
            <p className="mt-3 grid gap-1 text-lg">
              <a href={site.phoneHref} className="link-line w-fit">
                {site.phone}
              </a>
              <a href={site.whatsappHref} target="_blank" rel="noreferrer" className="link-line w-fit">
                WhatsApp <ArrowUpRight size={14} />
              </a>
              <a href={`mailto:${site.email}`} className="link-line w-fit">
                {site.email}
              </a>
            </p>
          </div>
          <div data-reveal="up" style={{ ["--i" as string]: 1 }}>
            <h2 className="t-label text-fg-muted">Visit</h2>
            <address className="mt-3 not-italic leading-relaxed">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div data-reveal="up" style={{ ["--i" as string]: 2 }}>
            <h2 className="t-label text-fg-muted">Office hours</h2>
            <dl className="mt-3 text-sm">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-t border-rule py-2.5 last:border-b">
                  <dt>{h.days}</dt>
                  <dd className="numeric text-fg-muted">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-fg-muted">
              It&rsquo;s <DubaiClock className="text-fg" /> in Dubai right now.
            </p>
          </div>
        </aside>
      </div>

      <section aria-labelledby="find-us" className="on-dark relative isolate mb-[var(--space-section)] text-night-fg">
        <RevealImage
          src="/images/tower-detail.jpg"
          alt="Glass towers in Dubai's financial district at dusk"
          sizes="100vw"
          className="absolute inset-0 -z-10 rounded-none [&_img]:object-[50%_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(10_12_11/0.85),rgb(10_12_11/0.35))]" />
        <div className="shell grid min-h-[30rem] items-end py-16 md:min-h-[34rem]">
          <div className="max-w-md">
            <h2 id="find-us" className="t-h2" data-reveal="up">
              Find us in DIFC
            </h2>
            <p className="mt-4 text-night-fg/85" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              Twelfth floor of Index Tower, a four-minute walk from Emirates Towers metro. Visitor parking is under the
              building; tell reception you&rsquo;re seeing Sahra.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal="up" style={{ ["--i" as string]: 2 }}>
              <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="btn btn-light">
                Get directions <ArrowUpRight size={16} />
              </a>
              <a href={site.phoneHref} className="btn btn-ghost-light">
                Call reception
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
