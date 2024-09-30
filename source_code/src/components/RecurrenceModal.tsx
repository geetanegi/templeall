import Modal from "../components/Modals/Modal";
import ReusableDatePicker from "./ReusableDatePicker";
import { RefreshCcw } from "lucide-react";
import WeekButtons from "./WeekButtons";
import { getOrdinal } from "../utils/RegexPatterns";

import React, { Dispatch, SetStateAction, useEffect } from "react";

interface RecurrenceModalProps {
  isOpen: boolean;
  repeatEvery: number;
  startdate: string | Date | null;
  endDate: string | Date | null;
  frequency: string;
  selectedDays: string[];
  onClose: () => void;
  handleSaveModal: () => void;
  toggleModal: () => void;
  handleStartDateChange: (date: Date | null) => void;
  setRepeatEvery: (value: number) => void;
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
  handleEndDateChange: (date: Date | null) => void;
  setFrequency: (frequency: string) => void;
  saveState: {
    selectedDays: string[];
    frequency: string;
    repeatEvery: number;
  };
}
const RecurrenceModal: React.FC<RecurrenceModalProps> = ({
  isOpen,
  onClose,
  handleSaveModal,
  toggleModal,
  repeatEvery,
  startdate,
  handleStartDateChange,
  frequency,
  endDate,
  setRepeatEvery,
  selectedDays,
  setSelectedDays,
  handleEndDateChange,
  setFrequency,
  saveState,
}) => {
  useEffect(() => {
    setFrequency(saveState?.frequency ? saveState.frequency : "DAILY");
    setSelectedDays(saveState?.selectedDays);
    setRepeatEvery(saveState?.repeatEvery ? saveState.repeatEvery : 1);
  }, [isOpen]);

  useEffect(() => {
    if (frequency === "DAILY") {
      setSelectedDays([]);
    }
  }, [frequency, isOpen]);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Make Recurring"
        footer={
          <div className="flex justify-end p-4">
            <div className="space-x-2">
              <button
                onClick={handleSaveModal}
                className="rounded-lg bg-[#95c11e] px-5 py-2 text-sm font-medium text-white"
              >
                Save
              </button>

              <button
                onClick={toggleModal}
                className="rounded-md bg-[#7B7887] px-8 py-2 text-sm font-medium text-white"
              >
                Back
              </button>
            </div>
          </div>
        }
      >
        <div className="w-full space-y-4">
          <div>
            <label
              htmlFor="startDate"
              className="flex items-center gap-2 text-gray-400"
            >
              Start
              <ReusableDatePicker
                selectedDate={startdate}
                onDateChange={handleStartDateChange}
                disabled={true}
                label=""
              />
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <RefreshCcw strokeWidth={1} size={20} />
            <label htmlFor="" className="text-gray-400">
              Repeat every{" "}
            </label>
            <div className="flex items-center space-x-8">
              <select
                id="courses"
                value={repeatEvery}
                onChange={(e) => {
                  setRepeatEvery(Number(e.target.value));
                }}
                className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-sm text-[#7b7887] outline-none md:w-[70px] dark:text-white dark:placeholder-gray-400"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                }}
                className="block w-full rounded border border-gray-300 bg-gray-100 p-2 text-sm text-[#7b7887] outline-none md:w-[140px] dark:text-white dark:placeholder-gray-400"
              >
                <option value="DAILY">Day</option>
                <option value="WEEKLY">Week</option>
              </select>
            </div>
          </div>
          <div className="space-y-2 px-9">
            {frequency === "WEEKLY" && (
              <WeekButtons
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            )}
            <p className="text-xs text-gray-400">
              {frequency === "WEEKLY" && (
                <span>
                  {" "}
                  Occurs every{" "}
                  {selectedDays?.length < 7
                    ? selectedDays?.join(" ,")
                    : "day"}{" "}
                  until
                </span>
              )}
              {frequency === "DAILY" && (
                <span>
                  {" "}
                  Occurs {repeatEvery === 1
                    ? "every"
                    : getOrdinal(repeatEvery)}{" "}
                  day until
                </span>
              )}
            </p>
            <div className="flex max-w-sm items-center gap-3">
              <ReusableDatePicker
                selectedDate={endDate}
                onDateChange={handleEndDateChange}
                disabled={true}
                label=""
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default RecurrenceModal;
