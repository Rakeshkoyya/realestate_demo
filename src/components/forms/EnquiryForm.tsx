"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { submitEnquiry } from "@/lib/submit";
import { INTERESTS, validateEnquiry, type EnquiryKind, type FieldErrors } from "@/lib/validation";
import { ArrowRight, Check } from "@/components/ui/Icons";

type EnquiryFormProps = {
  kind: Extract<EnquiryKind, "enquiry" | "viewing">;
  propertyRef?: string;
  propertyTitle?: string;
  defaultInterest?: string;
  defaultMessage?: string;
};

type Status = "idle" | "sending" | "done";

const EASE = [0.22, 1, 0.36, 1] as const;

function todayIso(): string {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function EnquiryForm({ kind, propertyRef, propertyTitle, defaultInterest, defaultMessage }: EnquiryFormProps) {
  const id = useId();
  const doneRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [firstName, setFirstName] = useState("");

  // Move focus to the confirmation so keyboard and screen-reader users land on the result.
  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const input = {
      kind,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
      preferredDate: String(fd.get("preferredDate") ?? ""),
      company: String(fd.get("company") ?? ""),
      propertyRef,
    };

    const check = validateEnquiry(input);
    if (!check.ok) {
      setErrors(check.errors);
      const firstInvalid = Object.keys(check.errors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");
    const result = await submitEnquiry(check.data);
    if (result.ok) {
      setReference(result.reference);
      setFirstName((check.data.name ?? "").split(" ")[0]);
      setStatus("done");
    } else {
      setStatus("idle");
      setErrors(result.fields ?? {});
      setFormError(result.message);
    }
  }

  const fieldProps = (name: keyof FieldErrors) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  const errorFor = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="field-error">
        {errors[name]}
      </p>
    ) : null;

  const successCopy =
    kind === "viewing"
      ? `An adviser will call to confirm your viewing${propertyTitle ? ` of ${propertyTitle}` : ""}, usually within two working hours.`
      : "An adviser will reply within two working hours, Monday to Saturday.";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.div
          key="done"
          ref={doneRef}
          role="status"
          tabIndex={-1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
          className="rounded-[var(--radius-media)]"
        >
          <span className="grid size-12 place-items-center rounded-full bg-brand text-on-brand">
            <Check size={22} />
          </span>
          <h3 className="t-h3 mt-5">
            Thank you{firstName ? `, ${firstName}` : ""}. We&rsquo;ll be in touch today.
          </h3>
          <p className="mt-3 text-fg-muted">
            {successCopy} Your reference is <span className="numeric font-medium text-fg">{reference}</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/properties" className="btn btn-outline">
              Keep browsing
            </Link>
            <Link href="/journal/buying-in-dubai-from-abroad" className="link-line self-center">
              Read our buying guide <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, transition: { duration: 0.16 } }} className="grid gap-6">
          <div className="field">
            <label htmlFor={`${id}-name`}>Full name</label>
            <input {...fieldProps("name")} className="input" autoComplete="name" placeholder="Your name" />
            {errorFor("name")}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="field">
              <label htmlFor={`${id}-email`}>Email</label>
              <input {...fieldProps("email")} type="email" className="input" autoComplete="email" placeholder="name@example.com" />
              {errorFor("email")}
            </div>
            <div className="field">
              <label htmlFor={`${id}-phone`}>
                Phone <span className="font-normal">(optional)</span>
              </label>
              <input {...fieldProps("phone")} type="tel" className="input" autoComplete="tel" placeholder="+971 50 000 0000" />
              {errorFor("phone")}
            </div>
          </div>

          {kind === "viewing" ? (
            <div className="field">
              <label htmlFor={`${id}-preferredDate`}>Preferred day for a viewing</label>
              <input {...fieldProps("preferredDate")} type="date" min={todayIso()} className="input" />
              {errorFor("preferredDate")}
            </div>
          ) : (
            <>
              <div className="field">
                <label htmlFor={`${id}-interest`}>I&rsquo;m interested in</label>
                <select {...fieldProps("interest")} className="input" defaultValue={defaultInterest ?? INTERESTS[0]}>
                  {INTERESTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                {errorFor("interest")}
              </div>
              <div className="field">
                <label htmlFor={`${id}-message`}>How can we help?</label>
                <textarea
                  {...fieldProps("message")}
                  className="input"
                  defaultValue={defaultMessage}
                  placeholder="Tell us about the home you're looking for, your timing and budget."
                />
                {errorFor("message")}
              </div>
            </>
          )}

          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {formError ? (
            <p role="alert" className="field-error">
              {formError}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : kind === "viewing" ? "Request a viewing" : "Send enquiry"}
              <ArrowRight className="btn-arrow" />
            </button>
            <p className="text-sm text-fg-muted">We reply within two working hours.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
