"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai", hour12: false });

/** Live local time in Dubai. Renders a stable placeholder on the server to avoid hydration mismatch. */
export function DubaiClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`numeric ${className ?? ""}`}>
      <span className="sr-only">Local time in Dubai: </span>
      {time ?? "--:--"} GST
    </span>
  );
}
