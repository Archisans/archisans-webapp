export const to24Hour = ({ hour, minute, period }) => {
  let h = parseInt(hour, 10);

  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;

  return `${h.toString().padStart(2, "0")}:${minute}:00`;
};

export const from24Hour = (time) => {
  if (!time) return null;

  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;

  return {
    hour: hour.toString().padStart(2, "0"),
    minute: m.toString().padStart(2, "0"),
    period,
  };
};
