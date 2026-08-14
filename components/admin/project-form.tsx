"use client";

import { useActionState, useState } from "react";
import type { Project } from "@/lib/generated/prisma";
import { upsertProjectAction } from "@/app/admin/actions";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FieldLabel, SubmitButton } from "@/components/ui/form";
import { PROJECT_KINDS } from "@/lib/project";

type ProjectFormProps = {
  project?: Project | null;
};

async function projectAction(_prev: null, formData: FormData) {
  await upsertProjectAction(formData);
  return null;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [, action, pending] = useActionState(projectAction, null);
  const [title, setTitle] = useState(project?.title ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [description, setDescription] = useState(project?.description ?? "");

  const canSubmit =
    title.trim().length > 0 &&
    summary.trim().length > 0 &&
    description.trim().length > 0 &&
    !pending;

  return (
    <form action={action} className="card-surface space-y-5 p-6 sm:p-8">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div>
        <FieldLabel htmlFor="title" required>
          Title
        </FieldLabel>
        <input
          id="title"
          name="title"
          required
          disabled={pending}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="slug">Slug</FieldLabel>
        <input
          id="slug"
          name="slug"
          disabled={pending}
          defaultValue={project?.slug ?? ""}
          placeholder="auto-from-title"
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="summary" required>
          Summary
        </FieldLabel>
        <textarea
          id="summary"
          name="summary"
          required
          rows={2}
          disabled={pending}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          className="field-input"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="kind">Type</FieldLabel>
          <select
            id="kind"
            name="kind"
            disabled={pending}
            defaultValue={project?.kind ?? "product"}
            className="field-input"
          >
            {PROJECT_KINDS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="role">Role</FieldLabel>
          <input
            id="role"
            name="role"
            disabled={pending}
            defaultValue={project?.role ?? ""}
            placeholder="Full-stack engineer"
            className="field-input"
          />
        </div>
        <div>
          <FieldLabel htmlFor="year">Year</FieldLabel>
          <input
            id="year"
            name="year"
            disabled={pending}
            defaultValue={project?.year ?? ""}
            placeholder="2026"
            className="field-input"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="problem">Problem</FieldLabel>
        <textarea
          id="problem"
          name="problem"
          rows={4}
          disabled={pending}
          defaultValue={project?.problem ?? ""}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="description" required>
          What I built
        </FieldLabel>
        <textarea
          id="description"
          name="description"
          required
          rows={8}
          disabled={pending}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="outcome">Outcome</FieldLabel>
        <textarea
          id="outcome"
          name="outcome"
          rows={4}
          disabled={pending}
          defaultValue={project?.outcome ?? ""}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="stack">Stack (comma-separated)</FieldLabel>
        <input
          id="stack"
          name="stack"
          disabled={pending}
          defaultValue={project?.stack?.join(", ") ?? ""}
          placeholder="Next.js, Prisma, PostgreSQL"
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="endpoint">API endpoint</FieldLabel>
        <input
          id="endpoint"
          name="endpoint"
          disabled={pending}
          defaultValue={project?.endpoint ?? ""}
          placeholder="POST /v1/leads"
          className="field-input font-mono text-sm"
        />
        <p className="mt-2 text-sm text-ink-muted">
          For backend work. Shown above the sample response on the case study.
        </p>
      </div>

      <div>
        <FieldLabel htmlFor="apiSample">Sample API response</FieldLabel>
        <textarea
          id="apiSample"
          name="apiSample"
          rows={10}
          disabled={pending}
          defaultValue={project?.apiSample ?? ""}
          placeholder={'{\n  "ok": true\n}'}
          className="field-input font-mono text-sm"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="projectUrl">Project URL</FieldLabel>
          <input
            id="projectUrl"
            name="projectUrl"
            type="url"
            disabled={pending}
            defaultValue={project?.projectUrl ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <FieldLabel htmlFor="repoUrl">Repo URL</FieldLabel>
          <input
            id="repoUrl"
            name="repoUrl"
            type="url"
            disabled={pending}
            defaultValue={project?.repoUrl ?? ""}
            className="field-input"
          />
        </div>
      </div>

      <ImageUploadField
        id="coverUrl"
        name="coverUrl"
        label="Cover image"
        defaultValue={project?.coverUrl}
        hint="Shown on Work and the project page. Stored on this server."
        disabled={pending}
      />

      <div>
        <FieldLabel htmlFor="sortOrder">Sort order</FieldLabel>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          disabled={pending}
          defaultValue={project?.sortOrder ?? 0}
          className="field-input"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured ?? false}
            disabled={pending}
            className="size-4 disabled:cursor-not-allowed disabled:opacity-60"
          />
          Featured
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project?.published ?? false}
            disabled={pending}
            className="size-4 disabled:cursor-not-allowed disabled:opacity-60"
          />
          Published
        </label>
      </div>

      <SubmitButton
        pending={pending}
        disabled={!canSubmit}
        idleLabel={project ? "Save project" : "Create project"}
        pendingLabel="Saving..."
      />
    </form>
  );
}
