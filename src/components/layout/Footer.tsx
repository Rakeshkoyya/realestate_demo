import Link from "next/link";
import { nav, services, site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { DubaiClock } from "./DubaiClock";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-night text-night-fg">
      <div className="shell pt-[var(--space-section)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="t-h1 lg:col-span-8" data-reveal="up">
            Tell us what you&rsquo;re looking for. <span className="serif-italic text-night-muted">We&rsquo;ll do the looking.</span>
          </h2>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end" data-reveal="up" style={{ ["--i" as string]: 1 }}>
            <Link href="/contact" className="btn btn-light">
              Book a consultation <ArrowRight className="btn-arrow" />
            </Link>
            <a href={site.whatsappHref} className="btn btn-ghost-light" target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
          </div>
        </div>

        <span className="horizon horizon-sand mt-16 lg:mt-24" data-reveal="line" />

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <address className="mt-6 not-italic leading-relaxed text-night-muted">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-6 text-sm text-night-muted">
              In Dubai it&rsquo;s <DubaiClock className="text-night-fg" />
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="t-label text-night-muted">Explore</h3>
            <ul className="mt-4 grid gap-2">
              {[...nav, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="t-label text-night-muted">Services</h3>
            <ul className="mt-4 grid gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="nav-link">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="t-label text-night-muted">The monthly market note</h3>
            <p className="mt-4 max-w-sm text-night-muted">
              One email a month: prices, notable sales and new homes before they&rsquo;re listed.
            </p>
            <div className="mt-5 max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-night-rule py-8 text-sm text-night-muted md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Sahra Estates Real Estate Brokers LLC · {site.orn} · Regulated by RERA
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="nav-link">
                  {s.label} <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
            <li>
              <Link href="/legal#privacy" className="nav-link">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal#terms" className="nav-link">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
