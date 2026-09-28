import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { RevealImage } from "@/components/motion/RevealImage";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { getAgent } from "@/lib/content";
import { formatDate, getPost, posts, type Block } from "@/lib/journal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt, openGraph: { images: [post.image] } };
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h2") return <h2 className="t-h3 mt-12">{block.text}</h2>;
  if (block.type === "quote")
    return (
      <blockquote className="my-12 border-l border-fg pl-6 font-serif text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] leading-snug">
        {block.text}
      </blockquote>
    );
  return <p className="mt-5 text-[1.0625rem] leading-[1.75] text-fg/85">{block.text}</p>;
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAgent(post.author);
  const index = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(index + 1) % posts.length];

  return (
    <PageTransition>
      <article>
        <header className="shell pt-[calc(var(--header-h)+2.5rem)]">
          <Link href="/journal" className="link-line text-sm text-fg-muted">
            <ArrowLeft size={16} /> Journal
          </Link>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-sm text-fg-muted" data-reveal="up">
              {post.category} · {formatDate(post.date)} · {post.minutes} min read
            </p>
            <h1 className="t-h1 mt-4" data-reveal="up" style={{ ["--i" as string]: 1 }}>
              {post.title}
            </h1>
            <p className="t-lead mx-auto mt-6 max-w-2xl text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 2 }}>
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="shell mt-14">
          <RevealImage src={post.image} alt="" priority sizes="100vw" className="aspect-[4/3] md:aspect-[21/9]" />
        </div>

        <div className="shell">
          <div className="mx-auto max-w-[42rem] py-16">
            <div className="flex items-center gap-4 border-b border-rule pb-8">
              <span className="media size-12 shrink-0 rounded-full">
                <Image src={author.image} alt="" fill sizes="48px" className="object-cover object-top" />
              </span>
              <div className="text-sm">
                <p className="font-medium">{author.name}</p>
                <p className="text-fg-muted">{author.role}</p>
              </div>
            </div>
            {post.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
            <div className="mt-16 rounded-[var(--radius-media)] bg-panel p-6 md:p-8">
              <p className="font-medium">Questions about any of this?</p>
              <p className="mt-2 text-fg-muted">
                {author.name.split(" ")[0]} and the team are happy to talk it through, with no obligation.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5">
                Book a consultation <ArrowRight className="btn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {next && next.slug !== post.slug ? (
        <section className="shell pb-[var(--space-section)]">
          <Link href={`/journal/${next.slug}`} className="zoom-trigger group grid gap-8 border-t border-rule pt-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="t-label text-fg-muted">Read next</p>
              <h2 className="t-h2 mt-3 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">{next.title}</h2>
            </div>
            <div className="media zoom-on-hover aspect-[16/10] md:col-span-4 md:col-start-9">
              <Image src={next.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          </Link>
        </section>
      ) : null}
    </PageTransition>
  );
}
