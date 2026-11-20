import type { ReactNode } from "react";
import "./pane.css";
import { SearchBar } from "./SearchBar";

interface PagePaneProps {
  placeholder?: string;
  children?: ReactNode;
}

export const PagePane = ({
  placeholder = "results...",
  children,
}: PagePaneProps) => {
  return (
    <div className="page-pane">
      <SearchBar />
      <div className="page-pane-content">{children}</div>
    </div>
  );
};
