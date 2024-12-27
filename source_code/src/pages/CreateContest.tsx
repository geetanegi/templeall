import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup"; // Import Yup for validation
import Golf_BG from "../assets/images/Golf-BG.png";

import { ToastInfo, ToastSuccess } from "../components/Toast";
import apiService from "../services/apiService";
import { API_URL } from "../services/enums";
import { setCourseData } from "../reducers/Courses_data/courses";
import { ApiResponse } from "../reducers/Courses_data/course";
import { RootState } from "../store";
import moment from "moment";
import momentTz from "moment-timezone";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { setLoading } from "../reducers/loader/loader";
import RecurrenceModal from "../components/RecurrenceModal";
import ContestForm from "../components/Contests/ContestForm";
import { parseInt } from "lodash";
import UnsavedModal from "../components/UnSavedModal/UnsavedModal";
import { getFilters } from "../utils/genericApiCalls";
import { decryptData, secretKey } from "../utils/encrypt";
import { combineDateAndTime } from "../utils/utils";
import { validationConstant } from "../utils/validationEnums";

// interface recurrence {
//   frequency: string;
//   daysOfWeek: string;
//   endAfterOccurrences: string;
// }

// interface payoutStructure {
//   playerPercentage: string;
//   acecamPercentage: string;
//   coursePercentage: string;
//   charityPercentage: string;
// }

interface ContestFormValues {
  contestTypeId: string | number;
  clubName: string;
  courseName: string;
  holesName: string;
  Tee: string;
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  registrationStartTime: string | null;
  registrationEndTime: string | null;
  entryFee: string;
  // payoutStructure: payoutStructure;
  playerPercentage: string;
  acecamPercentage: string;
  coursePercentage: string;
  charityPercentage: string;
  limitSection: "yes" | "no"; // limitsection key
  waitTimeBetweenEntries: string | number | null;
  entriesPer24Hours: string | number | null;
  queueLimit: number | null;
  note: string;
}

