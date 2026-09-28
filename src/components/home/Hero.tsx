import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { DubaiClock } from "@/components/layout/DubaiClock";
import { ArrowRight } from "@/components/ui/Icons";

type Word = { text: string; italic?: boolean };

const LINES: Word[][] = [
  [{ text: "A" }, { text: "quieter" }, { text: "way" }],
  [{ text: "to" }, { text: "find" }, { text: "home", italic: true }, { text: "in" }, { text: "Dubai." }],
];

const HEADLINE = "A quieter way to find home in Dubai.";

/** The signature moment: a horizon line draws, the city opens from it, the headline rises. */
export function Hero() {
  let wordIndex = 0;

  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate h-[100svh] min-h-[40rem] overflow-hidden bg-night text-night-fg">
      <div className="hero-media absolute inset-0 -z-10">
        <div className="hero-parallax absolute inset-x-0 -top-[12%] h-[112%]">
          <Image
            src="/images/skyline-dusk.jpg"
            alt="Downtown Dubai and the Burj Khalifa at dusk, seen across the city"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_12_11/0.82)_0%,rgb(10_12_11/0.35)_45%,rgb(10_12_11/0.25)_100%)]" />
      </div>

      <div className="shell flex h-full flex-col justify-end pb-10 md:pb-14">
        <h1 id="hero-title" className="t-display max-w-[14ch]" aria-label={HEADLINE}>
          {LINES.map((line, li) => (
            <span key={li} className="block" aria-hidden="true">
              {line.map((w) => {
                const i = wordIndex++;
                return (
                  <Fragment key={`${li}-${w.text}`}>
                    <span className="hero-word">
                      <span className={w.italic ? "serif-italic" : ""} style={{ ["--i" as string]: i }}>
                        {w.text}
                      </span>
                    </span>{" "}
                  </Fragment>
                );
              })}
            </span>
          ))}
        </h1>

        <span className="hero-horizon horizon horizon-sand mt-8 origin-left md:mt-12" />

        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-12 md:items-end">
          <p className="hero-after max-w-md text-night-fg/85 md:col-span-5" style={{ ["--i" as string]: 0 }}>
            Independent advisers for buying, selling, leasing and furnished stays across the city&rsquo;s most sought-after
            communities. Since 2014.
          </p>
          <div className="hero-after flex flex-wrap gap-3 md:col-span-4" style={{ ["--i" as string]: 1 }}>
            <Link href="/properties" className="btn btn-light">
              View properties <ArrowRight className="btn-arrow" />
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Book a consultation
            </Link>
          </div>
          <p
            className="hero-after hidden text-right text-sm text-night-fg/75 md:col-span-3 md:block"
            style={{ ["--i" as string]: 2 }}
          >
            DIFC, Dubai · <DubaiClock />
          </p>
        </div>
      </div>
    </section>
  );
}
