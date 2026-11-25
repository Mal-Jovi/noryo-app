"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NavigationPane } from "@/components/NavigationPane";
import { PagePane } from "@/components/PagePane";
import { SettingsIcon } from "@/components/SettingsIcon";

import "./dashboard.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[1] || "doctors";

  return (
    <div className="pageLayout" data-tab={activeTab}>
      <NavigationPane />
      <PagePane>{children}</PagePane>
      <footer className="dashboard-footer">
        <h5>© Jovi Sidhu 2026</h5>
      </footer>
    </div>
  );
}
