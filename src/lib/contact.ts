export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

const CONTACT_VALIDATION_ERROR =
  "Complete the form with a valid name, email, and message.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(payload: Record<string, unknown>, key: keyof ContactPayload) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function hasLineBreak(value: string) {
  return value.includes("\n") || value.includes("\r");
}

export function validateContactPayload(payload: unknown): ContactValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: CONTACT_VALIDATION_ERROR };
  }

  const fields = payload as Record<string, unknown>;
  const data = {
    name: readField(fields, "name"),
    email: readField(fields, "email"),
    message: readField(fields, "message"),
  };

  const invalidName =
    data.name.length < 2 || data.name.length > 100 || hasLineBreak(data.name);
  const invalidEmail =
    data.email.length > 320 ||
    hasLineBreak(data.email) ||
    !EMAIL_PATTERN.test(data.email);
  const invalidMessage =
    data.message.length < 20 || data.message.length > 5000;

  if (invalidName || invalidEmail || invalidMessage) {
    return { ok: false, error: CONTACT_VALIDATION_ERROR };
  }

  return { ok: true, data };
}
