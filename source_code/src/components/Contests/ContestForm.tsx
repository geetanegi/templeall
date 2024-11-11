import React from "react";
import { SelectChangeEvent } from "@mui/material";
import MUISelect from "../../Formik/components/MUISelect";
import CustomDatePicker from "../../Formik/components/CustomDatePicker";
import MUINumber from "../../Formik/components/MUINumber";
import { RefreshCcw, SquarePen } from "lucide-react";
import moment from "moment";
import FormikControl from "../../Formik/components/FormikControl";
import { getOrdinal } from "../../utils/RegexPatterns";
import { matchPath, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/routesPath";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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

  isSuperAdmin,
}) => {
  const today = moment();
  const location = useLocation();
  const { setFieldValue } = useFormikContext(); // To access Formik's setFieldValue

  // Handle change for clubName
  const handleClubChange = (event: SelectChangeEvent<string>) => {
    const clubValue = event.target.value;

    // Update clubName and reset dependent fields
    setFieldValue("clubName", clubValue);
    setFieldValue("courseName", ""); // Reset courseName
    setFieldValue("holesName", ""); // Reset holeName
    setFieldValue("Tee", ""); // Reset teeName
  };

  // Handle change for courseName
  const handleCourseChange = (event: SelectChangeEvent<string>) => {
    const courseValue = event.target.value;

    // Update courseName and reset dependent fields
    setFieldValue("courseName", courseValue);
    setFieldValue("holesName", ""); // Reset holeName
    setFieldValue("Tee", ""); // Reset teeName
  };

  // Handle change for holeName
  const handleHoleChange = (event: SelectChangeEvent<string>) => {
    const holeValue = event.target.value;

    // Update courseName and reset dependent fields
    setFieldValue("holesName", holeValue);
    setFieldValue("Tee", ""); // Reset teeName
  };

  // Handle change for holeName
  // const handleRadioChange = (event: SelectChangeEvent<string>) => {
  //   const holeValue = event.target.value;

  //   // Update courseName and reset dependent fields
  //   setFieldValue("holesName", holeValue);
  //   setFieldValue("Tee", ""); // Reset teeName
  // };

  const handleRadioChange = (event: SelectChangeEvent<string>) => {
    const radioValue = event.target.value;

    if (radioValue === "no") {
      setFieldValue("entriesPer24Hours", "", false);
      setFieldValue("waitTimeBetweenEntries", "", false);
    }
  };

  const radioOptions = [
    { value: "yes", key: "Yes" },
    { value: "no", key: "No" },
  ];

  const isUpdateContest = matchPath(
    { path: ROUTES.UPDFATE_CONTEST },
    location.pathname,
  );

  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="">
          <MUISelect
            label="Contest Type"
            name="contestType"
            required={true}
            // disabled={isSuperAdmin}
            options={[
              {
                key: "AceCam-Jackpot",
                value: "ACE_CAM_JACKPOT",
              },
              {
                key: "Closest-to-the-Pin",
                value: "CLOSEST_TO_THE_PIN",
              },
            ]}
            disabled={isUpdateContest ? true : false || isSuperAdmin}
          />
        </div>
        <div className="">
          <MUISelect
            label="Club Name"
            name="clubName"
            required={true}
            disabled={isUpdateContest ? true : false || isSuperAdmin}
            options={clubOptions || []}
            onChange={handleClubChange} // Attach change handler
          />
        </div>
        <div className="">
          <MUISelect
            label="Course Name"
            name="courseName"
            required={true}
            disabled={isUpdateContest ? true : false || isSuperAdmin}
            options={courseOptions || []}
            onChange={handleCourseChange} // Attach change handler
          />
        </div>
        <div className="">
          <MUISelect
            label="Hole No."
            name="holesName"
            required={true}
            disabled={isUpdateContest ? true : false || isSuperAdmin}
            options={holeOptions || []}
            onChange={handleHoleChange} // Attach change handler
          />
        </div>
        <div className="">
          <MUISelect
            label="Tee"
            name="Tee"
            required={true}
            disabled={isUpdateContest ? true : false || isSuperAdmin}
            options={teeOptions || []}
          />
        </div>
      </div>
      <div className="mb-4 w-full space-y-4">
        <h5 className="text-l font-normal text-black">Contest Duration</h5>
        <div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:w-2/3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div>
              <CustomDatePicker
                name="startDate"
                label="Start Date/Time"
                required={true}
                disabled={isSuperAdmin}
                minDate={today.format("YYYY-MM-DD")}
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
        <h5 className="text-l font-normal text-black">Registration Period</h5>
        <div>
          <div className="mb-6 grid grid-cols-1 gap-x-5 gap-y-5 md:w-2/3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div>
              <CustomDatePicker
                name="registrationStartTime"
                label="Start Date/Time"
                required={true}
                disabled={isSuperAdmin}
                maxDate={values.endDate}
              />
            </div>
            <div>
              <CustomDatePicker
                name="registrationEndTime"
                label="End Date/Time"
                required={true}
                disabled={isSuperAdmin}
                minDate={values?.registrationStartTime || undefined}
                maxDate={values.endDate}
              />
            </div>
          </div>

          <div className="my-4 grid grid-cols-1 gap-x-5 gap-y-3 md:w-full md:grid-cols-[1fr,2fr]">
            <div className="mt-2">
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
                {saveState?.frequency === "WEEKLY" && (
                  <span className="text-xs text-gray-500">
                    {" "}
                    Occurs every{" "}
                    {saveState?.selectedDays?.length < 7
                      ? saveState.selectedDays.join(", ")
                      : "day"}{" "}
                    until{" "}
                    <span className="text-xs font-semibold text-gray-500">
                      {moment.utc(endDate).format("DD/MM/YYYY")}
                    </span>
                  </span>
                )}
                {saveState?.frequency === "DAILY" && (
                  <span className="text-xs text-gray-500">
                    {" "}
                    Occurs{" "}
                    {saveState.repeatEvery === 1
                      ? "every"
                      : ` every ${getOrdinal(saveState.repeatEvery)} `}
                    day until{" "}
                    <span className="text-xs font-semibold text-gray-500">
                      {moment.utc(endDate).format("MM/DD/YYYY")}
                    </span>
                  </span>
                )}
                {userPermisions?.data?.permission["is_super_admin"] && (
                  <SquarePen
                    className={`mx-2 h-5 text-[#95c11e]`}
                    strokeWidth={1}
                    onClick={() => {
                      if (isSuperAdmin) {
                        return;
                      }
                      toggleModal();
                    }}
                  />
                )}
              </div>
            )}
          </div>
          <div className="mb-4 space-y-4">
            <h5 className="text-l -mb-1 -mt-2 font-normal text-black">
              Payout
            </h5>
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
          </div>
          <div>
            <h5 className="text-l mb-2 font-normal text-black">
              Eligibility Requirements:
            </h5>
            <div className="w-full">
              <FormikControl
                control="textarea"
                label="Eligibility Requirements"
                placeholder={`For example : Your HDCP must be no less than 7.0 to be eligible for participation, unless you are woman, or older than 70 years of age. `}
                name="note"
                required={true}
                className="flex flex-row"
                maxLength={150}
                rows={4}
                disabled={isSuperAdmin}
              />
            </div>
          </div>
          <div>
            <h5 className="text-l font-normal text-black">
              Limit Entries Per User
            </h5>
            <div>
              <FormikControl
                control="radio"
                label=""
                name="limitSection"
                className="flex flex-row"
                options={radioOptions}
                disabled={isSuperAdmin}
                sx={{
                  "& MuiFormControlLabel-labelPlacementEnd ": {
                    fontSize: "30px !important",
                  },
                }}
                onChange={handleRadioChange}
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 gap-x-5 gap-y-5 md:w-2/3 md:grid-cols-2">
            <div className="">
              <MUINumber
                label="How many Entries Per 24 Hours"
                name="entriesPer24Hours"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin || values.limitSection === "no"}
              />
            </div>
            <div className="">
              <MUINumber
                label="Wait Time in Between Entries Hours"
                name="waitTimeBetweenEntries"
                className="w-full"
                type="text"
                required={true}
                maxLength={25}
                disabled={isSuperAdmin || values.limitSection === "no"}
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
                disabled={true} // for not user can not update its default 4 for que limit
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default ContestForm;
