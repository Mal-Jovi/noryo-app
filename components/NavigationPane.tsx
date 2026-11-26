"use client";

import { NavigationTab } from "./NavigationTab";
import "./styles/Pane.css";

export const NavigationPane = () => {
  const Tabs = [
    { label: "Doctors", href: "/doctors" },
    { label: "Patients", href: "/patients" },
    { label: "Medications", href: "/medications" },
    { label: "Schedules", href: "/schedules" },
  ];

  return (
    <nav className="navigation-pane">
      <h1>Noryo</h1>

      {Tabs.map((tab) => (
        <NavigationTab key={tab.href} label={tab.label} href={tab.href} />
      ))}
    </nav>
  );
};
