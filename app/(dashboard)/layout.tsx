import type { ReactNode } from "react";
import { NavigationPane } from "@/components/NavigationPane";
import { PagePane } from "@/components/PagePane";

import "./dashboard.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pageLayout">
      <NavigationPane />
      <PagePane>{children}</PagePane>
    </div>
  );
}
