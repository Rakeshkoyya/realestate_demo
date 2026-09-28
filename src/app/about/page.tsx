import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowRight } from "@/components/ui/Icons";
import { team, timeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "An independent Dubai brokerage founded in 2014. Twenty-four advisers, eleven languages, one office in DIFC.",
};

const values = [
  { title: "We act for you", body: "We don't take instructions from developers, so our advice is never shaped by a quota." },
  { title: "We'd rather say no", body: "If a home isn't right, or isn't worth the price, we'll tell you, even if it costs us the deal." },
  { title: "We write things down", body: "Every offer, fee and next step, in plain language, in one place you can always find." },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader
        label="About"
        title={
          <>
            Independent since 2014, and <span className="serif-italic">in no hurry</span> to change that.
          </>
        }
      />

      <div className="shell pt-12">
        <RevealImage
          src="/images/downtown-tall.jpg"
          alt="The Burj Khalifa above Downtown Dubai on a clear afternoon"
          sizes="100vw"
          priority
          className="aspect-[4/3] md:aspect-[21/9] [&_img]:object-[50%_30%]"
        />
      </div>

      <section className="section shell grid gap-10 lg:grid-cols-12">
        <h2 className="t-h2 lg:col-span-5" data-reveal="up">
          A brokerage built around one simple idea: tell people the truth about property.
        </h2>
        <div className="grid gap-5 text-fg-muted lg:col-span-6 lg:col-start-7" data-reveal="up" style={{ ["--i" as string]: 1 }}>
          <p>
            Karim Mansour founded Sahra after a decade at one of the city&rsquo;s largest agencies, where he watched good
            clients buy the wrong homes because nobody had a reason to stop them. The idea was a small firm that earns its
            living from repeat clients and referrals, rather than volume.
          </p>
          <p>
            Twelve years on, we&rsquo;re twenty-four advisers speaking eleven languages, working from one office in DIFC. We
            still take on a limited number of homes at a time, we still visit every property before we list it, and most of
            our new clients still come through someone we&rsquo;ve already helped.
          </p>
          <p>
            Sahra Estates is registered with the Real Estate Regulatory Agency (ORN 21847), and every adviser holds a current
            RERA broker card.
          </p>
        </div>
      </section>

      <section aria-labelledby="values-title" className="shell pb-[var(--space-section)]">
        <h2 id="values-title" className="sr-only">
          What we believe
        </h2>
        <ul className="grid gap-10 md:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title}>
              <span className="horizon" data-reveal="line" style={{ ["--i" as string]: i }} />
              <h3 className="t-h3 mt-6" data-reveal="up" style={{ ["--i" as string]: i + 1 }}>
                {v.title}
              </h3>
              <p className="mt-3 text-fg-muted" data-reveal="up" style={{ ["--i" as string]: i + 2 }}>
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="team-title" className="section bg-panel">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="team-title" className="t-h2" data-reveal="up">
              The people you&rsquo;ll deal with
            </h2>
            <p className="max-w-sm text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              Six of our twenty-four advisers. Every client gets one named adviser, from the first call to the keys.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {team.map((m, i) => (
              <li key={m.slug} className="zoom-trigger" data-reveal="up" style={{ ["--i" as string]: i % 3 }}>
                <div className="media zoom-on-hover aspect-[4/5]">
                  <Image src={m.image} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover object-top" />
                </div>
                <h3 className="mt-4 font-serif text-[1.5rem] leading-tight">{m.name}</h3>
                <p className="text-sm">{m.role}</p>
                <p className="mt-2 text-sm text-fg-muted">{m.focus}</p>
                <p className="text-sm text-fg-muted">{m.languages}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="history-title" className="section shell grid gap-12 lg:grid-cols-12">
        <h2 id="history-title" className="t-h2 lg:col-span-4" data-reveal="up">
          Twelve years, briefly
        </h2>
        <ol className="lg:col-span-7 lg:col-start-6">
          {timeline.map((t, i) => (
            <li key={t.year} className="grid grid-cols-[5rem_1fr] gap-6 border-t border-rule py-6 last:border-b" data-reveal="up" style={{ ["--i" as string]: i }}>
              <span className="numeric font-serif text-[1.75rem] leading-none">{t.year}</span>
              <p className="text-fg-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pb-[var(--space-section)]">
        <div className="grid gap-8 border-t border-rule pt-12 md:grid-cols-12" data-reveal="up">
          <h2 className="t-h2 md:col-span-7">We&rsquo;re always glad to meet good advisers.</h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-fg-muted">
              If you care about doing this properly, we&rsquo;d like to hear from you. We hire two or three people a year.
            </p>
            <Link href="/contact?interest=Something%20else" className="link-line mt-5">
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
