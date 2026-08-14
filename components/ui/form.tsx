"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";

type FieldMap = Record<string, string>;

export function useRequiredForm(initial: FieldMap, requiredKeys: string[]) {
  const [values, setValues] = useState<FieldMap>(initial);
  const [pending, setPending] = useState(false);

  const setValue = useCallback((key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const isValid = useMemo(() => {
    return requiredKeys.every((key) => {
      const value = values[key]?.trim() ?? "";
      if (!value) return false;
      if (key.toLowerCase().includes("email")) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      return true;
    });
  }, [requiredKeys, values]);

  const canSubmit = isValid && !pending;

  return {
    values,
    setValue,
    pending,
    setPending,
    isValid,
    canSubmit,
  };
}

export function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {children}
      {required ? (
        <span className="field-required" aria-hidden="true">
          *
        </span>
      ) : null}
      {required ? <span className="sr-only"> (required)</span> : null}
    </label>
  );
}

export function SubmitButton({
  pending,
  disabled,
  idleLabel,
  pendingLabel,
  className = "btn btn-primary",
}: {
  pending: boolean;
  disabled: boolean;
  idleLabel: string;
  pendingLabel: string;
  className?: string;
}) {
  return (
    <button type="submit" className={className} disabled={disabled || pending}>
      {pending ? (
        <>
          <span
            className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
            aria-hidden="true"
          />
          <span>{pendingLabel}</span>
        </>
      ) : (
        idleLabel
      )}
    </button>
  );
}
