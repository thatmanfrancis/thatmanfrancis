"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { prettySample } from "@/lib/project";

type ApiResponsePanelProps = {
  endpoint?: string | null;
  sample: string;
};

function parseEndpoint(endpoint: string) {
  const match = endpoint.trim().match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(.+)$/i);
  if (!match) return { method: null, path: endpoint.trim() };
  return { method: match[1].toUpperCase(), path: match[2] };
}

export function ApiResponsePanel({ endpoint, sample }: ApiResponsePanelProps) {
  const [copied, setCopied] = useState(false);
  const body = prettySample(sample);
  const parsed = endpoint ? parseEndpoint(endpoint) : null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-ink text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Sample response
          </p>
          {parsed ? (
            <p className="mt-1 truncate font-mono text-sm text-white/80">
              {parsed.method ? (
                <span className="mr-2 font-semibold text-white">{parsed.method}</span>
              ) : null}
              {parsed.path}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-white/85 sm:p-6">
        {body}
      </pre>
    </section>
  );
}
