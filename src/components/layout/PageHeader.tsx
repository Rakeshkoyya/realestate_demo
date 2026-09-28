import type { ReactNode } from "react";

type PageHeaderProps = {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
};

/** Opening block for inner pages: label, serif title, intro, and a horizon rule that draws in. */
export function PageHeader({ label, title, intro, aside }: PageHeaderProps) {
  return (
    <header className="shell pt-[calc(var(--header-h)+clamp(3rem,2rem+5vw,7rem))]">
      <p className="t-label text-fg-muted" data-reveal="up">
        {label}
      </p>
      <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="t-h1 lg:col-span-8" data-reveal="up" style={{ ["--i" as string]: 1 }}>
          {title}
        </h1>
        {aside ? (
          <div className="lg:col-span-4 lg:justify-self-end" data-reveal="up" style={{ ["--i" as string]: 2 }}>
            {aside}
          </div>
        ) : null}
      </div>
      {intro ? (
        <p className="t-lead prose-measure mt-6 text-fg-muted" data-reveal="up" style={{ ["--i" as string]: 2 }}>
          {intro}
        </p>
      ) : null}
      <span className="horizon mt-12 lg:mt-16" data-reveal="line" style={{ ["--i" as string]: 3 }} />
    </header>
  );
}
