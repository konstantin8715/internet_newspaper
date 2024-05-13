export function formatDate(date) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString().slice(0, -3);
}
