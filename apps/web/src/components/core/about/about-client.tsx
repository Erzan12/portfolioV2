import Image from "next/image";
import { profile, hasEmail, emailHref, resumeHref } from "@/data/profile";
import { Panel } from "@/components/brut/panel";
import { Stamp, Tag } from "@/components/brut/stamp";
import { Button } from "@/components/brut/button";
import { experience, principles, stackGroups } from "@/data/about";

const wrap = "mx-auto max-w-6xl px-5 md:px-8";

export default function AboutClient({ avatar }: { avatar?: string | null }) {
  const contacts = profile.contacts.filter((c) => c.href && c.label !== "Resume");

  return (
    <main>
      {/* Intro */}
      <section className={`${wrap} grid gap-10 py-12 md:py-20 lg:grid-cols-[1fr_20rem] lg:items-start`}>
        <div>
          <p className="font-mono text-sm">{profile.name}, {profile.role}, {profile.location}</p>
          <h1 className="mt-4 text-5xl md:text-7xl">Building what works, and what lasts.</h1>
          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed">
            <p>
              I&apos;m Earl Jan Do, a web developer from the Philippines with over 4 years of experience
              building scalable web applications, systems, and API solutions. I work across backend and
              frontend, and I focus on applications that are efficient, maintainable, and easy to use.
            </p>
            <p>
              I approach development with a strong emphasis on scalability, performance, and clean
              architecture. My journey has moved from building what&apos;s trendy to focusing on what
              truly works and lasts.
            </p>
            <p>
              Working with other developers teaches me a lot. I value opinions and feedback, and I&apos;ve
              learned the value of going deep into a technology and mastering it. Depth creates
              long-term growth and opens opportunities for innovation.
            </p>
            <p>
              Outside of coding, I explore new web technologies, dig into open-source projects, and
              keep learning and giving back to the developer community.
            </p>
          </div>
        </div>

        <figure>
          <Image
            src={avatar || profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={640}
            height={640}
            priority
            className="shadow-hard aspect-square w-full max-w-xs border-[3px] border-ink object-cover"
          />
          <figcaption className="mt-4 font-mono text-sm">Based in {profile.location}</figcaption>
        </figure>
      </section>

      {/* The three questions */}
      <section className={`${wrap} py-6`}>
        <Panel tone="spark" label="what I ask on every project">
          <p className="text-3xl font-extrabold leading-tight md:text-5xl">
            Is this solution scalable? Can it be improved? How can it be optimized?
          </p>
        </Panel>
      </section>

      {/* Experience */}
      <section id="experience" className={`${wrap} scroll-mt-24 py-16`}>
        <h2 className="text-5xl md:text-6xl">Experience</h2>
        <ul className="mt-8 border-t-[3px] border-ink">
          {experience.map((e) => (
            <li
              key={e.org + e.role}
              className="grid gap-3 border-b-[3px] border-ink px-4 py-6 md:grid-cols-[11rem_1fr_6rem] md:gap-8"
            >
              <span className="font-mono text-sm">{e.from} to {e.to}</span>
              <div>
                <h3 className="text-2xl font-extrabold leading-tight">{e.role}</h3>
                <p className="mt-1 text-lg">{e.org}</p>
                {e.highlights.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-lg">
                    {e.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}
              </div>
              <div className="md:text-right">{e.to === "Present" && <Stamp kind="ongoing" />}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section id="stack" className={`${wrap} scroll-mt-24 py-16`}>
        <h2 className="text-5xl md:text-6xl">Stack</h2>
        <ul className="mt-8 border-t-[3px] border-ink">
          {stackGroups.map((g) => (
            <li key={g.group} className="grid gap-3 border-b-[3px] border-ink px-4 py-5 md:grid-cols-[11rem_1fr] md:gap-8">
              <h3 className="text-xl font-extrabold">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((i) => <Tag key={i}>{i}</Tag>)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Approach */}
      <section id="my-approach" className={`${wrap} scroll-mt-24 py-16`}>
        <h2 className="text-5xl md:text-6xl">How I work</h2>
        <div className="mt-8 grid border-[3px] border-ink bg-surface md:grid-cols-2">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={[
                "border-ink p-6",
                i % 2 === 0 ? "md:border-r-[3px]" : "",
                i < 2 ? "border-b-[3px]" : i === 2 ? "border-b-[3px] md:border-b-0" : "",
              ].join(" ")}
            >
              <h3 className="text-2xl font-extrabold leading-tight">{p.title}</h3>
              <p className="mt-2 text-lg">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact (replaces the sidebar on this page) */}
      <section id="contact" className={`${wrap} scroll-mt-24 pb-24 pt-16`}>
        <Panel label="contact ~">
          <h2 className="text-4xl md:text-5xl">Open to new work.</h2>
          <p className="mt-3 max-w-[60ch] text-lg">
            Hiring, freelance, or just talking shop. Reach me through any of these.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {hasEmail && <Button href={emailHref} variant="accent" size="lg">Hire me</Button>}
            {resumeHref && <Button href={resumeHref} variant={hasEmail ? "ink" : "accent"} size="lg">View resume</Button>}
            <Button href="/projects" variant="plain" size="lg">See projects</Button>
          </div>
          <ul className="mt-8 grid border-[3px] border-ink sm:grid-cols-2">
            {contacts.map((c, i) => (
              <li key={c.label} className={`border-ink ${i < contacts.length - (contacts.length % 2 === 0 ? 2 : 1) ? "border-b-[3px]" : ""} ${i % 2 === 0 ? "sm:border-r-[3px]" : ""}`}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-accent hover:text-on-accent"
                >
                  <span className="font-bold">{c.label}</span>
                  <span className="truncate font-mono text-sm">{c.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </main>
  );
}