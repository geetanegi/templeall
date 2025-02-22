import React from "react";

interface ProgressBarProps {
  progress: number; // percentage completed (0 to 100)
  height?: string;  // optional height for the bar
  color?: string;   // optional color for the progress
  label?: string;   // optional label to display inside the progress bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "18px",
  color = "#95C11E",
  label,
}) => {
  return (
    <div className="relative">
  <style>
    {`
      @keyframes progress-stripes {
        from { background-position: 0 0; }
        to { background-position: 20px 0; }
      }
    `}
  </style>
  <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height }}>
    <div
      className="h-full flex items-center justify-center text-white text-sm font-medium transition-all"
      style={{
        width: `${progress}%`,
        backgroundColor: color,
        backgroundImage: `linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.3) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0.3) 75%,
          transparent 75%,
          transparent
        )`,
        backgroundSize: "20px 20px",
        animation: "progress-stripes 1s linear infinite",
      }}
    ></div>
  </div>
  <span className="absolute left-[45%] top-0">
    {label ? `${label} ${progress}%` : `${progress}%`}
  </span>
</div>

);
};

export default ProgressBar;
