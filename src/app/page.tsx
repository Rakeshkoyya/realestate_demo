import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { RevealImage } from "@/components/motion/RevealImage";
import { Counter } from "@/components/motion/Counter";
import { Hero } from "@/components/home/Hero";
import { ServiceList } from "@/components/home/ServiceList";
import { CommunityRail } from "@/components/home/CommunityRail";
import { Testimonials } from "@/components/home/Testimonials";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ArrowRight } from "@/components/ui/Icons";
import { communities, services, stats, testimonials } from "@/lib/content";
import { FEATURED_SLUGS, properties } from "@/lib/properties";
import { formatDate, posts } from "@/lib/journal";

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) => properties.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const [lead, ...restPosts] = posts;

  return (
    <PageTransition>
      <Hero />

      {/* Intro + numbers */}
      <section className="section shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="t-h2 lg:col-span-8" data-reveal="up">
            We&rsquo;re a small, independent team. We don&rsquo;t sell for developers, we don&rsquo;t list everything, and
            we&rsquo;ll tell you when a home <span className="serif-italic text-fg-muted">isn&rsquo;t</span> right for you.
          </p>
          <div className="lg:col-span-3 lg:col-start-10 lg:self-end" data-reveal="up" style={{ ["--i" as string]: 1 }}>
            <p className="text-fg-muted">
              Twenty-four advisers, eleven languages and one office in DIFC. Most of our clients come to us through someone
              we&rsquo;ve already helped.
            </p>
            <Link href="/about" className="link-line mt-5">
              About Sahra <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="border-t border-rule pt-5" data-reveal="up" style={{ ["--i" as string]: i }}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-[clamp(2.5rem,1.8rem+2.6vw,4.25rem)] leading-none">
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dd className="mt-3 max-w-[18ch] text-sm text-fg-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured homes */}
      <section aria-labelledby="featured-title" className="section shell pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="featured-title" className="t-h2" data-reveal="up">
              Currently on our books
            </h2>
            <p className="mt-3 max-w-md text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              A few of the homes we&rsquo;re showing this month. Many more are shared privately with registered clients.
            </p>
          </div>
          <Link href="/properties" className="link-line" data-reveal="up" style={{ ["--i" as string]: 2 }}>
            See all {properties.length} properties <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-12">
          {featured[0] ? (
            <div className="md:col-span-7">
              <PropertyCard property={featured[0]} aspect="landscape" sizes="(min-width: 768px) 58vw, 100vw" revealIndex={0} />
            </div>
          ) : null}
          {featured[1] ? (
            <div className="md:col-span-4 md:col-start-9 md:mt-40">
              <PropertyCard property={featured[1]} sizes="(min-width: 768px) 33vw, 100vw" revealIndex={1} />
            </div>
          ) : null}
          {featured[2] ? (
            <div className="md:col-span-5 md:col-start-3 md:-mt-24">
              <PropertyCard property={featured[2]} aspect="landscape" sizes="(min-width: 768px) 42vw, 100vw" revealIndex={0} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="section bg-panel">
        <div className="shell">
          <div className="mb-12 grid gap-6 lg:grid-cols-12">
            <h2 id="services-title" className="t-h2 lg:col-span-6" data-reveal="up">
              One team for the whole move
            </h2>
            <p className="text-fg-muted lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              Whether you&rsquo;re buying your first apartment or handing over a portfolio, you deal with one named adviser
              from the first call to the keys.
            </p>
          </div>
          <ServiceList items={services} />
        </div>
      </section>

      {/* Communities */}
      <section className="section overflow-hidden">
        <CommunityRail items={communities} />
        <div className="shell mt-8">
          <Link href="/communities" className="link-line">
            Compare all communities <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-label="What clients say" className="shell pb-[var(--space-section)]">
        <span className="horizon mb-[var(--space-section)]" data-reveal="line" />
        <Testimonials items={testimonials} />
      </section>

      {/* Journal */}
      <section aria-labelledby="journal-title" className="section shell pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="journal-title" className="t-h2" data-reveal="up">
            From the journal
          </h2>
          <Link href="/journal" className="link-line" data-reveal="up">
            All articles <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {lead ? (
            <Link href={`/journal/${lead.slug}`} className="zoom-trigger group lg:col-span-7" data-reveal="up">
              <div className="media zoom-on-hover aspect-[16/10]">
                <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-5 text-sm text-fg-muted">
                {lead.category} · {formatDate(lead.date)}
              </p>
              <h3 className="t-h3 mt-2 max-w-[28ch] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {lead.title}
              </h3>
            </Link>
          ) : null}
          <ul className="grid content-start gap-8 lg:col-span-5">
            {restPosts.map((post, i) => (
              <li key={post.slug} data-reveal="up" style={{ ["--i" as string]: i + 1 }}>
                <Link href={`/journal/${post.slug}`} className="zoom-trigger group grid grid-cols-[7rem_1fr] gap-5 border-t border-rule pt-8 sm:grid-cols-[9rem_1fr]">
                  <div className="media zoom-on-hover aspect-square">
                    <Image src={post.image} alt="" fill sizes="9rem" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-fg-muted">
                      {post.category} · {post.minutes} min read
                    </p>
                    <h3 className="mt-1 font-serif text-[1.375rem] leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sellers */}
      <section aria-labelledby="sell-title" className="on-dark relative isolate text-night-fg">
        <RevealImage
          src="/images/villa-emirates-hills.jpg"
          alt="A contemporary villa in Emirates Hills at dusk, lit from within beneath a ghaf tree"
          sizes="100vw"
          className="absolute inset-0 -z-10 rounded-none"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(10_12_11/0.78),rgb(10_12_11/0.25))]" />
        <div className="shell grid min-h-[36rem] items-center py-24 lg:min-h-[44rem]">
          <div className="max-w-xl">
            <h2 id="sell-title" className="t-h1" data-reveal="up">
              Selling this year? Start with an <span className="serif-italic">honest</span> valuation.
            </h2>
            <p className="mt-6 max-w-md text-night-fg/85" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              We price from real Land Department transactions, not wishful asking prices, and tell you what we&rsquo;d change
              before a single photograph is taken.
            </p>
            <div className="mt-8" data-reveal="up" style={{ ["--i" as string]: 2 }}>
              <Link href="/contact?interest=Selling" className="btn btn-light">
                Request a valuation <ArrowRight className="btn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
