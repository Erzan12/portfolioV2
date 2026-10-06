import { profile } from "@/data/profile";
import Image from "next/image";

export default function Sidebar() {
  const contacts = profile.contacts.filter((c) => c.href);
  return (
    <aside
      id="contact"
      className="border-b-[3px] border-ink bg-surface lg:sticky lg:top-[59px] lg:h-[calc(100dvh-59px)] lg:overflow-y-auto lg:border-b-0 lg:border-r-[3px]"
    >
      <div className="flex flex-col gap-6 p-5 lg:p-6">
        <div className="flex items-end gap-4 lg:block">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={512}
            height={512}
            priority
            className="shadow-hard aspect-square w-32 border-[3px] border-ink object-cover lg:w-full lg:max-w-[15rem]"
          />
          <div className="lg:mt-6">
            <h2 className="text-3xl font-extrabold leading-none lg:text-4xl">{profile.name}</h2>
            <p className="mt-2 font-mono text-sm">{profile.handle}, {profile.role}</p>
          </div>
        </div>

        <p className="text-lg leading-snug">{profile.bio}</p>

        {profile.available && (
          <p className="border-[3px] border-ink bg-spark px-3 py-2 font-extrabold text-on-spark">
            Open to new work
          </p>
        )}

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
          <dt>Based in</dt><dd className="font-bold">{profile.location}</dd>
          <dt>Now at</dt><dd className="font-bold">{profile.now}</dd>
          <dt>Experience</dt><dd className="font-bold">{profile.experience}</dd>
        </dl>

        <ul className="border-[3px] border-ink">
          {contacts.map((c) => (
            <li key={c.label} className="border-b-[3px] border-ink last:border-b-0">
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-baseline justify-between gap-4 px-3 py-2.5 hover:bg-accent hover:text-on-accent"
              >
                <span className="font-bold">{c.label}</span>
                <span className="truncate font-mono text-sm">{c.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}