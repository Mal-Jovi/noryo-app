import "./styles/navigationTab.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavigationTabProps = {
  label: string;
  isActive?: boolean;
  setActiveTab?: (tab: string) => void;
  href: string;
};

export const NavigationTab = ({
  label,
  isActive = false,
  setActiveTab,
  href,
}: NavigationTabProps) => {
  const pathname = usePathname();

  const handleNavigate = (e: { preventDefault: () => void }) => {
    // Prevent state update and navigation when already on this tab
    if (isActive || pathname === href) {
      e.preventDefault();
      return;
    }

    setActiveTab?.(label);
  };

  return (
    <Link
      href={href}
      className={`navigation-tab ${isActive ? "active" : ""}`}
      onNavigate={handleNavigate}
    >
      <h3>{label}</h3>
    </Link>
  );
};
