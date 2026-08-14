import type { ExperienceEntry } from "@/lib/copy-blocks";

type ExperienceTimelineProps = {
  title?: string | null;
  lede?: string | null;
  entries: ExperienceEntry[];
  /** Visual weight — ink panel for Work, quiet for About. */
  tone?: "light" | "ink";
};

/**
 * Split timeline: years on the left, monoline spine, role/org on the right.
 * Dense enough to avoid empty space, strong enough to read as a path.
 */
export function ExperienceTimeline({
  title = "Career",
  lede,
  entries,
  tone = "light",
}: ExperienceTimelineProps) {
  if (entries.length === 0) return null;

  const ink = tone === "ink";

  return (
    <section
      aria-labelledby="experience-heading"
      className={`experience-timeline ${ink ? "experience-timeline-ink" : ""}`}
    >
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <p
            className={`section-label mb-2 ${ink ? "text-white/55" : ""}`}
          >
            Timeline
          </p>
          <h2
            id="experience-heading"
            className={`heading ${ink ? "text-white" : ""}`}
          >
            {title ?? "Career"}
          </h2>
        </div>
        {lede ? (
          <p
            className={`max-w-md text-base font-medium leading-relaxed sm:text-right ${
              ink ? "text-white/70" : "text-ink-muted"
            }`}
          >
            {lede}
          </p>
        ) : null}
      </div>

      <ol className="experience-track">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          return (
            <li
              key={`${entry.years}-${entry.title}-${index}`}
              className={`experience-step ${isLast ? "is-last" : ""}`}
            >
              <div className="experience-years">
                <span className="experience-years-text">
                  {entry.years || "—"}
                </span>
              </div>

              <div className="experience-spine" aria-hidden="true">
                <span className="experience-node" />
                {!isLast ? <span className="experience-rail" /> : null}
              </div>

              <div className="experience-copy">
                <div className="experience-copy-top">
                  <h3 className="experience-role">{entry.title}</h3>
                  {entry.org ? (
                    <p className="experience-org">{entry.org}</p>
                  ) : null}
                </div>
                {entry.nature || entry.location ? (
                  <p className="experience-meta">
                    {[entry.nature, entry.location].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                {entry.body ? (
                  <p className="experience-body">{entry.body}</p>
                ) : null}
                {entry.bullets.length > 0 ? (
                  <ul className="experience-bullets">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
