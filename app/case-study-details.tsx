import type { Project } from "@/content/portfolio";

const caseStudySections = [
  ["situation", "Situation"],
  ["task", "Task"],
  ["action", "Action"],
  ["result", "Result"],
] as const;

export function CaseStudyDetails({ project }: { project: Project }) {
  return (
    <>
      <p className="case-study-role">{project.role} · {project.period}</p>
      <dl className="case-study-steps">
        {caseStudySections.map(([key, label]) => (
          <div key={key}>
            <dt>{label}</dt>
            <dd>{project.caseStudy[key]}</dd>
          </div>
        ))}
      </dl>
      <h2>Tools and techniques</h2>
      <ul className="story-tools">
        {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
      </ul>
    </>
  );
}
