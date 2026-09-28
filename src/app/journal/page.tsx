import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/motion/PageTransition";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAgent } from "@/lib/content";
import { formatDate, posts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Market notes, practical guides and life in Dubai, from the Sahra Estates team.",
};

export default function JournalPage() {
  const [lead, ...rest] = posts;

  return (
    <PageTransition>
      <PageHeader
        label="Journal"
        title={
          <>
            Notes on the market, <span className="serif-italic">written plainly</span>.
          </>
        }
        intro="What's moving, what it costs and how things actually work, from the people doing the deals."
      />

      <div className="shell py-[var(--space-section)] pt-12">
        {lead ? (
          <Link href={`/journal/${lead.slug}`} className="zoom-trigger group grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal="up">
            <div className="media zoom-on-hover aspect-[16/10] lg:col-span-8">
              <Image src={lead.image} alt="" fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-fg-muted">
                {lead.category} · {formatDate(lead.date)} · {lead.minutes} min read
              </p>
              <h2 className="t-h2 mt-3 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">{lead.title}</h2>
              <p className="mt-4 text-fg-muted">{lead.excerpt}</p>
              <p className="mt-4 text-sm">By {getAgent(lead.author).name}</p>
            </div>
          </Link>
        ) : null}

        <ul className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {rest.map((post, i) => (
            <li key={post.slug} data-reveal="up" style={{ ["--i" as string]: i }}>
              <Link href={`/journal/${post.slug}`} className="zoom-trigger group block">
                <div className="media zoom-on-hover aspect-[4/3]">
                  <Image src={post.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-5 text-sm text-fg-muted">
                  {post.category} · {formatDate(post.date)}
                </p>
                <h2 className="t-h3 mt-2 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{post.title}</h2>
                <p className="mt-3 text-fg-muted">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
}
