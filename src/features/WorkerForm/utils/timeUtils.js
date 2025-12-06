export const HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
export const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
export const PERIODS = ["AM", "PM"];

export const convertToMinutes = (time) => {
  if (!time.hour || !time.minute || !time.period) return 0;
  let hours = parseInt(time.hour);
  if (time.period === "PM" && hours !== 12) hours += 12;
  if (time.period === "AM" && hours === 12) hours = 0;
  return hours * 60 + parseInt(time.minute);
};

export const validateTimeRange = (start, end) => {
  const startMin = convertToMinutes(start);
  const endMin = convertToMinutes(end);
  if (startMin && endMin && endMin <= startMin) {
    return "End time must be after start time";
  }
  return "";
};

export const isEndMinuteDisabled = (endTime, startMinutes, minute) => {
  if (!endTime.hour || !endTime.period) return false;
  const endMin = convertToMinutes({ ...endTime, minute });
  return endMin <= startMinutes;
};

export const isEndPeriodDisabled = (endTime, startMinutes, period) => {
  if (!endTime.hour || !endTime.minute) return false;
  const endMin = convertToMinutes({ ...endTime, period });
  return endMin <= startMinutes;
};
