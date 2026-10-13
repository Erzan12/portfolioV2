import { Panel } from "@/components/brut/panel";
import ContactForm from "@/components/contact-form";
import Scheduler from "@/components/scheduler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Erzan",
  description: "Book a call or send a message to Earl Jan Do.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="text-5xl md:text-7xl">Get in touch</h1>
      <p className="mt-3 max-w-[60ch] text-lg">
        Hiring, freelance, or talking shop. Book a call or send a message, whichever is easier for you.
        I&apos;m based in the Philippines (UTC+8), and the calendar shows times in your own timezone.
      </p>

      <section id="book" className="mt-12 scroll-mt-24">
        <h2 className="mb-6 text-4xl md:text-5xl">Book a call</h2>
        <Panel label="calendar ~ pick a time">
          <Scheduler />
        </Panel>
      </section>

      <section id="message" className="mt-16 scroll-mt-24">
        <h2 className="mb-6 text-4xl md:text-5xl">Send a message</h2>
        <div className="max-w-2xl">
          <Panel label="message ~">
            <ContactForm />
          </Panel>
        </div>
      </section>
    </main>
  );
}