import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup"; // Import Yup for validation
import Golf_BG from "../assets/images/Golf-BG.png";

import { ToastError, ToastSuccess } from "../components/Toast";
import apiService from "../services/apiService";
import { API_URL } from "../services/enums";
import { setCourseData } from "../reducers/Courses_data/courses";
import { ApiResponse } from "../reducers/Courses_data/course";
import { RootState } from "../store";
import moment from "moment";
import momentTz from "moment-timezone";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { setLoading } from "../reducers/loader/loader";
import RecurrenceModal from "../components/RecurrenceModal";
import ContestForm from "../components/Contests/ContestForm";
import { ROUTES } from "../utils/routesPath";

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
  contestType: string;
  clubName: string;
  courseName: string;
  holesName: string;
  Tee: string;
  startDate: string | null;
  endDate: string | null;
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
}

// import * as Yup from 'yup';
const validationSchema = Yup.object({
  contestType: Yup.string().required("This field is mandatory."),
  clubName: Yup.string().required("This field is mandatory."),
  courseName: Yup.string().required("This field is mandatory."),
  holesName: Yup.string().required("This field is mandatory."),
  Tee: Yup.string().required("This field is mandatory."),

  startDate: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required("This field is mandatory."),

  endDate: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required("This field is mandatory.")
    .test(
      "is-greater-than-start-date",
      "End date must be later than start date",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true; // Skip validation if either date is missing
        return new Date(value) > new Date(startDate); // Ensure endDate > startDate
      },
    ),

  registrationStartTime: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required("This field is mandatory.")
    .test(
      "is-less-than-or-equal-to-end-date",
      "Registration start date/time must be less than Contest end date/time",
      function (value) {
        const { endDate } = this.parent;
        if (!value || !endDate) return true; // Skip validation if endDate is missing
        return new Date(value) <= new Date(endDate); // Ensure registrationStartTime <= endDate
      },
    ),

  registrationEndTime: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .required("This field is mandatory.")
    .test(
      "is-greater-than-registration-start-time",
      "Registration end time must be later than start time",
      function (value) {
        const { registrationStartTime } = this.parent;
        if (!value || !registrationStartTime) return true; // Skip if either field is missing
        return new Date(value) > new Date(registrationStartTime); // Ensure registrationEndTime > registrationStartTime
      },
    )
    .test(
      "is-less-than-or-equal-to-end-date",
      "Registration end date/time must be less than Contest end date/time",
      function (value) {
        const { endDate } = this.parent;
        if (!value || !endDate) return true; // Skip validation if endDate is missing
        return new Date(value) < new Date(endDate); // Ensure registrationEndTime <= endDate
      },
    ),

  entryFee: Yup.number()
    .required("This field is mandatory.")
    .min(5, "Value should be between 5 and 100")
    .max(100, "Value should be between 5 and 100"),

  playerPercentage: Yup.string().required("This field is mandatory."),
  acecamPercentage: Yup.string().required("This field is mandatory."),
  coursePercentage: Yup.string().required("This field is mandatory."),
  charityPercentage: Yup.string().required("This field is mandatory."),

  entriesPer24Hours: Yup.string().when("limitSection", {
    is: "yes",
    then: Yup.string().required("This field is mandatory."),
    otherwise: Yup.string().nullable(), // Nullable when not required
  }),

  waitTimeBetweenEntries: Yup.string().when("limitSection", {
    is: "yes",
    then: Yup.string().required("This field is mandatory."),
    otherwise: Yup.string().nullable(), // Nullable when not required
  }),

  queueLimit: Yup.string().required("This field is mandatory."),
});
const CreateContest: React.FC = () => {
  const dispatch = useDispatch();
  const tz = momentTz.tz.guess();
  const { id } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState<any>(null);

  const initialValues: ContestFormValues = {
    contestType: editData?.contestType || "",
    clubName: editData?.club.id || "",
    courseName: editData?.course?.id || "",
    holesName: editData?.hole?.id || "",
    Tee: editData?.tee?.id || "",
    startDate: editData?.startTime || "",
    endDate: editData?.endTime || "",
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
  };

  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const isSuperAdmin = !userPermisions?.data?.permission["is_super_admin"];

  const { state, pathname } = useLocation();
  console.log("state", state); // to be removed later

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
              key: item.holeNumber,
              value: item.id,
            })) || [];
          setHoleOptions(holeListOptions as []);

          if (selectedHole) {
            const teeList =
              holeList?.find((hole) => hole.id === parseInt(selectedHole))
                ?.teeList || [];
            const teeOptions =
              teeList?.map((item) => ({
                key: item.teeName,
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
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
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
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
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
    // Handle form submission here
    setSubmitting(false); // Reset submitting state
    // if (saveState.repeatEvery === 0 || saveState.frequency === "") {
    //   ToastError("Please select Make Recurring ");
    //   return;
    // }

    const obj = {
      data: {
        timeZone: tz,
        id: id ? id : null,
        name: "Test contest 99",
        contestType: values.contestType,
        clubId: values.clubName,
        courseId: values.courseName,
        holeId: values.holesName,
        teeId: values.Tee,
        startTime: moment.utc(values.startDate).format(),
        endTime: moment.utc(values.endDate).format(),
        registrationStartTime: moment
          .utc(values.registrationStartTime)
          .format(),
        registrationEndTime: moment.utc(values.registrationEndTime).format(),
        entryFee: values.entryFee,
        entriesPer24Hours: values.entriesPer24Hours,
        queueLimit: values.queueLimit,
        limitSection: values.limitSection === "yes" ? true : false,
        activeStatus: "Inactive",
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
      },
    };

    try {
      dispatch(setLoading(true));
      const res = await apiService.post<any>(API_URL.createContest, obj);
      if (res.status === 200 && !res.data.error) {
        ToastSuccess(res.data.data.message);
        navigate("/contests");
      } else if (res.data.error) {
        res.data.description || "Error creating contest";
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
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
          <div className="flex justify-center pb-6">
            <div className="rounded-md border bg-white shadow md:max-w-4xl">
              <div className="p-4">
                <h3 className="mb-2 text-2xl font-medium">
                  {pathname === ROUTES.CREATE_CONTEST
                    ? " Create Contest"
                    : userPermisions.data?.permission["is_course_admin"]
                      ? "Contest Details"
                      : "Edit Contest"}
                </h3>

                <Formik
                  initialValues={initialValues} // Initialize age field
                  validationSchema={validationSchema} // Set validation schema
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({ isSubmitting, values, setFieldValue }) => {
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

                      // if (clubOptions?.length === 0) {
                      // setFieldValue("courseName", "");
                      // setFieldValue("Tee", "");
                      // setFieldValue("holesName", "");
                      // }
                      // if (courseOptions?.length === 0) {
                      //   setFieldValue("courseName", "");
                      //   setFieldValue("holesName", "");
                      // }
                      // if (holeOptions?.length === 0) {
                      //   setFieldValue("Tee", "");
                      // }
                      // if (values.holesName === "") {
                      //   setFieldValue("Tee", "");
                      // }
                      // if (values.courseName === "") {
                      //   setFieldValue("holesName", "");
                      // }
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
                            onClick={() => navigate(-1)}
                            className="cursor-pointer rounded-lg bg-[#7B7887] px-8 py-2 text-white"
                          >
                            Back
                          </button>

                          <button
                            disabled={isSuperAdmin || isSubmitting}
                            type="submit"
                            className="rounded-lg bg-lime-500 px-8 py-2 text-white"
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
      </div>
    </PageLoader>
  );
};

export default CreateContest;
