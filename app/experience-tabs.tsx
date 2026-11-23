"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { experience } from "@/content/portfolio";
import { ProjectLinks } from "./project-links";

export function ExperienceTabs({ entries }: { entries: typeof experience }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = entries.length - 1;
    const targets: Record<string, number> = {
      ArrowUp: index === 0 ? last : index - 1,
      ArrowDown: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (typeof target !== "number") return;
    event.preventDefault();
    setSelected(target);
    tabs.current[target]?.focus();
  }

  return (
    <div className="career-desktop">
      <div className="career-tablist" role="tablist" aria-label="Employers and contracts" aria-orientation="vertical">
        {entries.map((entry, index) => (
          <button
            key={entry.name}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            role="tab"
            id={`career-tab-${index}`}
            aria-controls={`career-panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {entry.name}
          </button>
        ))}
      </div>
      {entries.map((entry, index) => (
        <div
          key={entry.name}
          className="career-panel"
          id={`career-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`career-tab-${index}`}
          tabIndex={0}
          hidden={selected !== index}
        >
          <h3>{entry.role}</h3>
          <div className="career-panel-meta">
            <div className="linked-name"><span>{entry.name}</span><ProjectLinks {...entry} /></div>
            <span>{entry.period}</span>
          </div>
          <ul className="career-points">
            {entry.contributions.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
