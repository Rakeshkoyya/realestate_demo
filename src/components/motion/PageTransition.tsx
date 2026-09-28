import { ViewTransition, type ReactNode } from "react";

/** Wrap each page's content (not the layout) so route changes cross-fade and rise. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
