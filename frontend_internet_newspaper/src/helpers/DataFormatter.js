export function formatDate(date) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString("ru-RU", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
