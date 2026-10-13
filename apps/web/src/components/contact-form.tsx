"use client";

import { ContactState, sendMessage } from "@/lib/actions/send-message";
import { useActionState, useEffect, useState } from "react";

const ROLES = ["Recruiter", "Client", "Developer", "Other"] as const;
const field = "w-full border-[3px] border-ink bg-surface px-3 py-2.5 text-base";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { ok: false });
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => setStartedAt(Date.now()), []);

  if (state.ok) {
    return (
      <div className="border-[3px] border-ink bg-spark p-6 text-on-spark">
        <p className="text-2xl font-extrabold">Message sent.</p>
        <p className="mt-2 text-lg">Thanks for reaching out. I&apos;ll reply to the email address you gave.</p>
      </div>
    );
  }

  const err = (name: string) =>
    state.fields?.[name]?.[0] ? (
      <p className="mt-1 text-sm font-bold text-destructive" role="alert">{state.fields[name]![0]}</p>
    ) : null;
  const v = state.values ?? {};

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className="font-bold">Name</label>
        <input id="name" name="name" required autoComplete="name" defaultValue={v.name} className={field} />
        {err("name")}
      </div>

      <div>
        <label htmlFor="email" className="font-bold">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} className={field} />
        {err("email")}
      </div>

      <fieldset>
        <legend className="font-bold">I&apos;m reaching out as</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <label key={r}>
              <input type="radio" name="role" value={r} defaultChecked={(v.role ?? "Recruiter") === r} className="peer sr-only" />
              <span className="inline-block cursor-pointer border-[3px] border-ink bg-paper px-3 py-1.5 font-semibold hover:bg-spark hover:text-on-spark peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-dashed peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ink">
                {r}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="font-bold">Message</label>
        <textarea id="message" name="message" required rows={6} defaultValue={v.message} className={field} />
        {err("message")}
      </div>

      {state.error && <p className="border-[3px] border-dashed border-ink px-3 py-2 font-semibold" role="alert">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="press shadow-hard-sm border-[3px] border-ink bg-accent px-6 py-3 text-lg font-extrabold text-on-accent disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}