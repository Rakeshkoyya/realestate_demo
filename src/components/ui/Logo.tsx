type LogoProps = { className?: string };

/* A sun resting on the horizon, beside the wordmark. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg width="30" height="18" viewBox="0 0 30 18" fill="none" aria-hidden="true" focusable="false">
        <path d="M7 15a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.4" />
        <path d="M0 15.5h30" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="font-serif text-[1.625rem] leading-none tracking-[-0.01em]">
        Sahra <span className="serif-italic">Estates</span>
      </span>
    </span>
  );
}
