import Image from "next/image";
import gearIcon from "../app/assets/settingsGear.png";
import "./styles/SettingsIcon.css";

export const SettingsIcon = () => {
  return (
    <div className="settings-icon">
      <Image src={gearIcon} alt="Settings" width={24} height={24} />
    </div>
  );
};
