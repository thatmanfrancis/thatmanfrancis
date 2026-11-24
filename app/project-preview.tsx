"use client";

import { useId, useRef } from "react";
import type { Project } from "@/content/portfolio";
import { CaseStudyDetails } from "./case-study-details";

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
          <CaseStudyDetails project={project} />
        </div>
      </dialog>
    </>
  );
}