const validationSchema = Yup.object({
  contestTypeId: Yup.string().required(validationConstant.mandatoryField),
  clubName: Yup.string().required(validationConstant.mandatoryField),
  courseName: Yup.string().required(validationConstant.mandatoryField),
  holesName: Yup.string().required(validationConstant.mandatoryField),
  Tee: Yup.string().required(validationConstant.mandatoryField),

  startDate: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(validationConstant.mandatoryField)
    .test(
      "start-not-greater-than-end",
      validationConstant.startDateCannotBeLaterThenEnddate,
      function (value) {
        const { endDate } = this.parent;
        if (!value || !endDate) return true;

        const start = moment(value, "YYYY-MM-DD");
        const end = moment(endDate, "YYYY-MM-DD");

        if (start.isAfter(end)) {
          return false;
        }
        return true;
      },
    ),

  endDate: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(validationConstant.mandatoryField)
    .test(
      "is-greater-than-start-date",
      validationConstant.endDateMustBeLaterThenStartDate,
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true;
        return new Date(value) >= new Date(startDate);
      },
    ),

  startTime: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(validationConstant.mandatoryField)
    .test(
      "start-not-greater-than-end",
      validationConstant.activeHourStartTimeCanNotbeLaterThenActivehourEndTime,
      function (value) {
        const { endTime } = this.parent;
        if (!value || !endTime) return true;

        const start = moment(value, "hh:mm A");
        const end = moment(endTime, "hh:mm A");
        if (start.isSameOrAfter(end)) {
          return false;
        }
        return true;
      },
    ),
  endTime: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(validationConstant.mandatoryField)
    .test(
      "end-not-less-than-start",
      validationConstant.activeHourEndTimeCanNotBeEarlierThenActiveHourStartTime,
      function (value) {
        const { startTime } = this.parent;
        if (!value || !startTime) return true;

        const endTimeObj = moment(`${value}`, "HH:mm A");
        const startTimeObj = moment(`${startTime}`, "HH:mm A");

        if (endTimeObj.isSameOrBefore(startTimeObj)) {
          return false;
        }
        return true;
      },
    ),

  registrationStartTime: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(validationConstant.mandatoryField)
    .test(
      "is-at-least-30-min-before-contest-end",
      validationConstant.registrationStartTImeShouldBeEarlierThenActivehourStartTime,
      function (value) {
        const { startTime } = this.parent;
        if (!value || !startTime) return true;

        const registrationEnd = moment(value, "HH:mm A");
        const contestEnd = moment(startTime, "HH:mm A");

        if (!registrationEnd.isValid() || !contestEnd.isValid()) {
          return false;
        }
        if (registrationEnd.isAfter(contestEnd.subtract(0, "minutes"))) {
          return false;
        }
        return true;
      },
    )
    .test(
      "end-not-less-than-start",
      validationConstant.registrationStartTimeCanNotBeLaterThenRegistrationEndTime,
      function (value) {
        const { registrationEndTime } = this.parent;
        if (!value || !registrationEndTime) return true;

        const registrationEnd = moment(`${value}`, "HH:mm A");
        const registrationStart = moment(`${registrationEndTime}`, "HH:mm A");

        if (registrationEnd.isSameOrAfter(registrationStart)) {
          return false;
        }
        return true;
      },
    ),

  registrationEndTime: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required(validationConstant.mandatoryField)
    .test(
      "end-not-less-than-start",
      validationConstant.registrationEndTimeCannotBeEarlierThentheStartTime,
      function (value) {
        const { registrationStartTime } = this.parent;
        if (!value || !registrationStartTime) return true;

        const registrationEnd = moment(`${value}`, "HH:mm A");
        const registrationStart = moment(`${registrationStartTime}`, "HH:mm A");

        if (registrationEnd.isSameOrBefore(registrationStart)) {
          return false;
        }
        return true;
      },
    )
    .test(
      "is-at-least-30-min-before-contest-end",
      validationConstant.registrationEndTimeMustBeATLeast30MinBeforeContestActivehourEndTime,
      function (value) {
        const { endTime } = this.parent;
        if (!value || !endTime) return true;

        const registrationEnd = moment(value, "HH:mm A");
        const contestEnd = moment(endTime, "HH:mm A");

        if (!registrationEnd.isValid() || !contestEnd.isValid()) {
          return false; // Invalid time format
        }
        if (registrationEnd.isAfter(contestEnd.subtract(30, "minutes"))) {
          return false;
        }
        return true;
      },
    ),

  entryFee: Yup.number()
    .required(validationConstant.mandatoryField)
    .min(5, validationConstant.valueShouldBeBetweet5and100)
    .max(100, validationConstant.valueShouldBeBetweet5and100),
  playerPercentage: Yup.number()
    .required(validationConstant.mandatoryField)
    .min(0, validationConstant.percentageMustBeatLeast0)
    .max(100, validationConstant.percentageCannotExceed100)
    .typeError(validationConstant.validNumberValue),

  acecamPercentage: Yup.number()
    .required(validationConstant.mandatoryField)
    .min(0, validationConstant.percentageMustBeatLeast0)
    .max(100, validationConstant.percentageCannotExceed100)
    .typeError(validationConstant.validNumberValue),

  coursePercentage: Yup.number()
    .required(validationConstant.mandatoryField)
    .min(0, validationConstant.percentageMustBeatLeast0)
    .max(100, validationConstant.percentageCannotExceed100)
    .typeError(validationConstant.validNumberValue),

  charityPercentage: Yup.number()
    .required(validationConstant.mandatoryField)
    .min(0, validationConstant.percentageMustBeatLeast0)
    .max(100, validationConstant.percentageCannotExceed100)
    .typeError(validationConstant.validNumberValue),

  // Custom validation for the sum of percentages
  totalPercentage: Yup.number().test(
    "sum",
    validationConstant.totalPayOutStructureSHouldBe100,
    function () {
      const {
        playerPercentage,
        acecamPercentage,
        charityPercentage,
        coursePercentage,
      } = this.parent;
      const player = Number(playerPercentage || 0);
      const acecam = Number(acecamPercentage || 0);
      const course = Number(coursePercentage || 0);
      const charity = Number(charityPercentage || 0);

      const total = player + acecam + course + charity;
      return total === 100;
    },
  ),
  entriesPer24Hours: Yup.string().when("limitSection", {
    is: "yes",
    then: Yup.string()
      .required(validationConstant.mandatoryField)
      .test(
        "min-value",
        validationConstant.entriesPer24HoursShouldNotBeLessThan1,
        (value) => {
          if (value) {
            const numValue = Number(value);
            return !isNaN(numValue) && numValue >= 1;
          }
          return true; // Pass validation if no value is entered
        },
      ),
    otherwise: Yup.string().nullable(), // Nullable when not required
  }),

  waitTimeBetweenEntries: Yup.string().when("limitSection", {
    is: "yes",
    then: Yup.string().required(validationConstant.mandatoryField),
    otherwise: Yup.string().nullable(), // Nullable when not required
  }),

  queueLimit: Yup.string().required(validationConstant.mandatoryField),
  note: Yup.string().required(validationConstant.mandatoryField),
});

