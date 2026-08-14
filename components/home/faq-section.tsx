"use client";

import { useId, useState } from "react";
import type { CopyBlock } from "@/lib/copy-blocks";

type FaqSectionProps = {
  title?: string | null;
  lede?: string | null;
  items: CopyBlock[];
  /** Soft band vs plain surface. */
  tone?: "muted" | "surface";
};

export function FaqSection({
  title = "Questions",
  lede,
  items,
  tone = "muted",
}: FaqSectionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section
      id="faq"
      className={`border-t border-border py-16 sm:py-20 ${
        tone === "muted" ? "bg-muted" : "bg-surface"
      }`}
      data-reveal
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--site-header-height,4.75rem)+1.5rem)] lg:self-start">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="heading">{title}</h2>
            {lede ? <p className="lede mt-4 max-w-md">{lede}</p> : null}
          </div>

          <ul className="faq-list">
            {items.map((item, index) => {
              const open = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;

              return (
                <li
                  key={`${item.title}-${index}`}
                  className={`faq-item ${open ? "is-open" : ""}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                      className="faq-trigger"
                    >
                      <span className="faq-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="faq-question">{item.title}</span>
                      <span className="faq-icon" aria-hidden="true">
                        <span className="faq-icon-bar faq-icon-bar-h" />
                        <span className="faq-icon-bar faq-icon-bar-v" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-panel"
                  >
                    <div className="faq-panel-inner">
                      <div className="faq-answer-row">
                        <span className="faq-index faq-index-spacer" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.body ? (
                          <p className="faq-answer">{item.body}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
