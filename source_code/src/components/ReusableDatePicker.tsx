import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface ReusableDatePickerProps {
  selectedDate: Date | string | null;
  onDateChange: (date: Date | null) => void;
  size?: string;
  id?: string;
  disabled?: boolean; // Optional disabled prop
  label?: string;
  maxDate?: Dayjs | string;
  minDate?: Dayjs | string;
}

const ReusableDatePicker: React.FC<ReusableDatePickerProps> = ({
  selectedDate,
  onDateChange,
  size = "small",
  disabled,
  label = "select Date",
  maxDate,
  minDate,
}) => {
  const maxDateValue = typeof maxDate === "string" ? dayjs(maxDate) : maxDate;
  const minDateValue = typeof minDate === "string" ? dayjs(minDate) : minDate;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          disabled={disabled}
          value={selectedDate ? dayjs(selectedDate) : null}
          maxDate={maxDateValue}
          minDate={minDateValue}
          onChange={(newValue) =>
            onDateChange(newValue ? newValue.toDate() : null)
          }
          slotProps={{
            textField: {
              size: size as "small" | "medium",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default ReusableDatePicker;
