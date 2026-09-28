export const ENQUIRY_KINDS = ["enquiry", "viewing", "newsletter"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export const INTERESTS = ["Buying", "Selling", "Renting", "Furnished stay", "Property management", "Something else"] as const;

export type EnquiryInput = {
  kind: EnquiryKind;
  name?: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  propertyRef?: string;
  preferredDate?: string;
  company?: string; // honeypot — must stay empty
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export type ValidationResult =
  | { ok: true; data: EnquiryInput }
  | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s()-]{7,20}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Shared by the forms (instant feedback) and the API route (the real boundary). */
export function validateEnquiry(raw: unknown): ValidationResult {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const kind = ENQUIRY_KINDS.includes(src.kind as EnquiryKind) ? (src.kind as EnquiryKind) : "enquiry";

  const data: EnquiryInput = {
    kind,
    name: str(src.name, 80),
    email: str(src.email, 120),
    phone: str(src.phone, 24),
    interest: str(src.interest, 40),
    message: str(src.message, 2000),
    propertyRef: str(src.propertyRef, 20),
    preferredDate: str(src.preferredDate, 10),
    company: str(src.company, 80),
  };

  const errors: FieldErrors = {};

  if (!EMAIL_RE.test(data.email)) errors.email = "Enter an email address like name@example.com.";

  if (kind !== "newsletter") {
    if ((data.name ?? "").length < 2) errors.name = "Tell us your name so we know who to ask for.";
    if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = "Use digits only, with an optional + and country code.";
  }
  if (kind === "enquiry" && (data.message ?? "").length < 10) {
    errors.message = "A sentence or two helps us prepare. At least 10 characters.";
  }
  if (kind === "enquiry" && data.interest && !INTERESTS.includes(data.interest as (typeof INTERESTS)[number])) {
    errors.interest = "Choose one of the options.";
  }
  if (kind === "viewing") {
    if (!DATE_RE.test(data.preferredDate ?? "")) {
      errors.preferredDate = "Choose a date for the viewing.";
    } else if (new Date(`${data.preferredDate}T23:59:59`) < new Date()) {
      errors.preferredDate = "Choose a date from today onwards.";
    }
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export type ApiResponse<T> = { success: true; data: T; error: null } | { success: false; data: null; error: string; fields?: FieldErrors };
