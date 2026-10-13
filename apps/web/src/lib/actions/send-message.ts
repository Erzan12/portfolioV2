"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name").max(80),
  email: z.email("Enter a valid email address"),
  role: z.enum(["Recruiter", "Client", "Developer", "Other"]),
  message: z.string().trim().min(10, "Add a few more words").max(3000),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fields?: Record<string, string[] | undefined>;
  values?: Record<string, string>; // echoed back because React resets the form after an action
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Bots: honeypot filled, or submitted faster than a human could type. Pretend it worked.
  const started = Number(formData.get("startedAt"));
  if (formData.get("website") || !started || Date.now() - started < 3000) return { ok: true };

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    role: String(formData.get("role") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, fields: z.flattenError(parsed.error).fieldErrors, values: raw };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false, error: "Messaging is unavailable right now. Please email me directly.", values: raw };
  }

  const { name, email, role, message } = parsed.data;
  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "do.earljan@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] ${role}: ${name}`.replace(/[\r\n]+/g, " "),
      text: `From: ${name} <${email}>\nAs: ${role}\n\n${message}`,
    });
    if (error) throw new Error(error.message);
  } catch {
    return { ok: false, error: "Something went wrong sending that. Please try again or email me directly.", values: raw };
  }
  return { ok: true };
}