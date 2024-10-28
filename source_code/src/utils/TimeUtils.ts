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



export const  timeAgo =(createdDate: string)=>  {
 const  format = "MM/DD/YYYY hh:mm:ss A";
  // Create a Date object from the UTC date string
  const date = new Date(moment.utc(createdDate).local().format(format));
  const now = new Date();
  
  // Calculate the difference in seconds
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval > 1 ? 's' : ''} ago`;
  
  interval = Math.floor(seconds / 2592000); // 30 days
  if (interval >= 1) return `${interval} month${interval > 1 ? 's' : ''} ago`;
  
  interval = Math.floor(seconds / 86400); // 24 hours
  if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`;
  
  interval = Math.floor(seconds / 3600); // 60 minutes
  if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`;
  
  interval = Math.floor(seconds / 60); // 60 seconds
  if (interval >= 1) return `${interval} minute${interval > 1 ? 's' : ''} ago`;
  
  return 'just now';
}

