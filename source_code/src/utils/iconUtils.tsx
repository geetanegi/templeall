// iconUtils.tsx

import * as Icons from "lucide-react";

// Define the mapping of icon names to icon components
const iconMap = {
  Communities: Icons.UsersRound,
  Home: Icons.Home,
  Users: Icons.Users,
  Media: Icons.Calendar,
  Courses: Icons.LandPlot,
  Reports: Icons.Calendar,
  Contest: Icons.MonitorPlay,
  "Generate QR Code": Icons.QrCode,
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Function to get the icon component based on the provided name.
 * @param {IconProps} props - The properties for the icon.
 * @returns {JSX.Element | null} The icon component or null if not found.
 */
export const getIconComponent = ({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth,
}: IconProps): JSX.Element | null => {
  const IconComponent = iconMap[name as keyof typeof iconMap];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Returning null.`);
    return null; // Or return a default icon component
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className="p-[5px]"
    />
  );
};
