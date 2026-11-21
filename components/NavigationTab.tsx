import "./styles/navigationTab.css";
import Link from "next/link";

type NavigationTabProps = {
  label: string;
  isActive?: boolean;
  setActiveTab?: (tab: string) => void;
  href: string;
};

type handleClickProps = {
  label: string;
  setActiveTab?: (tab: string) => void;
};

const handleClick = ({ label, setActiveTab }: handleClickProps) => {
  if (setActiveTab) {
    setActiveTab(label);
  }
};

export const NavigationTab = ({
  label,
  isActive = false,
  setActiveTab,
  href,
}: NavigationTabProps) => {
  return (
    <Link
      href={href}
      className={`navigation-tab ${isActive ? "active" : ""}`}
      onClick={() => handleClick({ label, setActiveTab })}
    >
      <h3>{label}</h3>
    </Link>
  );
};
