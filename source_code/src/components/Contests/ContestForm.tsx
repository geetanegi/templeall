import React from "react";
import MUISelect from "../../Formik/components/MUISelect";
import CustomDatePicker from "../../Formik/components/CustomDatePicker";
import MUINumber from "../../Formik/components/MUINumber";
import { RefreshCcw, SquarePen } from "lucide-react";
import moment from "moment";
import FormikControl from "../../Formik/components/FormikControl";
import { getOrdinal } from "../../utils/RegexPatterns";

interface ContestProps {
  clubOptions: { value: number; key: string }[];
  teeOptions: { value: number; key: string }[];
  courseOptions: { value: number; key: string }[];
  holeOptions: { value: number; key: string }[];
  values: any;
  saveState: any;
  endDate: Date | string | null;
  startDate?: Date | string | null;
  toggleModal: () => void;
  frequency: string;
  isSuperAdmin: boolean;
}

const ContestForm: React.FC<ContestProps> = ({
  clubOptions,
  teeOptions,
  courseOptions,
  holeOptions,
  values,
  saveState,
  endDate,
  toggleModal,
  frequency,
  isSuperAdmin,
}) => {
  const radioOptions = [
    { value: "yes", key: "Yes" },
    { value: "no", key: "No" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="">
          <MUISelect
            label="Contest Type"
            name="contestType"
            required={true}
            disabled={isSuperAdmin}
            options={[
              {
                key: "Ace Cam Jackpot",
                value: "ACE_CAM_JACKPOT",
              },
              {
                key: "closest To The Pin",
                value: "CLOSEST_TO_THE_PIN",
              },
            ]}
          />
        </div>
        <div className="">
          <MUISelect
            label="Club Name"
            name="clubName"
            required={true}
            disabled={isSuperAdmin}
            options={clubOptions || []}
          />
        </div>
        <div className="">
          <MUISelect
            label="Course Name"
            name="courseName"
            required={true}
            disabled={isSuperAdmin}
            options={courseOptions || []}
          />
        </div>
        <div className="">
          <MUISelect
            label="Hole Name"
            name="holesName"
            required={true}
            disabled={isSuperAdmin}
            options={holeOptions || []}
          />
        </div>
        <div className="">
          <MUISelect
            label="Tee"
            name="Tee"
            required={true}
            disabled={isSuperAdmin}
            options={teeOptions || []}
          />
        </div>
      </div>
      <div className="mb-4 w-full space-y-4">
        <h5 className="text-xl font-normal">Contest Duration</h5>
        <div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:w-2/3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div>
              <CustomDatePicker
                name="startDate"
                label="Start Date/Time"
                required={true}
                disabled={isSuperAdmin}
              />
            </div>
            <div>
              <CustomDatePicker
                name="endDate"
                label="End Date/Time"
                required={true}
                disabled={isSuperAdmin}
                minDate={values?.startDate || undefined}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 space-y-4">
        <h5 className="text-xl font-normal">Registration Period</h5>
        <div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:w-2/3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div>
              <CustomDatePicker
                name="registrationStartTime"
                label="Start Date/Time"
                required={true}
                disabled={isSuperAdmin}
              />
            </div>
            <div>
              <CustomDatePicker
                name="registrationEndTime"
                label="End Date/Time"
                required={true}
                disabled={isSuperAdmin}
                minDate={values?.registrationStartTime || undefined}
              />
            </div>
          </div>

          <div className="my-4 grid grid-cols-1 gap-x-5 gap-y-3 md:w-full md:grid-cols-[1fr,2fr]">
            <div className="">
              <MUINumber
                label="Entry Fee"
                name="entryFee"
                className="col-span-1"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
            {values.startDate !== "" &&
              values.endDate !== "" &&
              saveState.selectedDays === "" &&
              saveState.frequency === "" && (
                <>
                  <div className="my-4 flex justify-start font-medium underline decoration-blue-600">
                    <span className="text-blue-600">
                      <span
                        onClick={toggleModal}
                        className="flex cursor-pointer items-end justify-center gap-1"
                      >
                        <RefreshCcw strokeWidth={1} size={20} />
                        Make Recurring
                      </span>
                    </span>
                  </div>
                </>
              )}
            {saveState.selectedDays !== "" && saveState.frequency !== "" && (
              <div className="mb-4 flex items-center">
                {frequency === "WEEKLY" && (
                  <span className="text-xs text-gray-500">
                    {" "}
                    Occurs every{" "}
                    {saveState.selectedDays.length < 7
                      ? saveState.selectedDays.join(" ,")
                      : "day"}{" "}
                    until{" "}
                    <span className="text-xs font-semibold text-gray-500">
                      {moment.utc(endDate).format("DD/MM/YYYY")}
                    </span>
                  </span>
                )}
                {frequency === "DAILY" && (
                  <span className="text-xs text-gray-500">
                    {" "}
                    Occurs{" "}
                    {saveState.repeatEvery === 1
                      ? "every"
                      : ` every ${getOrdinal(saveState.repeatEvery)}`}
                    day until{" "}
                    <span className="text-xs font-semibold text-gray-500">
                      {moment.utc(endDate).format("DD/MM/YYYY")}
                    </span>
                  </span>
                )}
                <SquarePen
                  className="mx-2 h-5 cursor-pointer text-blue-600"
                  strokeWidth={1}
                  onClick={toggleModal}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-3 lg:grid-cols-4">
            <div className="">
              <MUINumber
                label="Player(%)"
                name="playerPercentage"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
            <div className="">
              <MUINumber
                label="AceCam(%)"
                name="acecamPercentage"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
            <div className="">
              <MUINumber
                label="Course(%)"
                name="coursePercentage"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
            <div className="">
              <MUINumber
                label="Charity(%)"
                name="charityPercentage"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
          </div>
          <div>
            <h5 className="text-xl font-normal">User Limits Section</h5>
            <div>
              <FormikControl
                control="radio"
                label=""
                name="limitSection"
                className="flex flex-row"
                options={radioOptions}
                disabled={isSuperAdmin}
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 gap-x-5 gap-y-5 md:w-2/3 md:grid-cols-2">
            <div className="">
              <MUINumber
                label="How many Enteries Per 24 Hours"
                name="entriesPer24Hours"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
            <div className="">
              <MUINumber
                label="Wait Time in Between Enteries"
                name="waitTimeBetweenEntries"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
          </div>
          <div>
            <div className="md:w-[280px]">
              <MUINumber
                label="Queue Limit (4)"
                name="queueLimit"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin}
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default ContestForm;
