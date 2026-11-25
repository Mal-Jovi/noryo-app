"use client";

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { NavigationTab } from "./NavigationTab";
import "./styles/Pane.css";

export const NavigationPane = () => {
  const [activeTab, setActiveTab] = useState("Doctors");

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
        <NavigationTab
          key={tab.href}
          label={tab.label}
          href={tab.href}
          isActive={activeTab === tab.label}
          setActiveTab={setActiveTab}
        />
      ))}
    </nav>
  );
};
