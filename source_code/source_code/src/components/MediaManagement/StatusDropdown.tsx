import { useState, useEffect, useRef } from "react";
import { CircleEllipsis, CircleCheck, CircleX } from "lucide-react"; // Import icons
import { getFilters } from "../../utils/genericApiCalls";
import { capitalizeFirstLetter } from "../../utils/utils";
import { constantWords } from "../../utils/constantEnums";

interface StatusDropdownProps {
  setActiveStatus: (status: string) => void;
  handleUpdateStatus: (type: string, id: string|number) => void;
  tablelength: number;
  index: number;
}

type ContestType = {
  id: string | number;
  type: string;
};

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  setActiveStatus,
  handleUpdateStatus,
  tablelength,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(tablelength - 2 < index); // Add state to track direction of dropdown
  const [status, setStatus] = useState<string>(
    constantWords.PENDING,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [statusDopdownOptions, setStatusDropdownOptions] = useState<
    ContestType[] | null
  >([]);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = (type: string, id: string| number) => {
    setStatus(type);
    setActiveStatus(type);
      handleUpdateStatus(
        type,
        id
      );
    setIsOpen(false);
  };

  // Close dropdown if clicked outside

  useEffect(() => {
    if(isOpen){
      getFilters("request_status", setStatusDropdownOptions);

    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Adjust dropdown to open upwards if near the bottom of the viewport
  useEffect(() => {
    if (isOpen) {
      const rect = dropdownRef.current?.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 100) {
          setOpenUpwards(true); // If space below is less than 100px, open upwards
        } else if (tablelength - 2 < index) {
          setOpenUpwards(true);
        } else {
          setOpenUpwards(false); // Otherwise, open downwards
        }
      }
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Current Status Button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-1.5 rounded px-2 py-0.5 shadow-md ${
          status === constantWords.PENDING
            ? "bg-orange-100 text-orange-600"
            : status === constantWords.APPROVED
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
        }`}
        style={{ width: "90px", height: "22px" }}
      >
        {status === constantWords.PENDING && <CircleEllipsis size={16} />}
        {status === constantWords.APPROVED && <CircleCheck size={24} />}
        {status === constantWords.REJECT && <CircleX size={16} />}
        <span
          className=""
          style={{
            fontFamily: "Nunito",
            fontSize: "11px",
            fontWeight: "600",
            lineHeight: "13px",
            letterSpacing: "0.06px",
            textAlign: "left",
            width: "58px",
            height: "13px",
            overflow: "visible",
            textOverflow: "ellipsis",
          }}
        >
          {capitalizeFirstLetter(status)}
        </span>
        <span className="text-sm">⋮</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-10 rounded border bg-white shadow-lg"
          style={{
            width: "90px",
            marginTop: openUpwards ? "0" : "4px", // If opening upwards, no margin at the top
            top: openUpwards ? "auto" : "100%", // Open upwards if condition met
            bottom: openUpwards ? "100%" : "auto", // Adjust bottom if opening upwards
          }}
        >
          {statusDopdownOptions
            ?.filter((action) => action.type !== status)
            .map((action) => (
              <button
                key={action.id}
                onClick={() =>
                  handleStatusChange(action.type , action.id)
                }
                className={`flex w-full items-center gap-1.5 px-2 py-0.5 ${
                  action.type === constantWords.APPROVED
                    ? "bg-[#97D0A533] text-green-600"
                    : action.type === constantWords.PENDING
                      ? "bg-[#FD8A0233] text-orange-600"
                      : "bg-[#FF3B3033] text-red-600"
                }`}
                style={{ height: "22px" }}
              >
                {action.type === constantWords.APPROVED && <CircleCheck size={12} />}
                {action.type === constantWords.PENDING && <CircleEllipsis size={12} />}
                {action.type === constantWords.REJECT && <CircleX size={12} />}
                <span
                  style={{
                    fontFamily: "Nunito",
                    fontSize: "11px",
                    fontWeight: "600",
                    lineHeight: "13px",
                    letterSpacing: "0.06px",
                    textAlign: "left",
                    width: "58px",
                    height: "13px",
                    overflow: "visible",
                    textOverflow: "ellipsis",
                  }}
                >
                  {capitalizeFirstLetter(action.type)}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
