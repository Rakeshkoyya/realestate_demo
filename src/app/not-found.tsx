import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[80svh] content-center pb-24 pt-[calc(var(--header-h)+4rem)]">
      <p className="t-label text-fg-muted">Page not found</p>
      <h1 className="t-display mt-4 max-w-[16ch]">
        This address is <span className="serif-italic">off the map</span>.
      </h1>
      <span className="hero-horizon horizon mt-10 origin-left" />
      <p className="t-lead mt-8 max-w-xl text-fg-muted">
        The page may have moved, or the home may have sold. Here are a few good places to pick up from.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/properties" className="btn btn-primary">
          Browse properties <ArrowRight className="btn-arrow" />
        </Link>
        <Link href="/" className="btn btn-outline">
          Back to the home page
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Ask an adviser
        </Link>
      </div>
    </section>
  );
}
