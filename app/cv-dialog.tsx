"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function CvDialog({ src }: { src: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <button
        className="cv-link"
        type="button"
        aria-haspopup="dialog"
        aria-controls="cv-dialog"
        onClick={() => {
          dialog.current?.showModal();
          setOpened(true);
        }}
      >
        View CV
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 13h6m-6 4h6" />
        </svg>
      </button>
      <dialog
        id="cv-dialog"
        className="cv-dialog"
        ref={dialog}
        aria-labelledby="cv-title"
        onPointerDown={(event) => {
          pressedBackdrop.current = event.target === event.currentTarget;
        }}
        onPointerUp={(event) => {
          if (pressedBackdrop.current && event.target === event.currentTarget) event.currentTarget.close();
          pressedBackdrop.current = false;
        }}
        onPointerCancel={() => { pressedBackdrop.current = false; }}
      >
        <div className="cv-dialog-header">
          <h2 id="cv-title">Curriculum vitae</h2>
          <div className="cv-dialog-actions">
            <a href={src} download>Download PDF</a>
            <button type="button" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
          </div>
        </div>
        {opened && (
          <div className="cv-document" role="region" aria-label="CV page previews" tabIndex={0}>
            {[1, 2].map((page) => (
              <Image
                key={page}
                src={`/cv/page-${page}.webp`}
                alt={`CV preview, page ${page} of 2. Download the PDF for selectable text.`}
                width={1391}
                height={1800}
                unoptimized
              />
            ))}
          </div>
        )}
      </dialog>
    </>
  );
}
