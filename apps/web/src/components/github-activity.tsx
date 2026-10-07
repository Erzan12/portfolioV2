import { getGithubActivity } from "@/lib/github/github";
import { Button } from "./brut/button";
import { Panel } from "./brut/panel";

const LOGIN = "Erzan12";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = new Intl.NumberFormat("en-US");

// level 0 is an empty cell; 1-4 mix the accent color into the surface color
const cellColor = (level: number) =>
  level === 0 ? "var(--surface)" : `color-mix(in srgb, var(--accent) ${[0, 30, 55, 80, 100][level]}%, var(--surface))`;

export default async function GithubActivity() {
  const g = await getGithubActivity(LOGIN);
  if (!g) return null;

  const cols = g.weeks.length;
  const pad = 7 - g.weeks[0].length; // first week can start mid-week
  const month = (i: number) => Number(g.weeks[i][0].date.slice(5, 7)) - 1;
  const all = g.weeks
    .map((_, i) => ({ i, label: MONTHS[month(i)], changed: i === 0 || month(i) !== month(i - 1) }))
    .filter((m) => m.changed && m.i < cols - 2);
  const labels = all.filter((m, k) => !(all[k + 1] && all[k + 1].i - m.i < 3));
  const max = Math.max(...g.repos.map((r) => r.commits), 1);

  const stats = [
    { label: "Contributions, last year", value: fmt.format(g.total) },
    { label: "Commits", value: fmt.format(g.commits) },
    { label: "Pull requests", value: fmt.format(g.pullRequests) },
    { label: "Streak now / best", value: `${g.currentStreak} / ${g.longestStreak} days` },
  ];

  return (
    <section id="activity" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <h2 className="text-5xl md:text-6xl">GitHub activity</h2>
        <Button href={`https://github.com/${LOGIN}`} variant="plain">Open profile</Button>
      </div>

      <Panel label={`github.com/${LOGIN} ~ last 12 months, refreshed hourly`}>
        <dl className="grid grid-cols-2 border-[3px] border-ink md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`border-ink px-4 py-3 ${i % 2 === 0 ? "border-r-[3px]" : ""} ${i < 2 ? "border-b-[3px] md:border-b-0" : ""} ${i < 3 ? "md:border-r-[3px]" : "md:border-r-0"}`}>
              <dt className="font-mono text-xs">{s.label}</dt>
              <dd className="text-2xl font-extrabold md:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 overflow-x-auto pb-2">
          <div className="min-w-[680px]" role="img" aria-label={`Contribution graph: ${fmt.format(g.total)} contributions in the last year`}>
            <div className="grid gap-[3px] font-mono text-xs" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {labels.map((l) => (
                <span key={l.i} className="whitespace-nowrap" style={{ gridColumnStart: l.i + 1, gridRow: 1 }}>{l.label}</span>
              ))}
            </div>
            <div className="mt-1 grid auto-cols-fr grid-flow-col grid-rows-7 gap-[3px]">
              {Array.from({ length: pad }).map((_, k) => <div key={`pad${k}`} />)}
              {g.weeks.flat().map((d) => (
                <div
                  key={d.date}
                  title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                  className="aspect-square border border-ink/30"
                  style={{ background: cellColor(d.level) }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-end gap-1.5 font-mono text-xs">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-3.5 border border-ink/30" style={{ background: cellColor(l) }} />
          ))}
          <span>More</span>
        </div>

        {g.repos.length > 0 && (
          <>
            <h3 className="mt-8 text-2xl">Where the commits went</h3>
            <ul className="mt-3 border-[3px] border-ink">
              {g.repos.map((r) => (
                <li key={r.name} className="border-b-[3px] border-ink last:border-b-0">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="grid items-center gap-x-4 gap-y-1 px-4 py-3 hover:bg-accent hover:text-on-accent sm:grid-cols-[minmax(0,14rem)_1fr_7rem]"
                  >
                    <span className="truncate font-bold">{r.name}</span>
                    <span className="h-3 border-2 border-ink bg-surface">
                      <span className="block h-full bg-ink" style={{ width: `${(r.commits / max) * 100}%` }} />
                    </span>
                    <span className="font-mono text-sm sm:text-right">{fmt.format(r.commits)} commits</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </Panel>
    </section>
  );
}