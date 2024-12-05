import moment, { Moment } from "moment";

export const capitalizeFirstLetter = (value: string): string =>{
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }


export const combineDateAndTime = (date: string | Moment, time: string) => {
  const parsedDate = moment(date); 
  const parsedTime = moment(time, "HH:mm:ss.SSS"); 
  
  const combined = parsedDate
    .set({
      hour: parsedTime.hour(),
      minute: parsedTime.minute(),
      second: parsedTime.second(),
      millisecond: parsedTime.millisecond(),
    })
    .utc(); // Convert to UTC

  // Return the combined date and time in ISO format
  return combined.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};
