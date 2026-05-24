import { Resend } from "resend";

import { validateContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

const CONFIGURATION_ERROR =
  "Contact delivery is not configured yet. Use the email link instead.";
const DELIVERY_ERROR =
  "The message could not be sent right now. Use the email link instead.";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Send a valid contact form payload." },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return Response.json(
      { ok: false, error: validation.error },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return Response.json(
      { ok: false, error: CONFIGURATION_ERROR },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const { data } = validation;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `Portfolio contact from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        "",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend contact delivery failed.", error);
      return Response.json(
        { ok: false, error: DELIVERY_ERROR },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Contact route failed.", error);
    return Response.json(
      { ok: false, error: DELIVERY_ERROR },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
