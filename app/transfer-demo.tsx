"use client";

import { useState } from "react";
import { transferDemo } from "@/content/portfolio";

export function TransferDemo() {
  const [selected, setSelected] = useState(0);
  const state = transferDemo.states[selected];

  return (
    <div className="transfer-demo">
      <div className="transfer-controls">
        <h4>{transferDemo.label}</h4>
        <div className="transfer-options" role="group" aria-label="Choose a sample transfer status">
          {transferDemo.states.map(({ label }, index) => (
            <button key={label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <pre className="transfer-json" aria-label={`${state.label} transfer JSON`}>
        <code>{JSON.stringify(state.response, null, 2)}</code>
      </pre>
      <p className="sr-only" role="status">{state.label}. {state.response.message}</p>
    </div>
  );
}
