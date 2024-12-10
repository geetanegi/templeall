import React, { useEffect, useState } from "react";

interface TooltipSpan {
  text: string | number | React.ReactNode;
  tooltip: string;
  position?: "top" | "bottom" | "left" | "right";
  needPY?: boolean;
}

const TooltipSpan: React.FC<TooltipSpan> = ({
  text,
  tooltip,
  position = "top",
  needPY = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Tooltip positioning styles
  let tooltipStyles = "";
  let arrowStyles = "";

  switch (position) {
    case "top":
      tooltipStyles = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      arrowStyles =
        "absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 h-2 w-2 rotate-45";
      break;
    case "bottom":
      tooltipStyles = "top-full left-1/2 transform -translate-x-1/2 mt-2";
      arrowStyles =
        "absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-900 h-2 w-2 rotate-45";
      break;
    case "left":
      tooltipStyles = "top-1/2 right-full transform -translate-y-1/2 mr-2";
      arrowStyles =
        "absolute top-1/2 right-[-4px] transform -translate-y-1/2 bg-gray-900 h-2 w-2 rotate-45";
      break;
    case "right":
      tooltipStyles = "top-1/2 left-full transform -translate-y-1/2 ml-2";
      arrowStyles =
        "absolute top-1/2 left-[-4px] transform -translate-y-1/2 bg-gray-900 h-2 w-2 rotate-45";
      break;
    default:
      tooltipStyles = "top-full left-1/2 transform -translate-x-1/2 mt-2"; // Default: bottom
      arrowStyles =
        "absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-900 h-2 w-2 rotate-45";
  }

  useEffect(() => {
    const handleVisibilityReset = () => setIsVisible(false);
    window.addEventListener("blur", handleVisibilityReset);

    return () => {
      window.removeEventListener("blur", handleVisibilityReset);
    };
  }, []);

  return (
    <span
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      className="relative cursor-pointer"
    >
      <button
        className={`"rounded-lg px-1 ${needPY ? "py-2.5" : "-mb-2 -mt-2"} font-medium" text-center text-sm`}
      >
        {text}
      </button>

      {/* Tooltip visibility logic */}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-10 w-[180px] inline-block rounded-lg bg-gray-900 px-3 py-2 text-[13px] font-medium text-white opacity-100 shadow-sm transition-opacity duration-300 ${tooltipStyles}`}
        >
          {tooltip}
          {/* Tooltip arrow */}
          <div className={arrowStyles}></div>
        </div>
      )}
    </span>
  );
};

export default TooltipSpan;