const CreateContest: React.FC = () => {
  const dispatch = useDispatch();
  const tz = momentTz.tz.guess();
  const { id } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [registrationStartTime, setRegistrationStartTime] = useState<any>(null);
  const [registrationEndTime, setRegistrationEndTime] = useState<any>(null);
  const onClose = () => setIsOpenModal(false);

  const initialValues: ContestFormValues = {
    contestTypeId: editData?.contestTypeId || "",
    clubName: editData?.club.id || "",
    courseName: editData?.course?.id || "",
    holesName: editData?.hole?.id || "",
    Tee: editData?.tee?.id || "",
    startDate: editData?.startTime || "",
    endDate: editData?.endTime || "",
    startTime: editData?.startTime || "",
    endTime: editData?.endTime || "",
    registrationStartTime: editData?.registrationStartTime || "",
    registrationEndTime: editData?.registrationEndTime || "",
    entryFee: editData?.entryFee || "",
    playerPercentage: editData?.payoutStructure?.playerPercentage || "",
    acecamPercentage: editData?.payoutStructure?.acecamPercentage || "",
    coursePercentage: editData?.payoutStructure?.coursePercentage || "",
    charityPercentage: editData?.payoutStructure?.charityPercentage || "",
    limitSection: editData?.limitSection === false ? "no" : "yes",
    entriesPer24Hours: editData?.entriesPer24Hours || "",
    waitTimeBetweenEntries: editData?.waitTimeBetweenEntries || "",
    queueLimit: editData?.queueLimit || 4,
    note: "",
  };

  const userPermissionAvailable = useSelector(
    (state: RootState) => state?.auth?.userPermissions,
  );

  const userPermisions =
    userPermissionAvailable &&
    JSON.parse(decryptData(userPermissionAvailable, secretKey));

  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const isSuperAdmin = !userPermisions?.permission?.["is_super_admin"];

  const courseData = useSelector(
    (state: RootState) => state.courses.courseData,
  );
  const clubOptions =
    courseData?.data?.map((item: { id: number; name: string }) => ({
      value: item.id,
      key: item.name,
    })) || [];
  const [selectedClub, setSelectedClub] = useState("");
  const [courseOptions, setCourseOptions] = useState<[] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [holeOptions, setHoleOptions] = useState<[] | null>([]);
  const [selectedHole, setSelectedHole] = useState("");
  const [teeOptions, setTeeOptions] = useState<[] | null>(null);
  // const [selectedTee, setSelectedTee] = useState("");

  // recurring modal state
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [startdate, setStartDate] = React.useState<Date | string | null>(null);
  const [endDate, setEndDate] = React.useState<Date | string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // Initialize as an empty array of numbers
  const [repeatEvery, setRepeatEvery] = useState<number>(1);
  const [frequency, setFrequency] = useState<string>("DAILY");

  const [saveState, setSaveState] = useState<any>({
    selectedDays: "",
    frequency: "",
  });
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [contestTypeOptions, setContestTypeOptions] = useState<
    | {
      id: string | number;
      type: string;
    }[]
    | null
  >(null);
  const handleValues = useCallback((values: ContestFormValues) => {
    setSelectedClub(values.clubName);
    setSelectedCourse(values.courseName);
    setSelectedHole(values.holesName);
    setStartDate(values.startDate);
    setEndDate(values.endDate);
  }, []);

  useEffect(() => {
    if (selectedClub) {
      const courseList =
        courseData?.data?.find((club) => club.id === parseInt(selectedClub))
          ?.courseList || [];
      if (courseList.length > 0) {
        const courseListOptions =
          courseList?.map((course) => ({
            value: course.id,
            key: course.courseName,
          })) || [];
        setCourseOptions(courseListOptions as []);
        const holeList = courseList.find(
          (item) => item.id === parseInt(selectedCourse),
        )?.holeList;

        if (selectedCourse) {
          const holeListOptions =
            holeList?.map((item) => ({
              key: `Hole #${item.holeNumber} - Par ${item.par || ""}`,
              value: item.id,
            })) || [];
          setHoleOptions(holeListOptions as []);

          if (selectedHole) {
            const teeList =
              holeList?.find((hole) => hole.id === parseInt(selectedHole))
                ?.teeList || [];
            const teeOptions =
              teeList?.map((item) => ({
                key: item.teeName + " " + `(Yards ${item.yardage})`,
                value: item.id,
              })) || [];
            setTeeOptions(teeOptions as []);
          } else {
            setTeeOptions([]);
          }
        } else {
          setHoleOptions([]);
          setTeeOptions([]);
        }
      }
    } else {
      setCourseOptions([]);
      setHoleOptions([]);
      setTeeOptions([]);
    }
  }, [selectedClub, courseData, selectedCourse, selectedHole]);

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };

  const handleSaveModal = () => {
    setModalOpen(!isModalOpen);
    // check which freqency daily or weekly selected
    if (frequency === "DAILY") {
      setSelectedDays([]);
      setSaveState({
        selectedDays,
        frequency,
        repeatEvery,
      });
    } else {
      setSaveState({
        selectedDays,
        frequency,
        repeatEvery,
      });
    }
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    // setDiscard(false);
  };

  const fetchCourseData = async () => {
    try {
      dispatch(setLoading(true));
      // setIsLoading(true);
      const res = await apiService.post<ApiResponse>(API_URL.getCourseData, {
        data: {
          sortDir: "ASC",
          sortBy: "courseName",
          pageNumber: "0",
          pageSize: "10",
        },
      });
      if (res.status === 200 && !res.data.error) {
        dispatch(setCourseData(res.data));
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editData) {
      const days = editData.recurringSchedule.daysOfWeek;
      setSaveState({
        selectedDays: editData.recurringSchedule.daysOfWeek,
        frequency: editData.recurringSchedule.frequency,
        repeatEvery: editData.recurringSchedule.endAfterOccurrences,
      });
      setFrequency(editData?.recurringSchedule?.frequency);
      setSelectedDays(days === null ? [] : days);
      setRepeatEvery(editData.recurringSchedule.endAfterOccurrences);
      setDataLoaded(true);
    }
  }, [editData]);

  useEffect(() => {
    fetchCourseData();
    getFilters("contest_type", setContestTypeOptions);
  }, []);

  const fetchEditData = async () => {
    try {
      dispatch(setLoading(true));
      // setIsLoading(true);
      const res = await apiService.post<ApiResponse>(API_URL.getContestById, {
        data: {
          contestId: id,
        },
      });
      if (res.status === 200 && !res.data.error) {
        setEditData(res.data.data);
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEditData();
    }
  }, [id]);

  const handleSubmit = async (
    values: ContestFormValues,
    { setSubmitting }: FormikHelpers<ContestFormValues>,
  ) => {
    const startTime =
      values.startDate &&
      values.startTime &&
      combineDateAndTime(values.startDate, values.startTime);
    const endTime =
      values.endDate &&
      values.endTime &&
      combineDateAndTime(values.endDate, values.endTime);
    const registrationStartTime =
      values.startDate &&
      values.registrationStartTime &&
      combineDateAndTime(values.startDate, values.registrationStartTime);
    const registrationEndTime =
      values.endDate &&
      values.registrationEndTime &&
      combineDateAndTime(values.endDate, values.registrationEndTime);
    // Handle form submission here
    setSubmitting(false); // Reset submitting state
    // if (saveState.repeatEvery === 0 || saveState.frequency === "") {
    //   ToastInfo("Please select Make Recurring ");
    //   return;
    // }
    const totalPayout: number =
      parseInt(values.acecamPercentage) +
      parseInt(values.charityPercentage) +
      parseInt(values.coursePercentage) +
      parseInt(values.playerPercentage);

    if (totalPayout !== 100) {
      ToastInfo("Total Payout percentage should be 100%");
      return;
    }

    const obj = {
      data: {
        timeZone: tz,
        id: id ? id : null,
        name: "Test contest 99",
        contestTypeId: values.contestTypeId,
        clubId: values.clubName,
        courseId: values.courseName,
        holeId: values.holesName,
        teeId: values.Tee,
        startTime: startTime,
        endTime: endTime,
        registrationStartTime: registrationStartTime,
        registrationEndTime: registrationEndTime,
        entryFee: values.entryFee,
        entriesPer24Hours: values.entriesPer24Hours,
        queueLimit: values.queueLimit,
        limitSection: values.limitSection === "yes" ? true : false,
        activeStatus: false,
        waitTimeBetweenEntries: values.waitTimeBetweenEntries,
        payoutStructure: {
          id: editData?.payoutStructure?.id,
          acecamPercentage: values.acecamPercentage,
          playerPercentage: values.playerPercentage,
          coursePercentage: values.coursePercentage,
          charityPercentage: values.charityPercentage,
        },
        recurrence: {
          id: editData?.recurringSchedule?.id,
          frequency: saveState.frequency || "DAILY", // added change default frequency
          daysOfWeek:
            saveState?.selectedDays?.length > 0 ? selectedDays.join(",") : null,
          endAfterOccurrences: saveState.repeatEvery || 1,
        },
        note: values.note,
      },
    };
    try {
      dispatch(setLoading(true));
      const res = await apiService.post<any>(API_URL.createContest, obj);
      if (res.status === 200 && !res.data.error) {
        ToastSuccess(res.data.data.message);
        navigate("/contests");
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error creating contest");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleBack = (dirtyCheck: boolean) => {
    if (dirtyCheck) {
      setIsOpenModal(true);
      return;
    }
    navigate(-1);
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  return (
    <PageLoader isActive={loader}>
      <div className="bg-gray-100">
        <img
          src={Golf_BG}
          alt=""
          className="fixed h-[80%] bg-white bg-contain bg-fixed bg-no-repeat pt-10 opacity-20"
        />
        <div className="w-full pt-4">
          <div className="mb-10 flex justify-center pb-6">
            <div className="rounded-md border bg-white shadow md:max-w-4xl">
              <div className="p-4">
                <h3 className="mb-2 text-2xl font-medium">Create Contest</h3>

                <Formik
                  initialValues={initialValues} // Initialize age field
                  validationSchema={validationSchema} // Set validation schema
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({
                    isSubmitting,
                    values,
                    validateField,
                    setFieldValue,
                    dirty,
                  }) => {
                    useEffect(() => {
                      if (values.startTime) {
                        validateField("startTime");
                      }
                      if (values.endTime) {
                        validateField("endTime");
                      }
                      if (values.registrationStartTime) {
                        validateField("registrationStartTime");
                      }
                      if (values.registrationEndTime) {
                        validateField("registrationEndTime");
                      }
                      if (values.startDate) {
                        validateField('startDate')
                      }
                      if (values.endDate) {
                        validateField('endDate')
                      }
                    }, [
                      startTime,
                      endTime,
                      registrationStartTime,
                      registrationEndTime,
                      startdate,
                      endDate
                    ]);
                    useEffect(() => {
                      if (values.startTime) {
                        setStartTime(values.startTime);
                      }
                      if (values.endTime) {
                        setEndTime(values.endTime);
                      }
                      if (values.registrationStartTime) {
                        if (!values.endTime) {
                          setFieldValue("endTime", endTime)
                        }
                        setRegistrationStartTime(values.registrationStartTime);
                      }
                      if (values.registrationEndTime) {
                        setRegistrationEndTime(values.registrationEndTime);
                      }
                    }, [
                      values.startTime,
                      values.endTime,
                      values.registrationStartTime,
                      values.registrationEndTime,
                    ]);
                    handleValues(values);
                    useEffect(() => {
                      if (!loader && clubOptions.length > 0 && dataLoaded) {
                        if (values.clubName === "") {
                          setFieldValue("courseName", "");
                          setFieldValue("Tee", "");
                          setFieldValue("holesName", "");
                        } else if (values.clubName !== "") {
                          if (values.courseName !== "") {
                            //
                            if (values.holesName !== "") {
                              //
                            } else if (values.holesName === "") {
                              // setFieldValue("Tee", "");
                            }
                          } else if (values.courseName === "") {
                            // setFieldValue("Tee", "");
                            // setFieldValue("holesName", "");
                          }
                        }
                      }
                    }, [
                      setFieldValue,
                      teeOptions,
                      holeOptions,
                      courseOptions,
                      values,
                      loader,
                    ]);

                    return (
                      <Form>
                        <ContestForm
                          values={values}
                          isSuperAdmin={isSuperAdmin}
                          contestTypeOptions={
                            contestTypeOptions?.map((item) => ({
                              value: item.id,
                              key: item.type,
                            })) || []
                          }
                          saveState={saveState}
                          holeOptions={holeOptions || []}
                          clubOptions={clubOptions || []}
                          courseOptions={courseOptions || []}
                          teeOptions={teeOptions || []}
                          // // setFieldValue={setFieldValue}
                          // isSubmitting={isSubmitting}
                          endDate={endDate}
                          startDate={startdate}
                          toggleModal={toggleModal}
                          frequency={frequency}
                        />
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => handleBack(dirty)}
                            className="cursor-pointer rounded-lg bg-[#7B7887] px-8 py-2 text-white"
                          >
                            Back
                          </button>

                          <button
                            disabled={isSuperAdmin || isSubmitting}
                            type="submit"
                            className="rounded-lg bg-primaryColor px-8 py-2 text-white"
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <RecurrenceModal
          isOpen={isModalOpen}
          saveState={saveState}
          onClose={toggleModal}
          handleSaveModal={handleSaveModal}
          toggleModal={toggleModal}
          repeatEvery={repeatEvery}
          startdate={startdate}
          handleStartDateChange={handleStartDateChange}
          frequency={frequency}
          endDate={endDate}
          setRepeatEvery={setRepeatEvery}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          handleEndDateChange={handleEndDateChange}
          setFrequency={setFrequency}
        />
        <UnsavedModal
          isOpenModal={isOpenModal}
          onClose={onClose}
          handleDiscard={handleDiscard}
        />
      </div>
    </PageLoader>
  );
};

export default CreateContest;
