import { useState, useEffect, useRef } from "react";
import { CircleEllipsis, CircleCheck, CircleX } from "lucide-react"; // Import icons

interface StatusDropdownProps {
  setActiveStatus :(status: string)=>void;
  handleUpdateStatus: (status: string)=>void
}

const StatusDropdown:React.FC<StatusDropdownProps> = ({setActiveStatus, handleUpdateStatus}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false); // Add state to track direction of dropdown
    const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const availableActions = {
        Pending: ["Approve", "Reject"],
        Approved: ["Pending", "Reject"],
        Rejected: ["Pending", "Approve"],
    };

    const statusMap = {
        Approve: "Approved",
        Reject: "Rejected",
        Pending: "Pending",
    } as const;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusChange = (action: keyof typeof statusMap) => {
        setStatus(statusMap[action] as "Pending" | "Approved" | "Rejected");
        setActiveStatus(statusMap[action] as "Pending" | "Approved" | "Rejected");
        if(statusMap[action] as "Rejected"){
            handleUpdateStatus(statusMap[action] as "Pending" | "Approved" | "Rejected")
        }
        setIsOpen(false);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
                className={`flex items-center gap-1.5 rounded shadow-md px-2 py-0.5
        ${status === "Pending"
                        ? "bg-orange-100 text-orange-600"
                        : status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                    }`}
                style={{ width: "90px", height: "22px" }}
            >
                {status === "Pending" && <CircleEllipsis size={16} />}
                {status === "Approved" && <CircleCheck size={24} />}
                {status === "Rejected" && <CircleX size={16} />}
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
                    {status}
                </span>
                <span className="text-sm">⋮</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute bg-white border rounded shadow-lg z-10"
                    style={{
                        width: "90px",
                        marginTop: openUpwards ? "0" : "4px", // If opening upwards, no margin at the top
                        top: openUpwards ? "auto" : "100%", // Open upwards if condition met
                        bottom: openUpwards ? "100%" : "auto", // Adjust bottom if opening upwards
                    }}
                >
                    {availableActions[status]?.map((action) => (
                        <button
                            key={action}
                            onClick={() => handleStatusChange(action as keyof typeof statusMap)}
                            className={`flex items-center gap-1.5 w-full px-2 py-0.5
                ${action === "Approve"
                                    ? "text-green-600 bg-[#97D0A533]"
                                    : action === "Pending"
                                        ? "text-orange-600 bg-[#FD8A0233]"
                                        : "text-red-600 bg-[#FF3B3033]"
                                }`}
                            style={{ height: "22px" }}
                        >
                            {action === "Approve" && <CircleCheck size={12} />}
                            {action === "Pending" && <CircleEllipsis size={12} />}
                            {action === "Reject" && <CircleX size={12} />}
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
                                {action}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusDropdown;
