import moment, { Moment } from "moment";

export const capitalizeFirstLetter = (value: string): string =>{
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }


export const combineDateAndTime = (date: string | Moment, time: string) => {
  // Parse the date and time separately
  const parsedDate = moment(date); // Parse the date
  const parsedTime = moment(time, "HH:mm:ss.SSS"); // Parse the time
  
  // Combine date and time
  const combined = parsedDate
    .set({
      hour: parsedTime.hour(),
      minute: parsedTime.minute(),
      second: parsedTime.second(),
      millisecond: parsedTime.millisecond(),
    })


  // Return the combined date and time in ISO format
  return combined.format("YYYY-MM-DD HH:mm:ss");

};


export function formatNumberWithCustomCommas(number:number) {
  // Convert the number to a string
  let numStr = number.toFixed(2).toString();
  
  // Split the number into integer and decimal parts
  let [integerPart, decimalPart] = numStr.split('.');
  
  // Format the integer part with commas
  let result = '';
  let count = 0;
  for (let i = integerPart.length - 1; i >= 0; i--) {
    count++;
    result = integerPart[i] + result;
    
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }

  // If there's a decimal part, append it back to the result
  if (decimalPart) {
    result = result + '.' + decimalPart;
  }
  
  return result;
}