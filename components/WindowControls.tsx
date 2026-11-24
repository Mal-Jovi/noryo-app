"use client";

import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "./styles/WindowControls.css";

export function WindowControls() {
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    setIsWindows(/Windows/i.test(navigator.userAgent));
  }, []);

  if (!isWindows) {
    return null;
  }

  return (
    <>
      {isWindows && (
        <div className="window-controls">
          <button
            type="button"
            onClick={() => getCurrentWindow().minimize()}
            aria-label="Minimize"
            className="window-control-btn group"
          >
            <svg
              className="window-control-icon"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M2.5 6h7" />
            </svg>
          </button>
          <span className="window-control-divider" aria-hidden="true" />
          <button
            type="button"
            onClick={() => getCurrentWindow().toggleMaximize()}
            aria-label="Maximize"
            className="window-control-btn group"
          >
            <svg
              className="window-control-icon-maximize"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2.25" y="2.25" width="7.5" height="7.5" rx="1.5" />
            </svg>
          </button>
          <span className="window-control-divider" aria-hidden="true" />
          <button
            type="button"
            onClick={() => getCurrentWindow().close()}
            aria-label="Close"
            className="window-control-btn window-control-btn-close group"
          >
            <svg
              className="window-control-icon"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 3l6 6M9 3l-6 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
