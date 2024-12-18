import React, { useEffect, useState } from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { Field } from "formik";

interface TimeRangePickerProps {
  CustomClockIcon?: any;
  startTimeValue: any;
  endTimeValue: any;
  name1:string;
  name2:string
  required?:boolean;
  disabled?:boolean
  [key: string]: any;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  CustomClockIcon,
  startTimeValue,
  endTimeValue,
  name1,
  name2,
  required,
  disabled=false,
  ...rest
}) => {
  const [startTime, setStartTime] = useState<Moment | null>(null);
  const [endTime, setEndTime] = useState<Moment | null>(null);

  useEffect(() => {
    // If time values are strings, parse them to Moment objects
    if (startTimeValue) {
      setStartTime(moment(startTimeValue, "HH:mm:ss"));  // Adjust format as needed
    }
  
  }, [startTimeValue]);

  useEffect(()=>{
    if (endTimeValue) {
      setEndTime(moment(endTimeValue, "HH:mm:ss"));  // Adjust format as needed
    }
  },[endTimeValue])

  // const disableStartTime = (
  //   time: Moment,   
  //   view: "hours" | "minutes" | "seconds",
  // ): boolean => {
  //   if (!endTime) return false;
 
  
  //   const maxStartTime = moment(endTime).subtract(5, "minutes");
  //   const endHour = endTime.hour();
  //   const maxHour = maxStartTime.hour();
  //   const maxMinute = maxStartTime.minute();
  
  //   if (view === "hours") {
  //     if (endHour === 0 && time.hour() === 0) {
  //       return true;
  //     }
  
  //     return time.hour() > maxHour;
  //   }
  
  //   if (view === "minutes") {
  //     if (time.hour() === maxHour) {
  //       return time.minute() > maxMinute;
  //     }
      
  //     if (time.hour() === 0) {
  //       return time.minute() > 59;
  //     }
  //   }
  
  //   return false;
  // };
  

  const disableEndTime = (
    time: Moment,
    view: "hours" | "minutes" | "seconds",
  ): boolean => {
    if (!startTime) return false;
  
    const minEndTime = moment(startTime).add(5, "minutes"); // Start time must always be 5 minutes less than end time
    const startHour = startTime.hour();
    const startMinute = startTime.minute();
    const minHour = minEndTime.hour();
    const minMinute = minEndTime.minute();
  
  
    if (view === "hours") {
      if (time.hour() === startHour && startMinute >= 55) {
        return true;
      }

      if(time.hour() < startHour ){
        return true
      }
  
      return time.hour() < minHour;
    }
  
    if (view === "minutes") {
      if (time.hour() === minHour) {
        return time.minute() < minMinute;
      }
  
      if (time.hour() === 0) {
        return time.minute() < 5;
      }
    }
  
    return false;
  };
  
    

  

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="w-[50%]">
        <Field name={name1}>
          {({ field, form, meta }: any) => {
             const { setFieldValue, setFieldTouched } = form;
            return (
              <div onClick={()=>{
                  if(form.values[field.name]){
                    setFieldTouched(field.name, true)
                  }
                }}>
                <TimePicker
                  {...field}
                  label={<span className="text-[13px]" style={{ display: "flex", alignItems: "center" }}>
                  {"Start Time"}
                  {required && (
                    <span style={{ color: "red", marginLeft: "0.25rem" }}>*</span>
                  )}
                </span>}
                  value={startTime}
                  ampm={false}
                  {...rest}
                  onChange={(newValue: Moment | null) => {
                    setStartTime(newValue);
                    setFieldValue(name1, newValue ? moment(newValue).format('HH:mm:ss') : null);
                    // Reset end time if it's no longer valid
                    if (
                      endTime &&
                      newValue &&
                      newValue.isSameOrAfter(moment(endTime))
                    ) {
                      setEndTime(null);
                      setFieldValue("endTime", null);
                    }
                  }}
                  slots={
                    CustomClockIcon && {
                      openPickerIcon: () => CustomClockIcon,
                    }
                  }
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiList-root": {
                          width: "100px",
                        },
                      },
                    },
                    textField: {
                      error: Boolean(meta.error && meta.touched),
                      helperText: meta.touched && meta.error,
                      sx: {
                        "& .MuiInputBase-root-MuiOutlinedInput-root": {},
                        width: "100%",
                        "& .MuiInputBase-root": {
                          borderRadius: "5px",
                          backgroundColor: "#FAFAFA",
                          fontSize: "14px",
                          padding: "0px 16px 0px 6px",
                          height: "46px",
                           background: disabled ? "#e5e7eb" : ""
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                          paddingLeft: "10px",
                          transform: "translate(0, 12px) scale(1)", // Center in the empty state
                        },
                        "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                          {
                            transform: "translate(0, -6px) scale(0.75)",
                            paddingLeft: "15px",
                          },
                      },
                    },
                  }}
                />
              </div>
            );
          }}
        </Field>
      </div>

      <div className="w-[50%]">
        <Field name={name2}>
          {({ field, form, meta }: any) => {
            const { setFieldValue, setFieldTouched } = form;
            return (
              <div onClick={()=>{
                if(form.values[field.name]){
                  setFieldTouched(field.name, true)
                }
              }}>
                <TimePicker
                  {...field}
                  label={<span style={{ display: "flex", alignItems: "center" }}>
                  {"End Time"}
                  {required && (
                    <span style={{ color: "red", marginLeft: "0.25rem" }}>*</span>
                  )}
                </span>}
                  {...rest}
                  value={endTime}
                  ampm={false}
                  onChange={(newValue: Moment | null) => {
                    setEndTime(newValue);
                    setFieldValue(name2, newValue ? moment(newValue).format('HH:mm:ss') : null);
                  }}      
                  shouldDisableTime={disableEndTime}
                  slots={
                    CustomClockIcon && {
                      openPickerIcon: () => CustomClockIcon,
                    }
                  }
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiList-root": {
                          width: "100px",
                        },
                        "& .MuiDialogActions-root": {
                          border: "none",
                        },
                      },
                    },
                    textField: {
                      error: Boolean(meta.error && meta.touched),
                      helperText: meta.touched && meta.error,
                      sx: {
                        "& .MuiInputBase-root-MuiOutlinedInput-root": {},
                        width: "100%",
                        "& .MuiInputBase-root": {
                          borderRadius: "5px",
                          backgroundColor: "#FAFAFA",
                          fontSize: "14px",
                          padding: "0px 16px 0px 6px",
                          height: "46px",
                           background: disabled ? "#e5e7eb" : ""
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                          paddingLeft: "10px",
                          transform: "translate(0, 12px) scale(1)", // Center in the empty state
                        },
                        "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                          {
                            transform: "translate(0, -6px) scale(0.75)",
                            paddingLeft: "15px",
                          },
                      },
                    },
                  }}
                />
              </div>
            );
          }}
        </Field>
      </div>
    </LocalizationProvider>
  );
};

export default TimeRangePicker;
