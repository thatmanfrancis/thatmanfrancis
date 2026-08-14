import type { ComponentType, SVGProps } from "react";
import type { CopyBlock } from "@/lib/copy-blocks";
import {
  BackendMark,
  DevOpsMark,
  FrontendMark,
  MobileMark,
  PracticeMark,
  UxMark,
} from "@/components/ui/icons";

type DisciplinesSectionProps = {
  title?: string | null;
  lede?: string | null;
  items: CopyBlock[];
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

function disciplineMark(title: string): IconComponent {
  const key = title.toLowerCase();
  if (key.includes("front")) return FrontendMark;
  if (key.includes("back") || key.includes("api")) return BackendMark;
  if (key.includes("ux") || key.includes("design") || key.includes("product")) {
    return UxMark;
  }
  if (key.includes("mobile") || key.includes("app")) return MobileMark;
  if (
    key.includes("devops") ||
    key.includes("ops") ||
    key.includes("infra") ||
    key.includes("cloud")
  ) {
    return DevOpsMark;
  }
  return PracticeMark;
}

export function DisciplinesSection({
  title = "What I take on",
  lede,
  items,
}: DisciplinesSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface py-16 sm:py-20" data-reveal>
      <div className="container-page">
        <p className="section-label mb-3">Practice</p>
        <h2 className="heading">{title}</h2>
        {lede ? <p className="lede mt-4">{lede}</p> : null}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Mark = disciplineMark(item.title);
            return (
              <li
                key={`${item.title}-${index}`}
                className="card-surface relative overflow-hidden p-6 sm:p-8"
              >
                <div className="relative z-10 max-w-60">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  {item.body ? (
                    <p className="mt-3 text-base font-medium leading-relaxed text-ink sm:text-[1.05rem]">
                      {item.body}
                    </p>
                  ) : null}
                </div>

                <Mark
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-5 size-32 text-ink/35 sm:size-40 [mask-image:radial-gradient(ellipse_at_bottom_right,black_35%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_at_bottom_right,black_35%,transparent_72%)]"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
