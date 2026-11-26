import "./styles/NavigationTab.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavigationTabProps = {
  label: string;
  href: string;
};

export const NavigationTab = ({ label, href }: NavigationTabProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`navigation-tab ${isActive ? "active" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      <h3>{label}</h3>
    </Link>
  );
};
