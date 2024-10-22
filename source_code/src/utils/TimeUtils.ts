import moment from "moment";
import momentTz from "moment-timezone";
export const timeZone = momentTz.tz.guess();

export const ensureUTC = (date: string | Date): string => {
  const dateObj = moment(date);

  // Check if the date is valid
  if (!dateObj.isValid()) {
    throw new Error("Invalid date provided");
  }

  // Check if the input string explicitly indicates UTC
  const isUtcString =
    typeof date === "string" &&
    (date.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(date));

  // Check if the date is in UTC
  if (isUtcString || dateObj.utcOffset() === 0) {
    return dateObj.format(); // Return the original date as it's already in UTC
  } else {
    return dateObj.utc().format(); // Convert to UTC and return
  }
};

export const convertToLocalTime = (
  utcTimeString: string,
  format = "MM/DD/YYYY hh:mm:ss A",
): string => {
  const localTime = moment.utc(utcTimeString).local().format(format);
  return localTime;
};
