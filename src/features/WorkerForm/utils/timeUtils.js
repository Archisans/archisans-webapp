// Convert a time object to total minutes
export const convertToMinutes = ({ hour, minute, period }) => {
  if (!hour || !minute || !period) return null;
  let h = parseInt(hour);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + parseInt(minute);
};

// Validate start and end time and return error message
export const validateTimeRange = (startTime, endTime) => {
  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);

  if (!startMinutes) return "Please select a start time first";
  if (!endMinutes || endMinutes <= startMinutes) return "End time must be later than start time";

  return "";
};

// Disable minutes in end time dropdown
export const isEndMinuteDisabled = (endTime, startMinutes, minute) => {
  if (!startMinutes || !endTime.hour || !endTime.period) return false;
  let h = parseInt(endTime.hour);
  if (endTime.period === "PM" && h !== 12) h += 12;
  if (endTime.period === "AM" && h === 12) h = 0;
  return h * 60 + parseInt(minute) <= startMinutes;
};

// Disable period in end time dropdown
export const isEndPeriodDisabled = (endTime, startMinutes, period) => {
  if (!startMinutes || !endTime.hour || !endTime.minute) return false;
  let h = parseInt(endTime.hour);
  let m = parseInt(endTime.minute);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m <= startMinutes;
};
