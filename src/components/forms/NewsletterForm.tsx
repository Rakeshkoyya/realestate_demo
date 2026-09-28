"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitEnquiry } from "@/lib/submit";
import { validateEnquiry } from "@/lib/validation";
import { ArrowRight, Check } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "done";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const company = String(new FormData(e.currentTarget).get("company") ?? "");
    const check = validateEnquiry({ kind: "newsletter", email, company });
    if (!check.ok) {
      setError(check.errors.email ?? "Check your email address.");
      return;
    }
    setError(null);
    setStatus("sending");
    const result = await submitEnquiry(check.data);
    if (result.ok) {
      setStatus("done");
    } else {
      setStatus("idle");
      setError(result.fields?.email ?? result.message);
    }
  }

  return (
    <div className="min-h-[7.5rem]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.p
            key="done"
            role="status"
            className="flex items-start gap-3 pt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check className="mt-1 shrink-0 text-dusk" />
            <span>
              You&rsquo;re on the list. The next market note arrives on the first Monday of the month.
            </span>
          </motion.p>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <label htmlFor="newsletter-email" className="t-label text-night-muted">
              Your email
            </label>
            <div className="mt-1 flex items-end gap-3">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                className="input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "newsletter-error" : undefined}
              />
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-ghost-light min-h-11 w-11 shrink-0 px-0"
                aria-label="Subscribe to the market note"
              >
                <ArrowRight className="btn-arrow" />
              </button>
            </div>
            {error ? (
              <p id="newsletter-error" className="mt-2 text-sm text-[#e8a597]">
                {error}
              </p>
            ) : null}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
