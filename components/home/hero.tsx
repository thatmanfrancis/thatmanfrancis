import Link from "next/link";
import { ArrowDownIcon, GithubIcon } from "@/components/ui/icons";
import { TechMark } from "@/components/ui/tech-mark";

type HeroProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  role?: string | null;
  skills?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  githubUrl?: string | null;
};

export function Hero({
  eyebrow = "Engineer · Builder · Writer",
  title,
  lede,
  role,
  skills = [],
  ctaHref = "#about",
  ctaLabel = "About me",
  githubUrl,
}: HeroProps) {
  return (
    <section className="hero-section bg-surface">
      <div className="container-page hero-container hero-container-pad">
        <div className="hero-shell relative">
          <div className="relative overflow-hidden rounded-4xl bg-ink px-8 py-16 text-white sm:px-14 sm:py-24">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-4 text-base font-medium uppercase tracking-[0.18em] text-white/70">
                {eyebrow}
              </p>
              {role ? (
                <p className="mb-3 text-sm font-semibold tracking-wide text-white/80">
                  {role}
                </p>
              ) : null}
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {lede ? (
                <p className="mb-8 text-lg font-light text-white/85">{lede}</p>
              ) : null}

              {skills.length > 0 ? (
                <ul className="mb-10 flex flex-wrap gap-3">
                  {skills.slice(0, 6).map((skill) => (
                    <li key={skill} className="tech-pill tech-pill-on-ink">
                      <TechMark name={skill} className="size-5" invert />
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex flex-wrap items-center gap-4">
                {ctaHref && ctaLabel ? (
                  ctaHref.startsWith("#") ? (
                    <a
                      href={ctaHref}
                      className="inline-flex items-center gap-2 text-base font-medium text-white transition hover:text-white/70"
                    >
                      <ArrowDownIcon className="size-4 animate-bounce" />
                      {ctaLabel}
                    </a>
                  ) : (
                    <Link
                      href={ctaHref}
                      className="inline-flex items-center gap-2 text-base font-medium text-white transition hover:text-white/70"
                    >
                      <ArrowDownIcon className="size-4 animate-bounce" />
                      {ctaLabel}
                    </Link>
                  )
                ) : null}
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-medium text-white/75 transition hover:text-white"
                  >
                    <GithubIcon className="size-4" />
                    GitHub
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-base font-medium text-white/45">
                    <GithubIcon className="size-4" />
                    GitHub
                  </span>
                )}
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
              aria-hidden="true"
            >
              <div className="absolute bottom-0 right-0 h-[120%] w-[85%] rounded-tl-[4rem] border-[28px] border-white/10" />
              <div className="absolute bottom-0 right-0 h-[95%] w-[65%] rounded-tl-[3rem] border-[28px] border-white/15" />
              <div className="absolute bottom-0 right-0 h-[70%] w-[45%] rounded-tl-[2rem] border-[28px] border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
