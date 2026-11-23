"use client";

import { useId, useRef } from "react";
import type { Project } from "@/content/portfolio";

const caseStudySections = [
  ["situation", "Situation"],
  ["task", "Task"],
  ["action", "Action"],
  ["result", "Result"],
] as const;

export function ProjectPreview({ project }: { project: Project }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="project-preview-trigger"
        type="button"
        aria-label={`View more about ${project.name}`}
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={() => dialog.current?.showModal()}
      >
        View more
      </button>
      <dialog
        id={id}
        className="cv-dialog project-dialog"
        ref={dialog}
        aria-labelledby={`${id}-title`}
        closedby="any"
      >
        <div className="cv-dialog-header">
          <h2 id={`${id}-title`}>{project.name}</h2>
          <div className="cv-dialog-actions">
            <button type="button" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
          </div>
        </div>
        <div className="project-preview-details">
          <p className="case-study-role">{project.role} · {project.period}</p>
          <dl className="case-study-steps">
            {caseStudySections.map(([key, label]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{project.caseStudy[key]}</dd>
              </div>
            ))}
          </dl>
          <h3>Tools and techniques</h3>
          <ul className="story-tools">
            {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      </dialog>
    </>
  );
}
