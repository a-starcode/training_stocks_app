export const getFormattedDateTime = (date = new Date()) => {
  const dateString = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${dateString}, ${timeString}`;
};

export function formatMarketNewsDateTime(dateString: string): string {
  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(4, 6)) - 1; // month is zero-indexed in JS
  const day = parseInt(dateString.slice(6, 8));
  const hours = parseInt(dateString.slice(9, 11));
  const minutes = parseInt(dateString.slice(11, 13));
  const seconds = parseInt(dateString.slice(13, 15));

  const dateObj = new Date(year, month, day, hours, minutes, seconds);
  const dayName = dateObj.toLocaleString("en-US", { weekday: "short" });
  const monthDay = dateObj.toLocaleString("en-US", { month: "2-digit", day: "2-digit" });
  const time = dateObj.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });

  return `${dayName}, ${monthDay}, ${time}`;
}

export function formatTimestamp(timestamp: string): string {
  const [dateString, timeString] = timestamp.split(", ");
  const [day, month, year] = dateString.split("/");
  const [hour, minute, second] = timeString.split(":");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second.match(/\d+/g)) // it captures "AM / PM"
  );

  return date.toISOString();
}
