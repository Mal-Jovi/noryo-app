"use client";

import { useSyncExternalStore } from "react";
import { isTauri } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "./styles/WindowControls.css";

// The runtime and platform stay fixed for the lifetime of the page.
const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () =>
  isTauri() && /Windows/i.test(navigator.userAgent);

export function WindowControls() {
  const showWindowControls = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!showWindowControls) {
    return null;
  }

  return (
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
  );
}
