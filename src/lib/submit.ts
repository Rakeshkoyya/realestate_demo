import type { ApiResponse, EnquiryInput, FieldErrors } from "./validation";

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fields?: FieldErrors };

/** Client helper for POST /api/enquiry with a friendly failure message. */
export async function submitEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const body = (await res.json()) as ApiResponse<{ reference: string }>;
    if (body.success) return { ok: true, reference: body.data.reference };
    return { ok: false, message: body.error, fields: body.fields };
  } catch {
    return { ok: false, message: "We couldn't reach our server. Check your connection, or call us on +971 4 388 2140." };
  }
}
